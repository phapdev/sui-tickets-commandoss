"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Ticket } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { useState } from "react"
import { Ticket as TicketType } from "@/types"
import { toast } from "sonner"

export function EventCard({ event }: { event: TicketType }) {
  const [isLoading, setIsLoading] = useState(false)

  const handleBuyTicket = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      toast.success("Ticket purchased!");
    }, 1500)
  }

  return (
    <Link href={`/tickets/${event.id}`}>
      <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3 }} className="cursor-pointer">
        <Card className="overflow-hidden border-0 bg-transparent group">
          <div className="relative h-80 overflow-hidden rounded-xl">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title || ""}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

            {/* Gradient overlay */}
            <div
              className={`absolute inset-0 bg-gradient-to-t ${event.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-300`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Category badge */}
            <div className="absolute top-4 left-4">
              <Badge variant="secondary" className="bg-white/90 text-black">
                {event.category}
              </Badge>
            </div>

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <h3 className="text-xl font-bold mb-2 line-clamp-2">{event.title}</h3>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-white/80">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{event.date}</span>
                </div>
                <div className="text-lg font-bold">{event.price}</div>
              </div>

              <Button
                onClick={handleBuyTicket}
                disabled={isLoading}
                className="w-full mt-4 bg-white text-black hover:bg-white/90"
                size="sm"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="h-4 w-4 border-2 border-t-transparent border-black rounded-full"
                  />
                ) : (
                  <>
                    <Ticket className="h-4 w-4 mr-2" />
                    Buy Ticket
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </Link>
  );
}
