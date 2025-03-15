"use client";
import React, { useActionState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createComments } from "@/actions/create-comment";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

type CommentFormProps = {
  articleId: string;
};

const CommentForm: React.FC<CommentFormProps> = ({ articleId }) => {
  const router = useRouter();
  const [formState, action, isPending] = useActionState(createComments.bind(null, articleId), {
    errors: {},
  });

  // Redirect to sign-up page if the user is not authenticated
  React.useEffect(() => {
    if (formState.errors.formErrors?.includes("You have to login first")) {
      router.push("/sign-up");
    }
  }, [formState.errors.formErrors, router]);

  return (
    <form action={action} className="mb-4 md:mb-8">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src="/current-user-avatar.jpg" />
          <AvatarFallback><Send className="w-5 h-5" /></AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <Input placeholder="Add a comment..." name="body" className="py-3 md:py-6 text-xs md:text-base rounded-xl" />
          {formState.errors.body && (
            <p className="text-red-600 text-sm font-medium rounded-full">{formState.errors.body}</p>
          )}
          <div className="mt-2 md:mt-4 flex justify-end">
            <Button disabled={isPending} type="submit" className="rounded-xl text-sm md:text-base">
              {isPending ? "Loading..." : "Post Comment"}
            </Button>
          </div>
          {formState.errors.formErrors && (
            <div className="py-1 px-3 border border-red-600 bg-red-100 text-xs md:text-sm rounded-2xl mt-2">
              {formState.errors.formErrors[0]}
            </div>
          )}
        </div>
      </div>
    </form>
  );
};

export default CommentForm;