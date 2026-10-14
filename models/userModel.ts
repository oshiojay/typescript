import prisma from "../config/prisma";

const safeUser = {
  id: true,
  name: true,
  email: true,
  createdAt: true,
  updatedAt: true,
};

export const UserModel = {
  findAll: () => prisma.user.findMany({ select: safeUser }),

  findById: (id: string) =>
    prisma.user.findUnique({ where: { id }, select: safeUser }),

  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),

  create: (data: { name: string; email: string; password: string }) =>
    prisma.user.create({ data, select: safeUser }),

  update: (
    id: string,
    data: { name?: string; email?: string; password?: string }
  ) => prisma.user.update({ where: { id }, data, select: safeUser }),

  remove: (id: string) => prisma.user.delete({ where: { id } }),
};