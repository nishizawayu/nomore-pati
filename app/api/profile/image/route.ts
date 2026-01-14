import { auth } from "@/lib/auth";
import { updateImage } from "@/features/profile";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "認証が必要です" }, { status: 401 });
  }

  const body = await request.json();
  const { image } = body;

  // imageはnullまたはBase64文字列
  if (image !== null && typeof image !== "string") {
    return NextResponse.json({ error: "無効な画像データです" }, { status: 400 });
  }

  // Base64のサイズチェック (約1.5MB以下)
  if (image && image.length > 2 * 1024 * 1024) {
    return NextResponse.json(
      { error: "ファイルサイズが大きすぎます" },
      { status: 400 }
    );
  }

  const result = await updateImage(session.user.id, image);

  return NextResponse.json(result);
}
