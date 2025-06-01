"use client"

import { EventCard } from "@/components/event-card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import { useState } from "react"

// Mock events data with categories and better images
const events = [
  {
    id: "1",
    title: "Blockchain Summit 2024",
    date: "June 15, 2024",
    price: "0.5 SUI",
    category: "Technology",
    image: "/placeholder.svg?height=600&width=800&text=Blockchain+Summit",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: "2",
    title: "Web3 Developer Conference",
    date: "July 22, 2024",
    price: "0.8 SUI",
    category: "Technology",
    image: "/placeholder.svg?height=600&width=800&text=Web3+Conference",
    gradient: "from-green-500 to-blue-500",
  },
  {
    id: "3",
    title: "Crypto Music Festival",
    date: "August 5, 2024",
    price: "1.2 SUI",
    category: "Music",
    image: "/placeholder.svg?height=600&width=800&text=Music+Festival",
    gradient: "from-pink-500 to-orange-500",
  },
  {
    id: "4",
    title: "NFT Art Exhibition",
    date: "August 18, 2024",
    price: "0.3 SUI",
    category: "Art",
    image: "/placeholder.svg?height=600&width=800&text=NFT+Art+Exhibition",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "5",
    title: "DeFi Investment Summit",
    date: "September 10, 2024",
    price: "0.7 SUI",
    category: "Finance",
    image: "/placeholder.svg?height=600&width=800&text=DeFi+Summit",
    gradient: "from-yellow-500 to-red-500",
  },
  {
    id: "6",
    title: "Metaverse Gaming Expo",
    date: "October 5, 2024",
    price: "0.6 SUI",
    category: "Gaming",
    image: "/placeholder.svg?height=600&width=800&text=Gaming+Expo",
    gradient: "from-indigo-500 to-purple-500",
  },
]

const categories = ["All", "Technology", "Music", "Art", "Finance", "Gaming"]

export function BuyTickets() {
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredEvents =
    selectedCategory === "All" ? events : events.filter((event) => event.category === selectedCategory)

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
      {filteredEvents.length === 0 ? (
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
          {filteredEvents.map((event) => (
            <motion.div key={event.id} variants={item}>
              <EventCard event={event} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
