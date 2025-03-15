import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import Image from "next/image";

export async function TopArticles() {
  const articles = await prisma.articles.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      comments: true,
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {articles.slice(0, 3).map((article) => (
        <Card
          key={article.id}
          className={cn(
            "group relative overflow-hidden transition-all hover:scale-[1.02] duration-300",
            "border border-gray-200/50 dark:border-white/10",
            "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
          )}
        >
          <div className="p-1">
            <Link href={`/articles/${article.id}`}>
              {/* Image Container */}
              <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                <Image
                  src={article.featuredImage as string}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Author Info */}
              <div className="p-3">
              <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={article.author.imageUrl as string} />
                  <AvatarFallback>
                    {article.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span>{article.author.name}</span>
              </div>

              {/* Article Title */}
              <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                {article.title}
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                {article.category}
              </p>

              {/* Trimmed Content */}
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 ">
                {trimContent(article.content, 25)}
              </p>

              {/* Article Meta Info */}
              <div className="mt-5 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                <span>{new Date(article.createdAt).toDateString()}</span>
                <span>{12} min read</span>
              </div>
              </div>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Helper function to trim content to a specified number of words
function trimContent(content: string, maxWords: number): string {
  // Remove HTML tags using a regular expression
  const strippedContent = content.replace(/<[^>]*>/g, "");

  // Trim the content to the specified number of words
  const words = strippedContent.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return strippedContent;
}