import { Navbar } from "@/components/home/header/navbar";
import { prisma } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const user = await currentUser();

  // Only fetch or create a user if logged in
  if (user) {
    const loggedInUser = await prisma.user.findUnique({
      where: { clerkUserId: user.id },
    });

    if (!loggedInUser) {
      await prisma.user.create({
        data: {
          name: `${user.firstName} ${user.lastName}`,
          clerkUserId: user.id,
          email: user.emailAddresses[0].emailAddress,
          imageUrl: user.imageUrl,
        },
      });
    }
  }

  return (
    <div>
      {/* Pass isLoggedIn to Navbar */}
      <Navbar isLoggedIn={!!user} />
      {children}
    </div>
  );
};

export default layout;