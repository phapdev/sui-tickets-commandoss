"use client";

import { EventCard } from "@/components/event-card";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Ticket } from "@/types";
import { useTusky } from "@/stores/tusky/hooks/useTusky";
import { Suspense } from "react";

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
  );
}

export default function ViewPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ViewPageContent />
    </Suspense>
  );
} 