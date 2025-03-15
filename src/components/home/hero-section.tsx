"use client";
import Image from "next/image";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const HeroSection = () => {
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

  const statsVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.2,
      },
    },
  };

  const statItemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, duration: 0.5 },
    },
  };

  const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
    float: {
      y: [0, -10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 3,
          ease: "easeInOut",
        },
      },
    },
  };

  // Image URLs for the slider
  const images = [
    "https://images.unsplash.com/photo-1485988412941-77a35537dae4?q=80&w=2992&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2970&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  ];

  return (
    <section className="relative min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-purple-950 via-indigo-950 to-indigo-950">
      {/* Gradient overlay */}
      <div className="absolute inset-0 before:absolute before:left-1/4 before:top-0 before:h-[500px] before:w-[500px] before:rounded-full before:bg-gradient-to-r before:from-violet-600/20 before:to-indigo-600/20 before:blur-3xl" />

      <div className="container relative mx-auto flex h-full flex-col items-center justify-center px-4 py-24 md:flex-row md:py-32">
        {/* Content */}
        <motion.div
          className="flex-1 space-y-8 text-center md:text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Title */}
          <motion.h1
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl"
            variants={itemVariants}
          >
            Explore the World Through
            <motion.span
              className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.7 }}
            >
              {" "}
              Words
            </motion.span>
          </motion.h1>

          {/* Description */}
          <motion.p
            className="mx-auto max-w-2xl text-lg text-gray-300 md:text-xl"
            variants={itemVariants}
          >
            Discover insightful articles, thought-provoking stories, and expert
            perspectives on technology, lifestyle, and innovation.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row md:justify-start"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="rounded-full px-6 py-6 font-semibold md:text-lg">
                Start Reading
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-6 py-6 font-semibold md:text-lg dark:text-white"
              >
                Explore Topics
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-3 gap-4 pt-8 text-white md:max-w-md"
            variants={statsVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div className="space-y-2" variants={statItemVariants}>
              <motion.div
                className="text-2xl font-bold text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                1K+
              </motion.div>
              <div className="text-sm text-gray-400">Published Articles</div>
            </motion.div>
            <motion.div className="space-y-2" variants={statItemVariants}>
              <motion.div
                className="text-2xl font-bold text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.3 }}
              >
                50+
              </motion.div>
              <div className="text-sm text-gray-400">Expert Writers</div>
            </motion.div>
            <motion.div className="space-y-2" variants={statItemVariants}>
              <motion.div
                className="text-2xl font-bold text-primary"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.4 }}
              >
                10M+
              </motion.div>
              <div className="text-sm text-gray-400">Monthly Readers</div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Swiper Slider */}
        <motion.div
          className="mt-12 flex-1 md:mt-0"
          initial="hidden"
          animate={["visible", "float"]}
          variants={imageVariants}
        >
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            effect="fade"
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            loop={true}
            className={cn(
              "relative mx-auto h-72 w-80 rounded-2xl overflow-hidden",
              "bg-gradient-to-br from-white/5 to-transparent",
              "border border-primary/20 backdrop-blur-lg",
              "shadow-2xl shadow-indigo-500/10"
            )}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={image}
                  alt={`Slide ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;