import type { User } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function fetchUserWithUniqueEmail(
  emailAdress: string,
): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: { email: emailAdress },
  });

  return user;
}

export async function createNewUser(user: User): Promise<User | never> {
  const User = await prisma.user.create({ data: user });
  return User;
}
