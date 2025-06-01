"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, User, Clock, Users } from "lucide-react"
import Image from "next/image"

interface Event {
  id: string
  title: string
  description: string
  image: string
  date: string
  time: string
  location: string
  price: string
  currency: string
  totalTickets: number
  soldTickets: number
  category: string
  organizer: string
  gallery: string[]
}

interface EventDetailsProps {
  event: Event
}

export function EventDetails({ event }: EventDetailsProps) {
  const availableTickets = event.totalTickets - event.soldTickets
  const soldPercentage = (event.soldTickets / event.totalTickets) * 100

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
      {/* Main Image */}
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={event.image || "/placeholder.svg"}
          alt={event.title}
          width={800}
          height={400}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute top-4 left-4">
          <Badge variant="secondary" className="text-sm">
            {event.category}
          </Badge>
        </div>
      </div>

      {/* Event Info */}
      <Card>
        <CardContent className="p-6">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="w-5 h-5 mr-3" />
              <span>{new Date(event.date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="w-5 h-5 mr-3" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <MapPin className="w-5 h-5 mr-3" />
              <span>{event.location}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <User className="w-5 h-5 mr-3" />
              <span>{event.organizer}</span>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About This Event</h3>
            <p className="text-muted-foreground leading-relaxed">{event.description}</p>
          </div>

          {/* Ticket Availability */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Ticket Availability</h3>
              <div className="flex items-center text-muted-foreground">
                <Users className="w-4 h-4 mr-1" />
                <span>{availableTickets} left</span>
              </div>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <motion.div
                className="bg-primary h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${soldPercentage}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {event.soldTickets} of {event.totalTickets} tickets sold
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Gallery */}
      {event.gallery && event.gallery.length > 0 && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Event Gallery</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {event.gallery.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`Gallery image ${index + 1}`}
                    width={300}
                    height={200}
                    className="w-full h-32 object-cover hover:scale-110 transition-transform duration-300"
                  />
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  )
}
