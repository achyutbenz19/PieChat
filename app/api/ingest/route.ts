import { NextResponse } from "next/server";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { CSVLoader } from "langchain/document_loaders/fs/csv";
import { OpenAIEmbeddings } from "@langchain/openai";
import { loadPineconeStore } from "@/app/api/utils/pinecone";

export async function POST(req: Request) {
  const { publicUrl: fileUrl } = await req.json();

  try {
    const response = await fetch(fileUrl);
    const buffer = await response.blob();
    const loader = new CSVLoader(buffer);
    const rawDocs = await loader.load();

    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(rawDocs);

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

    await vectorstore.addDocuments(splitDocs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to ingest your data" });
  }

  return NextResponse.json({
    text: "Successfully ingested pdf",
  });
}
