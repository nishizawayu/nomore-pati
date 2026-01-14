import { Suspense } from "react";
import { LoginForm } from "@/features/auth";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Suspense
        fallback={
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
            <p className="text-center text-gray-600">読み込み中...</p>
          </div>
        }
      >
        <LoginForm />
      </Suspense>
    </div>
  );
}
