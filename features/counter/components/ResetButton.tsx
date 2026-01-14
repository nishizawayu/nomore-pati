"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type ConfirmStep = "idle" | "first" | "second" | "final";

export function ResetButton() {
  const router = useRouter();
  const [step, setStep] = useState<ConfirmStep>("idle");
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (step === "idle") {
      setStep("first");
      return;
    }
    if (step === "first") {
      setStep("second");
      return;
    }
    if (step === "second") {
      setStep("final");
      return;
    }

    // final step - actually reset
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
      setStep("idle");
    }
  };

  const handleCancel = () => {
    setStep("idle");
  };

  // 最初の確認：本当に行った？
  if (step === "first") {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 max-w-md mx-auto">
        <div className="text-center">
          <div className="text-4xl mb-3">😢</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            本当にパチンコに行きましたか？
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            正直に申告してください。<br />
            嘘をついても、苦しむのは自分です。
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleReset}
              className="bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 font-medium"
            >
              はい、行きました...
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
            >
              いいえ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2回目の確認：フレンドに通知される
  if (step === "second") {
    return (
      <div className="bg-orange-50 border-2 border-orange-200 rounded-xl p-6 max-w-md mx-auto">
        <div className="text-center">
          <div className="text-4xl mb-3">📢</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            フレンド全員に通知されます
          </h3>
          <p className="text-gray-600 text-sm mb-4">
            あなたがリセットしたことは、<br />
            <span className="font-bold text-orange-600">フレンド全員に通知</span>されます。<br />
            それでもリセットしますか？
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleReset}
              className="bg-orange-600 text-white px-5 py-2 rounded-lg hover:bg-orange-700 font-medium"
            >
              通知されても構わない
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-300"
            >
              やっぱりやめる
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 最終確認：これまでの努力
  if (step === "final") {
    return (
      <div className="bg-gray-50 border-2 border-gray-300 rounded-xl p-6 max-w-md mx-auto">
        <div className="text-center">
          <div className="text-4xl mb-3">🔄</div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            最終確認
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            これまで積み上げた日数が<br />
            <span className="font-bold text-red-600">0日にリセット</span>されます。
          </p>
          <p className="text-gray-500 text-xs mb-4">
            でも大丈夫。また今日から始めましょう。<br />
            諦めない限り、負けじゃない。
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleReset}
              disabled={isLoading}
              className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-gray-900 font-medium disabled:opacity-50"
            >
              {isLoading ? "リセット中..." : "リセットする"}
            </button>
            <button
              onClick={handleCancel}
              className="bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 font-medium"
            >
              やっぱり続ける！
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 初期状態
  return (
    <button
      onClick={handleReset}
      className="text-red-600 hover:text-red-800 text-sm underline"
    >
      パチンコに行ってしまった（正直に申告）
    </button>
  );
}
