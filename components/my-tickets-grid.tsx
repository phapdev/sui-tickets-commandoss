"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { TicketCard } from "@/components/ticket-card"
import { Card, CardContent } from "@/components/ui/card"
import { Ticket } from "lucide-react"

// Mock tickets data
const mockTickets = [
  {
    id: "1",
    eventTitle: "Blockchain Conference 2024",
    eventDate: "2024-03-15",
    eventLocation: "San Francisco Convention Center",
    seatNumber: "A-42",
    price: "0.5",
    currency: "SUI",
    image: "/placeholder.svg?height=300&width=400",
    tokenId: "0x123...abc",
    status: "valid",
  },
  {
    id: "2",
    eventTitle: "DeFi Summit",
    eventDate: "2024-03-20",
    eventLocation: "New York Convention Center",
    seatNumber: "B-15",
    price: "0.8",
    currency: "SUI",
    image: "/placeholder.svg?height=300&width=400",
    tokenId: "0x456...def",
    status: "valid",
  },
]

export function MyTicketsGrid() {
  const [tickets, setTickets] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading tickets from blockchain
    const loadTickets = async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      setTickets(mockTickets)
      setIsLoading(false)
    }

    loadTickets()
  }, [])

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
          >
            <Card className="h-64">
              <CardContent className="p-6 flex items-center justify-center h-full">
                <div className="text-center">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2"
                  />
                  <p className="text-muted-foreground">Loading tickets...</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    )
  }

  if (tickets.length === 0) {
    return (
      <Card className="p-12">
        <CardContent className="text-center">
          <Ticket className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No Tickets Found</h3>
          <p className="text-muted-foreground">
            You don't have any tickets yet. Browse events to purchase your first NFT ticket!
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tickets.map((ticket, index) => (
        <motion.div
          key={ticket.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <TicketCard ticket={ticket} />
        </motion.div>
      ))}
    </div>
  )
}
