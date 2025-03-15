"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Menu, X } from "lucide-react";
import { ModeToggle } from "../../dark-mode";
import Link from "next/link";
import { SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import { SignedIn, UserButton } from "@clerk/nextjs";
import SearchInput from "./search-input";

export function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-background/95 backdrop-blur-2xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section - Logo & Desktop Navigation */}
          <div className="flex items-center gap-8">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                  Bro
                </span>
                <span className="text-foreground">Code</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/articles"
                className="text-sm font-medium text-muted-foreground transition-all hover:text-foreground nav-link"
              >
                Articles
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground transition-all hover:text-foreground nav-link"
              >
                Tutorials
              </Link>
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground transition-all hover:text-foreground nav-link"
              >
                About
              </Link>
              {isLoggedIn && (
                <Link
                  href="/dashboard"
                  className="text-sm font-medium text-muted-foreground transition-all hover:text-foreground nav-link"
                >
                  Dashboard
                </Link>
              )}
            </div>
          </div>

          {/* Right Section - Search & Actions */}
          <div className="flex items-center gap-4">
            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex items-center">
              <SearchInput />
            </div>

            {/* Theme Toggle */}
            <ModeToggle />

            {/* User Actions */}
            {isLoggedIn ? (
              <SignedIn>
                <UserButton afterSignOutUrl="/" />
              </SignedIn>
            ) : (
              <SignedOut>
                <div className="hidden md:flex items-center gap-2">
                  <SignInButton>
                    <Button variant="outline">Login</Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button>Sign up</Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-8 w-8" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-4 border-t">
            {/* Search Bar (Mobile) */}
            <div className="px-4 hidden">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search articles..."
                  className="pl-10 w-full focus-visible:ring-1"
                />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 px-4">
              <Link
                href="/articles"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="nav-link">Articles</span>
              </Link>
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="nav-link">Tutorials</span>
              </Link>
              <Link
                href="/"
                className="block px-3 py-2 text-base font-medium text-foreground"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="nav-link">About</span>
              </Link>
              {isLoggedIn && (
                <Link
                  href="/dashboard"
                  className="block px-3 py-2 text-base font-medium text-foreground"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="nav-link">Dashboard</span>
                </Link>
              )}
            </div>

            {/* Mobile Auth Buttons */}
            {!isLoggedIn && (
              <SignedOut>
                <div className="px-4 flex flex-col gap-2">
                  <SignInButton>
                    <Button variant="outline" className="w-full">
                      Login
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="w-full">Sign up</Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}