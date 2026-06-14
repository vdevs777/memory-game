import { useAuthStore } from "@/shared/stores/auth.store";
import { router } from "expo-router";
import { useState } from "react";

export const useLoginVM = () => {
  const [username, setUsername] = useState("");

  const { setAuthenticated } = useAuthStore();

  const handleSubmit = () => {
    if (!username.length) return;

    setAuthenticated(username);

    router.replace("/(private)/home");
  };

  return {
    username,
    setUsername,
    handleSubmit,
  };
};
