"use client"; // Add this to enable client-side interactivity
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Linkedin, Github, Twitter } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion"; // Import Framer Motion

export function BlogFooter() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger animations for child elements
        delayChildren: 0.3, // Delay before starting animations
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 }, // Start slightly below and invisible
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }, // Smooth transition
    },
  };

  const hoverVariants = {
    hover: { scale: 1.05 }, // Scale up on hover
    tap: { scale: 0.95 }, // Scale down on tap
  };

  return (
    <motion.footer
      className="border-t bg-background"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }} // Animate only once
      variants={containerVariants}
    >
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Branding Section */}
          <motion.div
            className="md:col-span-2 lg:col-span-2"
            variants={itemVariants}
          >
            <h2 className="text-2xl font-bold">
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 dark:from-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
                Bro
              </span>
              <span className="text-foreground">Code</span>
            </h2>
            <p className="mt-4 text-muted-foreground">
              Where ideas meet innovation. Dive into a world of insightful
              articles written by passionate thinkers and industry experts.
            </p>

            <div className="mt-6 flex gap-2">
              <motion.div whileHover="hover" whileTap="tap" variants={hoverVariants}>
                <Button variant="ghost" size="icon">
                  <Twitter className="h-6 w-6 text-muted-foreground" />
                </Button>
              </motion.div>
              <motion.div whileHover="hover" whileTap="tap" variants={hoverVariants}>
                <Button variant="ghost" size="icon">
                  <Github className="h-6 w-6 text-muted-foreground" />
                </Button>
              </motion.div>
              <motion.div whileHover="hover" whileTap="tap" variants={hoverVariants}>
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-6 w-6 text-muted-foreground" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground">Explore</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors nav-link"
                >
                  All Articles
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors nav-link"
                >
                  Topics
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors nav-link"
                >
                  Authors
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors nav-link"
                >
                  Podcasts
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Legal */}
          <motion.div className="space-y-4" variants={itemVariants}>
            <h3 className="text-lg font-semibold text-foreground">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors nav-link"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors nav-link"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors nav-link"
                >
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-muted-foreground hover:text-foreground transition-colors nav-link"
                >
                  Licenses
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            className="space-y-4 md:col-span-2 lg:col-span-2"
            variants={itemVariants}
          >
            <h3 className="text-lg font-semibold text-foreground">Stay Updated</h3>
            <form className="flex flex-col gap-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 pr-4 py-6"
                />
                <Mail className="h-5 w-5 text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <motion.div whileHover="hover" whileTap="tap" variants={hoverVariants}>
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </motion.div>
            </form>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          className="mt-12 border-t border-gray-400 pt-8 text-center"
          variants={itemVariants}
        >
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} BroCode. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}