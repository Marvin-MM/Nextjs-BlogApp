"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
  try {
    // Step 1: Delete the article
    await prisma.articles.delete({
      where: {
        id: articleId,
      },
    });

    // Step 2: Revalidate the dashboard page
    revalidatePath("/dashboard");
  } catch (error) {
    console.error("Error deleting article:", error);
    throw error; // Re-throw the error to handle it in the UI
  }
};