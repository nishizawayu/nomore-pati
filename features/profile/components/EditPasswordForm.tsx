"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updatePasswordSchema, UpdatePasswordInput } from "../validations";

export function EditPasswordForm() {
  const [isEditing, setIsEditing] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UpdatePasswordInput>({
    resolver: zodResolver(updatePasswordSchema),
  });

  const onSubmit = async (data: UpdatePasswordInput) => {
    setServerError("");
    setSuccessMessage("");

    try {
      const res = await fetch("/api/profile/password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        setServerError(result.error);
        return;
      }

      setSuccessMessage("パスワードを変更しました");
      reset();
      setIsEditing(false);
    } catch {
      setServerError("更新中にエラーが発生しました");
    }
  };

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    setServerError("");
  };

  if (!isEditing) {
    return (
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">パスワード</p>
          <p className="text-gray-900 font-medium">••••••••</p>
        </div>
        <button
          onClick={() => setIsEditing(true)}
          className="text-blue-600 hover:text-blue-800 text-sm"
        >
          変更
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div>
        <label className="block text-sm text-gray-500 mb-1">現在のパスワード</label>
        <input
          type="password"
          {...register("currentPassword")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        {errors.currentPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1">新しいパスワード</label>
        <input
          type="password"
          {...register("newPassword")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        {errors.newPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm text-gray-500 mb-1">新しいパスワード（確認）</label>
        <input
          type="password"
          {...register("confirmPassword")}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        {errors.confirmPassword && (
          <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
        )}
      </div>

      {serverError && (
        <p className="text-sm text-red-600">{serverError}</p>
      )}

      {successMessage && (
        <p className="text-sm text-green-600">{successMessage}</p>
      )}

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 text-sm"
        >
          {isSubmitting ? "更新中..." : "変更"}
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
