"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type Props = {
  currentImage: string | null;
  userName: string;
};

export function ProfileImage({ currentImage, userName }: Props) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // ファイルサイズチェック (1MB以下)
    if (file.size > 1024 * 1024) {
      setError("ファイルサイズは1MB以下にしてください");
      return;
    }

    // 画像タイプチェック
    if (!file.type.startsWith("image/")) {
      setError("画像ファイルを選択してください");
      return;
    }

    setIsUploading(true);
    setError("");

    try {
      // Base64に変換
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64 = reader.result as string;

        const res = await fetch("/api/profile/image", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image: base64 }),
        });

        if (!res.ok) {
          const result = await res.json();
          setError(result.error || "アップロードに失敗しました");
          setIsUploading(false);
          return;
        }

        setIsUploading(false);
        router.refresh();
      };
      reader.readAsDataURL(file);
    } catch {
      setError("アップロード中にエラーが発生しました");
      setIsUploading(false);
    }
  };

  const handleRemoveImage = async () => {
    if (!confirm("プロフィール画像を削除しますか？")) return;

    setIsUploading(true);
    setError("");

    try {
      const res = await fetch("/api/profile/image", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: null }),
      });

      if (!res.ok) {
        const result = await res.json();
        setError(result.error || "削除に失敗しました");
        setIsUploading(false);
        return;
      }

      setIsUploading(false);
      router.refresh();
    } catch {
      setError("削除中にエラーが発生しました");
      setIsUploading(false);
    }
  };

  const initials = userName.charAt(0).toUpperCase();

  return (
    <div className="flex flex-col items-center gap-3">
      <button
        onClick={handleImageClick}
        disabled={isUploading}
        className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 hover:opacity-80 transition-opacity disabled:opacity-50"
      >
        {currentImage ? (
          <Image
            src={currentImage}
            alt={userName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-500 text-white text-3xl font-bold">
            {initials}
          </div>
        )}
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-sm">...</span>
          </div>
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex gap-2">
        <button
          onClick={handleImageClick}
          disabled={isUploading}
          className="text-blue-600 hover:text-blue-800 text-sm disabled:opacity-50"
        >
          画像を変更
        </button>
        {currentImage && (
          <button
            onClick={handleRemoveImage}
            disabled={isUploading}
            className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
          >
            削除
          </button>
        )}
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
