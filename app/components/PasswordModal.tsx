import { useState } from "react";
import { useRouter } from "next/navigation";
import { checkPassword } from "../actions";

type PasswordModalProps = {
  setIsUnlocked: (value: boolean) => void;
};

export default function PasswordModal({ setIsUnlocked }: PasswordModalProps) {
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [isWrong, setIsWrong] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!password || isLoading) return;
    setIsLoading(true);
    const correct = await checkPassword(password);
    if (correct) {
      localStorage.setItem("unlockTime", Date.now().toString());
      setIsUnlocked(true);
    } else {
      setIsWrong(true);
      setPassword("");
      setTimeout(() => setIsWrong(false), 600);
    }
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-sm rounded-2xl border border-slate-700/60 bg-slate-900/90 p-8 shadow-2xl shadow-black/60 backdrop-blur-xl ${
          isWrong ? "animate-shake" : ""
        }`}
      >
        <div className="pointer-events-none absolute -top-px left-1/2 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-orange-400/60 to-transparent" />

        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/15 ring-1 ring-orange-400/30">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-orange-400"
            aria-hidden
          >
            <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>

        <h2 className="text-center text-xl font-bold text-slate-100">
          Enter Password
        </h2>
        <p className="mt-1 text-center text-sm text-slate-400">
          This action is password protected
        </p>

        <div className="mt-6 space-y-4">
          <input
            id="passwordInput"
            type="password"
            value={password}
            placeholder="Password"
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/25"
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full rounded-lg bg-gradient-to-r from-orange-500 to-orange-400 py-3 text-sm font-semibold text-white shadow-lg shadow-orange-500/25 transition hover:from-orange-400 hover:to-orange-300 hover:shadow-orange-400/30 disabled:opacity-60"
          >
            {isLoading ? "Checking…" : "Unlock"}
          </button>

          <button
            id="cancelPasswordModal"
            onClick={() => router.push("/")}
            className="w-full rounded-lg py-2.5 text-sm font-medium text-slate-400 transition hover:text-slate-200"
          >
            Cancel
          </button>
        </div>

        {isWrong && (
          <p className="mt-3 text-center text-xs font-medium text-red-400">
            Incorrect password. Try again.
          </p>
        )}
      </div>
    </div>
  );
}
