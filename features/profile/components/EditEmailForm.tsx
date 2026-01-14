"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateEmailSchema, UpdateEmailInput } from "../validations";

type Props = {
  currentEmail: string;
};

export function EditEmailForm({ currentEmail }: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdateEmailInput>({
    resolver: zodResolver(updateEmailSchema),
    defaultValues: { email: currentEmail },
  });

  const onSubmit = async (data: UpdateEmailInput) => {
    setServerError("");

    try {
      const res = await fetch("/api/profile/email", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error);
        return;
      }

      setIsEditing(false);
      router.refresh();
    } catch {
      setServerError("更新中にエラーが発生しました");
    }
  };

  const handleCancel = () => {
    reset({ email: currentEmail });
    setIsEditing(false);
    setServerError("");
  };

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">メールアドレス</p>
          <p className="text-gray-900 font-medium">{currentEmail}</p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          編集
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm text-gray-500 mb-1">メールアドレス</label>
        <input
          type="email"
          {...register("email")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-red-600">{serverError}</p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          {isSubmitting ? "更新中..." : "保存"}
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-sm"
        >
          キャンセル
        </button>
      </div>
    </form>
  );
}
