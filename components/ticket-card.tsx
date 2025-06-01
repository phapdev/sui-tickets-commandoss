"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Tag, ExternalLink } from "lucide-react"
import Image from "next/image"
import { motion } from "framer-motion"
import { useState } from "react"

interface TicketProps {
  id: string
  eventId: string
  eventTitle: string
  date: string
  time: string
  location: string
  ticketType: string
  price: string
  purchaseDate: string
  status: string
  tokenId: string
  image: string
}

export function TicketCard({ ticket }: { ticket: TicketProps }) {
  const [isFlipped, setIsFlipped] = useState(false)

  return (
    <div className="ticket-card relative h-[280px] cursor-pointer perspective">
      <motion.div
        className="w-full h-full relative preserve-3d"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front of ticket */}
        <Card className="absolute w-full h-full backface-hidden border border-border bg-card overflow-hidden">
          <div className="flex h-full">
            <div className="w-1/3 relative">
              <Image src={ticket.image || "/placeholder.svg"} alt={ticket.eventTitle} fill className="object-cover" />
            </div>
            <CardContent className="w-2/3 p-4 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold line-clamp-1">{ticket.eventTitle}</h3>
                  <Badge variant={ticket.status === "active" ? "default" : "secondary"}>
                    {ticket.status === "active" ? "Active" : "Used"}
                  </Badge>
                </div>

                <div className="space-y-1 text-xs text-muted-foreground mb-2">
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{ticket.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>{ticket.time}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{ticket.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Tag className="h-3 w-3 mr-1" />
                    <span>{ticket.ticketType}</span>
                  </div>
                </div>
              </div>

              <div className="text-xs text-muted-foreground">
                <p>Tap to view details</p>
              </div>
            </CardContent>
          </div>
        </Card>

        {/* Back of ticket */}
        <Card className="absolute w-full h-full backface-hidden rotateY-180 border border-border bg-card overflow-hidden">
          <CardContent className="p-4 flex flex-col justify-between h-full">
            <div>
              <h3 className="font-semibold mb-4">{ticket.eventTitle}</h3>

              <div className="space-y-3 mb-4">
                <div>
                  <p className="text-xs text-muted-foreground">Ticket ID</p>
                  <p className="text-sm font-mono">{ticket.id}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Token ID</p>
                  <p className="text-sm font-mono truncate">{ticket.tokenId}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Purchase Date</p>
                  <p className="text-sm">{ticket.purchaseDate}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Price</p>
                  <p className="text-sm">{ticket.price}</p>
                </div>
              </div>
            </div>

            <Button variant="outline" size="sm" className="gap-2">
              <ExternalLink className="h-3 w-3" />
              View on Explorer
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
