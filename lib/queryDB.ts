import { User, Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function fetchUserWithUniqueEmail(
  emailAdress: string,
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email: emailAdress },
  });

  return user;
}

export async function createNewUser(
  user: Prisma.UserCreateInput,
): Promise<User | never> {
  const User = await prisma.user.create({ data: user });
  return User;
}

export async function createSession(sessionObj: Prisma.SessionCreateInput) {
  const session = await prisma.session.create({ data: sessionObj });
  return session;
}
