import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { SignOutButton } from "@/features/auth";
import {
  getProfile,
  EditNameForm,
  EditEmailForm,
  EditPasswordForm,
  ProfileImage,
} from "@/features/profile";

export default async function ProfilePage() {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const profile = await getProfile(session.user.id);

  if (!profile) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 hover:text-gray-800">
              ← 戻る
            </Link>
            <h1 className="text-xl font-bold text-gray-800">プロフィール</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{profile.name} さん</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* プロフィール画像 */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            プロフィール画像
          </h2>
          <ProfileImage currentImage={profile.image} userName={profile.name} />
        </section>

        {/* ユーザーID */}
        <section className="bg-blue-50 rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">
            ユーザーID:{" "}
            <span className="font-mono font-semibold text-blue-800 select-all">
              {profile.id}
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            このIDをフレンドに共有してください
          </p>
        </section>

        {/* 基本情報 */}
        <section className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-lg font-semibold text-gray-800">基本情報</h2>

          <div className="border-b pb-4">
            <EditNameForm currentName={profile.name} />
          </div>

          <div className="border-b pb-4">
            <EditEmailForm currentEmail={profile.email} />
          </div>

          <div>
            <EditPasswordForm />
          </div>
        </section>

        {/* アカウント情報 */}
        <section className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            アカウント情報
          </h2>
          <div className="space-y-3 text-sm text-gray-600">
            <p>
              パチ禁開始日:{" "}
              <span className="font-medium text-gray-900">
                {new Date(profile.startDate).toLocaleDateString("ja-JP")}
              </span>
            </p>
            <p>
              登録日:{" "}
              <span className="font-medium text-gray-900">
                {new Date(profile.createdAt).toLocaleDateString("ja-JP")}
              </span>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
