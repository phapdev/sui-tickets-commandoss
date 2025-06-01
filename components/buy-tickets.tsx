"use client";

import { EventCard } from "@/components/event-card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState } from "react";
import { Ticket } from "@/types";
import { useTusky } from "@/stores/tusky/hooks/useTusky";
import { Skeleton } from "@/components/ui/skeleton";

const categories = ["All", "Technology", "Music", "Art", "Finance", "Gaming"];

export function BuyTickets() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { events } = useTusky();

  const filteredEvents: Ticket[] | undefined =
    selectedCategory === "All"
      ? events
      : events?.filter(
          (event: Ticket) => event.category.includes(selectedCategory)
        );

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

  if (!events || events.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => (
            <Skeleton key={category} className="h-8 w-20" />
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-48 w-full rounded-lg" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 justify-center">
        {categories.map((category) => (
          <Badge
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer px-4 py-2 text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </Badge>
        ))}
      </div>

      {/* Events Grid */}
      {filteredEvents?.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No events found in this category.
          </p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredEvents?.map((event: Ticket) => (
            <motion.div key={event.id} variants={item}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
