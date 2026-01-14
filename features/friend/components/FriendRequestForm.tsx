"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  friendId: z.string().min(1, "ユーザーIDを入力してください"),
});

type FormData = z.infer<typeof schema>;

export function FriendRequestForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setServerError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/friends/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ friendId: data.friendId }),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error);
        return;
      }

      setSuccessMessage("フレンド申請を送信しました");
      reset();
      router.refresh();
    } catch {
      setServerError("送信中にエラーが発生しました");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h3 className="font-medium text-gray-800 mb-3">フレンドを追加</h3>

      {serverError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded mb-3 text-sm">
          {serverError}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-3 py-2 rounded mb-3 text-sm">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
        <div className="flex-1">
          <input
            type="text"
            {...register("friendId")}
            placeholder="ユーザーIDで検索"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm"
          />
          {errors.friendId && (
            <p className="mt-1 text-xs text-red-600">{errors.friendId.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm whitespace-nowrap"
        >
          {isSubmitting ? "送信中..." : "申請"}
        </button>
      </form>
    </div>
  );
}
