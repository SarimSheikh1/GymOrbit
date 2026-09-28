import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@gymorbit/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Credentials({ credentials: { email: {}, password: {} }, async authorize(credentials) {
    const email = typeof credentials.email === "string" ? credentials.email : "";
    const password = typeof credentials.password === "string" ? credentials.password : "";
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user?.isActive || !(await bcrypt.compare(password, user.passwordHash))) return null;
    return { id: user.id, name: user.name, email: user.email, role: user.role };
  } })],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" }
});
