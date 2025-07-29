"use client";

import { clearUser, setUser } from "@/store/slices/userSlice";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function SessionSync() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      dispatch(
        setUser({
          name: session.user.name || "",
          email: session.user.email || "",
          image: session.user.image || "",
          moviePreferences: [],
          newsPreferences: [],
          socialPreferences: []
        })
      );
    }

    if (status === "unauthenticated") {
      dispatch(clearUser());
    }
  }, [session, status, dispatch]);

  return null; 
}
