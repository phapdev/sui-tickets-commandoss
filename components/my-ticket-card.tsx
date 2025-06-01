"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, ExternalLink, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

interface TicketProps {
  id: string
  eventId: string
  eventTitle: string
  date: string
  location: string
  price: string
  category: string
  status: string
  tokenId: string
  image: string
  gradient: string
}

export function MyTicketCard({ ticket }: { ticket: TicketProps }) {
  const handleViewOnExplorer = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    window.open(`https://explorer.sui.io/object/${ticket.tokenId}`, "_blank")
  }

  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }}>
      <Card className="overflow-hidden border-0 bg-transparent group">
        <div className="relative h-64 overflow-hidden rounded-xl">
          <Image
            src={ticket.image || "/placeholder.svg"}
            alt={ticket.eventTitle}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />

          {/* Gradient overlay */}
          <div
            className={`absolute inset-0 bg-gradient-to-t ${ticket.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Status badge */}
          <div className="absolute top-4 left-4">
            <Badge variant={ticket.status === "active" ? "default" : "secondary"} className="bg-white/90 text-black">
              {ticket.status === "active" ? "Active" : "Used"}
            </Badge>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 right-4">
            <Badge variant="outline" className="bg-black/50 text-white border-white/30">
              {ticket.category}
            </Badge>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="text-lg font-bold mb-2 line-clamp-2">{ticket.eventTitle}</h3>

            <div className="space-y-1 text-sm text-white/80 mb-4">
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-2" />
                <span>{ticket.date}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-2" />
                <span>{ticket.location}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button asChild size="sm" className="flex-1 bg-white text-black hover:bg-white/90">
                <Link href={`/tickets/${ticket.id}`}>
                  <Eye className="h-3 w-3 mr-2" />
                  View Details
                </Link>
              </Button>
              <Button
                onClick={handleViewOnExplorer}
                size="sm"
                variant="outline"
                className="bg-black/50 text-white border-white/30 hover:bg-black/70"
              >
                <ExternalLink className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
