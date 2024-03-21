import { NextRequest } from "next/server";
import { Message as VercelChatMessage, StreamingTextResponse } from "ai";
import {
  ChatPromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import { loadPineconeStore } from "../utils/pinecone";
import { OpenAIEmbeddings, ChatOpenAI } from "@langchain/openai";
import { createHistoryAwareRetriever } from "langchain/chains/history_aware_retriever";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import { RunnableSequence } from "@langchain/core/runnables";
import { HttpResponseOutputParser } from "langchain/output_parsers";
import { HumanMessage, AIMessage, ChatMessage } from '@langchain/core/messages';

export const runtime = "edge";

const formatVercelMessages = (message: VercelChatMessage) => {
  if (message.role === 'user') {
    return new HumanMessage(message.content);
  } else if (message.role === 'assistant') {
    return new AIMessage(message.content);
  } else {
    console.warn(
      `Unknown message type passed: "${message.role}". Falling back to generic message type.`,
    );
    return new ChatMessage({ content: message.content, role: message.role });
  }
};

const historyAwarePrompt = ChatPromptTemplate.fromMessages([
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
  [
    "user",
    "Given the above conversation, generate a concise vector store search query to look up in order to get information relevant to the conversation.",
  ],
]);

const ANSWER_SYSTEM_TEMPLATE = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say you don't know. DO NOT try to make up an answer.
If the question is not related to the context, politely respond that you are tuned to only answer questions that are related to the context.

<context>
{context}
</context>

Please return your answer in markdown with clear headings and lists.`;

const answerPrompt = ChatPromptTemplate.fromMessages([
  ["system", ANSWER_SYSTEM_TEMPLATE],
  new MessagesPlaceholder("chat_history"),
  ["user", "{input}"],
]);

export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages
    .slice(0, -1)
    .map(formatVercelMessages);
  const currentMessageContent = messages[messages.length - 1].content;

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    batchSize: 100,
    modelName: "text-embedding-ada-002",
  });

  const store = await loadPineconeStore({
    namespace: "",
    embeddings,
  });
  const vectorstore = store.vectorstore;

  let resolveWithDocuments: (value: Document[]) => void;
  const documentPromise = new Promise<Document[]>((resolve) => {
    resolveWithDocuments = resolve;
  });

  const filter = undefined;

  const model = new ChatOpenAI({
    temperature: 0.8,
  });

  const retriever = vectorstore.asRetriever({
    filter,
    callbacks: [
      {
        handleRetrieverEnd(documents) {
          resolveWithDocuments(documents as any);
        },
      },
    ],
  });

  const historyAwareRetrieverChain = await createHistoryAwareRetriever({
    llm: model,
    retriever,
    rephrasePrompt: historyAwarePrompt,
  });

  const documentChain = await createStuffDocumentsChain({
    llm: model,
    prompt: answerPrompt,
  });

  const conversationalRetrievalChain = await createRetrievalChain({
    retriever: historyAwareRetrieverChain,
    combineDocsChain: documentChain,
  });

  const outputChain = RunnableSequence.from([
    conversationalRetrievalChain.pick("answer"),
    new HttpResponseOutputParser(),
  ]);

  const stream = await outputChain.stream({
    chat_history: formattedPreviousMessages,
    input: currentMessageContent,
  });

  // const documents = await documentPromise;
  // console.log(documents)
  // const serializedSources = Buffer.from(
  //   JSON.stringify(
  //     documents.map((doc) => {
  //       return {
  //         //@ts-ignore
  //         pageContent: doc.pageContent.slice(0, 50) + '...',
  //         //@ts-ignore
  //         metadata: doc.metadata,
  //       };
  //     }),
  //   ),
  // ).toString('base64');

  return new StreamingTextResponse(stream);
}
