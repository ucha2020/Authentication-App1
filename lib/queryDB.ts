import { User, Prisma } from "@/generated/prisma/client";
import prisma from "@/lib/prisma";

export async function fetchUserWithUniqueEmail(
  emailAdress: string,
): Promise<User | null> {
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { email: emailAdress },
    });
  } catch (err) {
    throw err;
  }

  return user ? user : null;
}

export async function createNewUser(
  user: Prisma.UserCreateInput,
): Promise<User | never> {
  const User = await prisma.user.create({ data: user });
  return User;
}

export async function upgradeUser(userEmail: string): Promise<User> {
  const updatedUser = await prisma.user.update({
    where: { email: userEmail },
    data: { role: "ADMIN" },
  });
  return updatedUser;
}
