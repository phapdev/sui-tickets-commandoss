"use client"

import { MyTicketCard } from "@/components/my-ticket-card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"

// Mock tickets data
const tickets = [
  {
    id: "t-1",
    eventId: "1",
    eventTitle: "Blockchain Summit 2024",
    date: "June 15, 2024",
    location: "San Francisco, CA",
    price: "0.5 SUI",
    category: "Technology",
    status: "active",
    tokenId: "0x7a3f9b2c1d8e4f5a6b7c8d9e0f1a2b3c",
    image: "/placeholder.svg?height=400&width=600&text=Blockchain+Summit",
    gradient: "from-blue-500 to-purple-600",
  },
  {
    id: "t-2",
    eventId: "3",
    eventTitle: "Crypto Music Festival",
    date: "August 5, 2024",
    location: "Miami, FL",
    price: "1.2 SUI",
    category: "Music",
    status: "active",
    tokenId: "0x3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8",
    image: "/placeholder.svg?height=400&width=600&text=Music+Festival",
    gradient: "from-pink-500 to-orange-500",
  },
  {
    id: "t-3",
    eventId: "5",
    eventTitle: "DeFi Investment Summit",
    date: "September 10, 2024",
    location: "Chicago, IL",
    price: "0.7 SUI",
    category: "Finance",
    status: "active",
    tokenId: "0x9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4",
    image: "/placeholder.svg?height=400&width=600&text=DeFi+Summit",
    gradient: "from-yellow-500 to-red-500",
  },
]

export function MyTickets() {
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
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-2">My Tickets</h2>
        <p className="text-muted-foreground">Your NFT ticket collection</p>
      </div>

      {tickets.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-6xl mb-4">🎟️</div>
          <h3 className="text-xl font-semibold mb-2">No tickets yet</h3>
          <p className="text-muted-foreground mb-6">
            Start building your collection by purchasing tickets to amazing events
          </p>
          <Button asChild>
            <Link href="/">Browse Events</Link>
          </Button>
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {tickets.map((ticket) => (
            <motion.div key={ticket.id} variants={item}>
              <MyTicketCard ticket={ticket} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  )
}
