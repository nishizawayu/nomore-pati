"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ResetButton() {
  const router = useRouter();
  const [isConfirming, setIsConfirming] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (!isConfirming) {
      setIsConfirming(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/counter/reset", {
        method: "POST",
      });

      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("リセットに失敗しました", error);
    } finally {
      setIsLoading(false);
      setIsConfirming(false);
    }
  };

  const handleCancel = () => {
    setIsConfirming(false);
  };

  if (isConfirming) {
    return (
      <div className="flex gap-2 justify-center">
        <button
          onClick={handleReset}
          disabled={isLoading}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 disabled:opacity-50"
        >
          {isLoading ? "リセット中..." : "本当にリセット"}
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-400"
        >
          キャンセル
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleReset}
      className="text-red-600 hover:text-red-800 text-sm"
    >
      カウンターをリセット（パチンコに行ってしまった場合）
    </button>
  );
}
