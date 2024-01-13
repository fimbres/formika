"use server";

import { currentUser } from "@clerk/nextjs";

import { prisma } from "@/lib/db";

class UserNotFoundError extends Error {}

export async function GetFormStats() {
  const user = await currentUser();

  if(!user) {
    throw new UserNotFoundError();
  }

  const stats = await prisma.form.aggregate({
    where: {
      userId: user.id,
    },
    _sum: {
      visits: true,
      submissions: true,
    }
  });

  const visits = stats._sum.visits || 0;
  const submissions = stats._sum.submissions || 0;

  let submissionRate = 0;
  
  if(visits > 0) {
    submissionRate = (submissions / visits) * 100;
  }

  const bounceRate = 100 - submissionRate;

  return {
    visits,
    submissions,
    submissionRate,
    bounceRate
  };
}

export async function CreateForm(data: { name: string, description?: string }) {
  const user = await currentUser();
  
  if (!user) {
    throw new UserNotFoundError();
  }

  const { name, description } = data;

  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });

  if (!form) {
    throw new Error("something went wrong");
  }

  return form.id;
}

export async function GetAllForms() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.findMany({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function GetFormById(id: number) {
  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.findUnique({
    where: {
      userId: user.id,
      id,
    },
  });
}

export async function PublishForm(id: number) {
  const user = await currentUser();
  
  if (!user) {
    throw new UserNotFoundError();
  }

  return await prisma.form.update({
    data: {
      published: true,
    },
    where: {
      userId: user.id,
      id,
    },
  });
}
