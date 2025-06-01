"use client"

import { motion } from "framer-motion"
import { EventCard } from "@/components/event-card"

// Mock events data
const events = [
  {
    id: "1",
    title: "Blockchain Conference 2024",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-03-15",
    location: "San Francisco",
    price: "0.5",
    currency: "SUI",
    category: "Technology",
  },
  {
    id: "2",
    title: "DeFi Summit",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-03-20",
    location: "New York",
    price: "0.8",
    currency: "SUI",
    category: "Finance",
  },
  {
    id: "3",
    title: "NFT Art Exhibition",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-03-25",
    location: "Los Angeles",
    price: "0.3",
    currency: "SUI",
    category: "Art",
  },
  {
    id: "4",
    title: "Web3 Gaming Convention",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-04-01",
    location: "Austin",
    price: "0.6",
    currency: "SUI",
    category: "Gaming",
  },
  {
    id: "5",
    title: "Crypto Music Festival",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-04-10",
    location: "Miami",
    price: "1.2",
    currency: "SUI",
    category: "Music",
  },
  {
    id: "6",
    title: "Metaverse Expo",
    image: "/placeholder.svg?height=300&width=400",
    date: "2024-04-15",
    location: "Seattle",
    price: "0.7",
    currency: "SUI",
    category: "Technology",
  },
]

export function EventsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <EventCard event={event} />
        </motion.div>
      ))}
    </div>
  )
}
