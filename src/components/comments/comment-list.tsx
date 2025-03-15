import type { Prisma } from "@prisma/client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
type CommentListProps = {
  comments: Prisma.CommentGetPayload<{
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
const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div className="space-y-8">
      {comments.map((comment) => (
        <div key={comment.id} className="flex gap-2 md:gap-4">
          <Avatar className="h-6 md:h-8 w-6 md:w-8">
            <AvatarImage src={comment.author.imageUrl as string} />
            <AvatarFallback>{comment.author.name}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="mb-2">
              <span className="font-semibold text-foreground text-sm md:text-base">
                {comment.author.name}
              </span>
              <span className="text-xs text-muted-foreground ml-3">
                {comment.createdAt.toDateString()}
              </span>
            </div>
            <p className="text-muted-foreground text-sm md:base">{comment.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentList;
