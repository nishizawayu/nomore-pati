import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type SignupParams = {
  name: string;
  email: string;
  password: string;
};

type SignupResult =
  | { success: true; userId: string }
  | { success: false; error: string };

export async function signup(params: SignupParams): Promise<SignupResult> {
  const { name, email, password } = params;

  if (!name || !email || !password) {
    return { success: false, error: "名前、メールアドレス、パスワードは必須です" };
  }

  if (password.length < 6) {
    return { success: false, error: "パスワードは6文字以上で入力してください" };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { success: false, error: "このメールアドレスは既に登録されています" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: true, userId: user.id };
}
