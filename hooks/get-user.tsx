import { createClient } from "@/supabase/client";
import { useEffect, useState } from "react";

const getUser = () => {
  const supabase = createClient();
  const [userId, setUserId] = useState<string | null | undefined>(undefined);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user !== null) {
      setUserId(user.id);
    } else {
      setUserId(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return userId;
};

export default getUser;
