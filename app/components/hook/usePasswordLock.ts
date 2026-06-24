import { useState } from "react";

export default function usePassWordLocked() {
  const [isUnlocked, setIsUnlocked] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;

    const unlockTime = localStorage.getItem("unlockTime");
    if (!unlockTime) return false;

    const elapsed = Date.now() - Number(unlockTime);

    return elapsed < 24 * 60 * 60 * 1000;
  });
  return { isUnlocked, setIsUnlocked };
}
