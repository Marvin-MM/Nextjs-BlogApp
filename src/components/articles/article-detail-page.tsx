import { Card } from "@/components/ui/card"; 
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { MessageCircle } from "lucide-react";
import { Prisma } from "@prisma/client";
import CommentForm from "../comments/comment-form";
import CommentList from "../comments/comment-list";
import { prisma } from "@/lib/prisma"; 
import LikeButton from "./actions/like-button";
import { auth, currentUser } from "@clerk/nextjs/server";
import Image from "next/image";
import { Button } from "../ui/button";
import { Navbar } from "../home/header/navbar";

type ArticleDetailPageProps = {
  article: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>;
};

export async function ArticleDetailPage({ article }: ArticleDetailPageProps) {

  const User = await currentUser();
  // Fetch comments for the article
  const comments = await prisma.comment.findMany({
    where: {
      articleId: article.id,
    },
    include: {
      author: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  // Fetch likes for the article
  const likes = await prisma.like.findMany({ where: { articleId: article.id } });

  // Get the authenticated user's ID
  const { userId } = await auth();

  // Fetch the user from the database only if userId is not null
  let user = null;
  if (userId) {
    user = await prisma.user.findUnique({
      where: { clerkUserId: userId },
    });
  }

  // Check if the current user has liked the article
  const isLiked = user ? likes.some((like) => like.userId === user.id) : false;

  return (
    <div className="min-h-screen bg-background">
      {/* Reuse your existing Navbar */}
      <Navbar isLoggedIn={!!user} />
      <main className="container mx-auto px-4 py-24 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          {/* Article Header */}
          <header className="mb-12">

            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-foreground mb-4">
              {article.title}
            </h1>

            <div className="relative mb-4 h-56 md:h-96 w-full overflow-hidden rounded-xl">
                <Image
                  src={article.featuredImage as string}
                  alt={article.title}
                  fill
                  className="hover:scale-105 transition-all duration-300"
                />

             <div className="absolute top-0 right-0">
              <Button variant="outline" className="rounded-2xl px-3 py-0.5 m-0.5 text-xs md:text-sm text-primary">
                {article.category}
              </Button>
                </div>
            </div>

            <div className="flex items-center gap-4 text-muted-foreground">
              <Avatar className="h-10 w-10">
                <AvatarImage src={article.author.imageUrl as string} />
                <AvatarFallback>{article.id}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">
                  {article.author.name}
                </p>
                <p className="text-xs md:text-sm">
                  {article.createdAt.toDateString()} · {12} min read
                </p>
              </div>
            </div>
          </header>

          {/* Article Content */}
          <section
            className="prose prose-lg dark:prose-invert max-w-none mb-8 md:mb-12"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Article Actions */}
          <LikeButton articleId={article.id} likes={likes} isLiked={isLiked} />

          {/* Comments Section */}
          <Card className="p-4 md:p-6 md:rounded-2xl">
            <div className="flex items-center gap-2 mb-6">
              <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-primary" />
              <h2 className="text-xl md:text-2xl font-bold text-foreground">
                {comments.length} Comments
              </h2>
            </div>

            {/* Comment Form */}
            <CommentForm articleId={article.id} />

            {/* Comments List */}
            <CommentList comments={comments} />
          </Card>
        </article>
      </main>
    </div>
  );
}