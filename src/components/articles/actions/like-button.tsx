"use client";

import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import React, { useOptimistic, useTransition } from "react";
import { toggleLike } from "@/actions/like-toggle";
import { useRouter } from "next/navigation";
import type { Like } from "@prisma/client";

type LikeButtonProps = {
  articleId: string;
  likes: Like[];
  isLiked: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  articleId,
  likes,
  isLiked,
}) => {
  const router = useRouter();
  const [optimisticLikes, setOptimisticLikes] = useOptimistic(likes.length);
  const [isPending, startTransition] = useTransition();

  const handleLike = async () => {
    startTransition(async () => {
      setOptimisticLikes(isLiked ? optimisticLikes - 1 : optimisticLikes + 1); // Optimistically update UI
      const result = await toggleLike(articleId);

      if (result?.error) {
        // Redirect to sign-up page if the user is not authenticated
        router.push("/sign-up");
      }
    });
  };

  return (
    <div className="flex gap-4 mb-8 border-t pt-6">
      <form action={handleLike}>
        <Button
          type="button"
          variant="ghost"
          className="gap-2 rounded-full py-7"
          onClick={handleLike}
          disabled={isPending}
        >
          <ThumbsUp className="h-5 w-5 md:w-8 md:h-8" />
          {optimisticLikes}
        </Button>
      </form>
    </div>
  );
};

export default LikeButton;