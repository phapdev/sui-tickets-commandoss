"use client";

import { EventCard } from "@/components/event-card";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Ticket } from "@/types";
import { useTusky } from "@/stores/tusky/hooks/useTusky";
import { Suspense } from "react";
import Head from "next/head";

function ViewPageContent() {
  const searchParams = useSearchParams();
  const { events } = useTusky();
  const id = searchParams.get("id");
  const event = events?.find((event: Ticket) => event.id === id);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  if (!event) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@suitickets" />
        <meta name="twitter:title" content={event.title} />
        <meta name="twitter:description" content={event.description} />
        <meta name="twitter:image" content={event.image} />
        <meta name="twitter:player" content={`${window.location.origin}/view?id=${id}`} />
        <meta name="twitter:player:width" content="580" />
        <meta name="twitter:player:height" content="680" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/view?id=${id}`} />
        <meta property="og:title" content={event.title} />
        <meta property="og:description" content={event.description} />
        <meta property="og:image" content={event.image} />
      </Head>
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div
          className="w-full max-w-md"
          variants={container}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={item}>
            <EventCard event={event as Ticket} />
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}

export default function ViewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ViewPageContent />
    </Suspense>
  );
} 