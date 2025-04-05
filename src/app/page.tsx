"use client";

import { supabase } from "@/utils/supabase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const listenToAuth = () => {
      supabase.auth.onAuthStateChange((event, session) => {
        console.log(`session ${session}`);
        if (session?.user) {
          router.push("/home");
        } else {
          router.push("/login");
        }
      });
    };
    listenToAuth();
  }, []);
  return <></>;
}
