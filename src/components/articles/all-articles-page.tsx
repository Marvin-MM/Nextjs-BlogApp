"use client";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search } from "lucide-react";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { motion } from "framer-motion"; 

type SearchPageProps = {
  articles: Prisma.ArticlesGetPayload<{
    include: {
      author: {
        select: {
          name: true;
          email: true;
          imageUrl: true;
        };
      };
    };
  }>[];
};

export function AllArticlesPage({ articles }: SearchPageProps) {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.3, 
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, 
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }, 
    },
  };

  const hoverVariants = {
    hover: { scale: 1.05 }, 
    tap: { scale: 0.95 }, 
  };

  if (articles.length === 0) return <NoSearchResults />;

  return (
    <motion.div
      className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} 
    >
      {articles.map((article) => (
        <motion.div key={article.id} variants={itemVariants}>
          <Card
            className="group relative overflow-hidden transition-all hover:shadow-lg"
          >
            <div className="p-1">
              {/* Image Container */}
              <motion.div
                className="relative mb-4 h-48 w-full overflow-hidden rounded-xl"
                whileHover={{ scale: 1.05 }} 
                transition={{ duration: 0.3 }} 
              >
                <Image
                  src={article.featuredImage as string}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </motion.div>
              {/* Article Content */}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-foreground">
                  {article.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{article.category}</p>

                {/* Trimmed Content */}

                  {trimContent(article.content, 30)}


                {/* Author & Metadata */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={article.author.imageUrl as string} />
                      <AvatarFallback>{article.author.name}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {article.author.name}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {article.createdAt.toDateString()}
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Helper function to trim content to a specified 
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

export function NoSearchResults() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, 
        delayChildren: 0.3, 
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, 
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }, 
    },
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center p-8 text-center"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} 
    >
      {/* Icon */}
      <motion.div
        className="mb-4 rounded-full bg-muted p-4"
        variants={itemVariants}
      >
        <Search className="h-8 w-8 text-muted-foreground" />
      </motion.div>

      {/* Title */}
      <motion.h3
        className="text-xl font-semibold text-foreground"
        variants={itemVariants}
      >
        No Results Found
      </motion.h3>

      {/* Description */}
      <motion.p
        className="mt-2 text-muted-foreground"
        variants={itemVariants}
      >
        We could not find any articles matching your search. Try a different
        keyword or phrase.
      </motion.p>
    </motion.div>
  );
}