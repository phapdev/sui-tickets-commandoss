"use client"

import { EventCard } from "@/components/event-card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useState } from "react"
import { useTicketStore } from "@/stores/storage/useTicketStorage"
import { Ticket } from "@/types"

const categories = ["All", "Technology", "Music", "Art", "Finance", "Gaming"]

export function BuyTickets() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const { tickets: events } = useTicketStore()

  const filteredEvents =
    selectedCategory === "All" ? events : events?.filter((event) => event.category === selectedCategory)

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
          <p className="text-muted-foreground">No events found in this category.</p>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredEvents?.map((event) => (
            <motion.div key={event.id} variants={item}>
              <EventCard event={event as unknown as Ticket} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
