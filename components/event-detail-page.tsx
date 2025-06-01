"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, ArrowLeft, Ticket, Share2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

interface EventDetailProps {
  id: string
  title: string
  date: string
  time: string
  location: string
  address: string
  price: string
  category: string
  description: string
  image: string
  gradient: string
  gallery: string[]
  speakers: Array<{ name: string; role: string; image: string }>
  agenda: Array<{ time: string; title: string }>
  totalTickets: number
  soldTickets: number
  organizer: string
}

export function EventDetailPage({ event }: { event: EventDetailProps }) {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const availableTickets = event.totalTickets - event.soldTickets
  const soldPercentage = (event.soldTickets / event.totalTickets) * 100

  const handleBuyTicket = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Ticket purchased!",
        description: `You've successfully purchased a ticket for ${event.title}`,
      })
    }, 1500)
  }

  const handleShare = () => {
    navigator.share?.({
      title: event.title,
      text: event.description,
      url: window.location.href,
    }) || navigator.clipboard.writeText(window.location.href)

    toast({
      title: "Link copied!",
      description: "Event link has been copied to clipboard",
    })
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[60vh] overflow-hidden">
        <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-r ${event.gradient} opacity-30`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Button asChild variant="secondary" size="sm" className="bg-white/90 text-black hover:bg-white">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Link>
          </Button>
        </div>

        {/* Share button */}
        <div className="absolute top-6 right-6">
          <Button onClick={handleShare} variant="secondary" size="sm" className="bg-white/90 text-black hover:bg-white">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <Badge variant="secondary" className="bg-white/90 text-black mb-4">
              {event.category}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{event.title}</h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{event.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="speakers">Speakers</TabsTrigger>
                <TabsTrigger value="agenda">Agenda</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">About This Event</h3>
                    <p className="text-muted-foreground leading-relaxed mb-6">{event.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Location</h4>
                        <p className="text-muted-foreground">{event.address}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Organizer</h4>
                        <p className="text-muted-foreground">{event.organizer}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="speakers" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {event.speakers.map((speaker, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card>
                        <CardContent className="p-6 text-center">
                          <div className="relative w-20 h-20 mx-auto mb-4">
                            <Image
                              src={speaker.image || "/placeholder.svg"}
                              alt={speaker.name}
                              fill
                              className="object-cover rounded-full"
                            />
                          </div>
                          <h4 className="font-semibold">{speaker.name}</h4>
                          <p className="text-sm text-muted-foreground">{speaker.role}</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="agenda" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {event.agenda.map((item, index) => (
                        <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                          <div className="text-sm font-mono text-muted-foreground min-w-[80px]">{item.time}</div>
                          <div className="flex-1">
                            <h4 className="font-medium">{item.title}</h4>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="gallery" className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {event.gallery.map((image, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="relative h-48 overflow-hidden rounded-lg"
                    >
                      <Image
                        src={image || "/placeholder.svg"}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-300"
                      />
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold mb-2">{event.price}</div>
                    <p className="text-muted-foreground">per ticket</p>
                  </div>

                  <Button onClick={handleBuyTicket} disabled={isLoading} className="w-full mb-4" size="lg">
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="h-5 w-5 border-2 border-t-transparent border-white rounded-full"
                      />
                    ) : (
                      <>
                        <Ticket className="h-5 w-5 mr-2" />
                        Buy Ticket
                      </>
                    )}
                  </Button>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Available</span>
                      <span className="font-medium">{availableTickets} tickets</span>
                    </div>

                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${soldPercentage}%` }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Sold</span>
                      <span className="font-medium">
                        {event.soldTickets} / {event.totalTickets}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
