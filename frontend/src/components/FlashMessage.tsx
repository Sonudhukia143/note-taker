import { useState, useEffect } from "react";

interface FlashMessageProps {
  type: "success" | "error" | "info" | "warning";
  message: string;
  duration?: number;
}

export default function FlashMessage({ type = "success", message, duration = 3000 }: FlashMessageProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!visible) return null;

  const colors: Record<string, string> = {
    success: "bg-green-100 text-green-800 border-green-300",
    error: "bg-red-100 text-red-800 border-red-300",
    info: "bg-blue-100 text-blue-800 border-blue-300",
    warning: "bg-yellow-100 text-yellow-800 border-yellow-300",
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`px-4 py-3 rounded-lg border shadow-lg flex items-center gap-2 animate-slide-in ${colors[type]}`}
      >
        <span className="font-medium">{message}</span>
        <button
          onClick={() => setVisible(false)}
          className="ml-2 text-lg font-bold opacity-60 hover:opacity-100"
        >
          ×
        </button>
      </div>
    </div>
  );
}
