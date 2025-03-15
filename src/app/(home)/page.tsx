import { BlogFooter } from "@/components/home/blog-footer";
import HeroSection from "@/components/home/hero-section";
import { TopArticles } from "@/components/home/top-articles";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import Link from "next/link";
import React, { Suspense } from "react";

const page = async () => {
  return (
    <main>
      <HeroSection />
      <section className="relative py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Featured Articles
            </h2>
            <p className="md:mt-4 mt-2 md:text-lg text-gray-600 dark:text-gray-300">
              Discover our most popular and trending content
            </p>
          </div>

          {/* Top Articles */}
          <Suspense fallback={<Loader className="h-6 w-6 animate-spin justify-center items-center" />}>
            <TopArticles/>
          </Suspense>

          <div className="mt-12 text-center">
            <Link href={"/articles"}>
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-lg hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900"
              >
                View All Articles
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <BlogFooter />
    </main>
  );
};

export default page;
