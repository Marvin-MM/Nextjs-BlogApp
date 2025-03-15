"use client";
import React, { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "../ui/button";
import {
  BarChart,
  FileText,
  MessageCircle,
  PanelRightDashed,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden m-2 p-2">
            <PanelRightDashed />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          {/* Add SheetTitle for accessibility */}
          <SheetTitle>
            <VisuallyHidden>Mobile Sidebar</VisuallyHidden>
          </SheetTitle>
          <DashboardSidebar closeSheet={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-screen w-[250px] border-r bg-background">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default Sidebar;

function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
  return (
    <div className="h-full py-6">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Link href={"/"}>
          <span className="text-xl font-extrabold">BroCode</span>
        </Link>
      </div>
      <nav className="space-y-1">
        <Link href={"/dashboard"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <PanelRightDashed />
            Overview
          </Button>
        </Link>

        <Link href={"/dashboard/articles/create"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <FileText className="mr-2 h-4 w-4" />
            Articles
          </Button>
        </Link>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={closeSheet}
        >
          <MessageCircle className="mr-2 h-4 w-4" />
          Comments
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={closeSheet}
        >
          <BarChart className="mr-2 h-4 w-4" />
          Analytics
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={closeSheet}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
        </Button>
      </nav>
    </div>
  );
}