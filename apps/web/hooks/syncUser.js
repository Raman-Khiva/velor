"use client";
import { setToken } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
export default function useSyncUser() {
  const { getToken, isLoaded, isSignedIn } = useAuth();
  const dispatch = useDispatch();
  useEffect(() => {
    const syncUser = async () => {
      try {
        const token = await getToken();
        console.warn("Syncing user with token:", token);
        if (!isSignedIn || !token) return;
        dispatch(setToken(token));

        const rawres = await fetch(
          `${"http://localhost:5000"}/api/user/sync`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        );

        const res = await rawres.json();
        console.log(res);
      } catch (err) {
        console.error("Error syncing user:", err);
      }
    };
    syncUser();
  }, [isLoaded, isSignedIn]);
}
