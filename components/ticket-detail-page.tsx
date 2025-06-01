"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, Clock, MapPin, ArrowLeft, Share2, Download, ExternalLink, Hash } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { Ticket } from "@/types"

export function TicketDetailPage({ ticket }: { ticket: Ticket }) {
  const { toast } = useToast()

  const handleShare = () => {
    navigator.share?.({
      title: `My ticket to ${ticket.title}`,
      text: `Check out my NFT ticket for ${ticket.title}`,
      url: window.location.href,
    }) || navigator.clipboard.writeText(window.location.href)

    toast({
      title: "Link copied!",
      description: "Ticket link has been copied to clipboard",
    })
  }

  const handleDownload = () => {
    toast({
      title: "Downloading ticket",
      description: "Your ticket is being downloaded as a PDF",
    })
  }

  const handleViewOnExplorer = () => {
    window.open(`https://explorer.sui.io/object/${ticket.id}`, "_blank")
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] overflow-hidden">
        <Image src={ticket.image || "/placeholder.svg"} alt={ticket.title} fill className="object-cover" />
        <div className={`absolute inset-0 bg-gradient-to-r ${ticket.gradient} opacity-30`} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Back button */}
        <div className="absolute top-6 left-6">
          <Button asChild variant="secondary" size="sm" className="bg-white/90 text-black hover:bg-white">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tickets
            </Link>
          </Button>
        </div>

        {/* Action buttons */}
        <div className="absolute top-6 right-6 flex gap-2">
          <Button onClick={handleShare} variant="secondary" size="sm" className="bg-white/90 text-black hover:bg-white">
            <Share2 className="h-4 w-4" />
          </Button>
          <Button
            onClick={handleDownload}
            variant="secondary"
            size="sm"
            className="bg-white/90 text-black hover:bg-white"
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-4 mb-4">
              <Badge variant="secondary" className="bg-white/90 text-black">
                {ticket.category}
              </Badge>
              {/* <Badge variant={ticket.status === "active" ? "default" : "secondary"} className="bg-white/90 text-black">
                {ticket.status === "active" ? "Active" : "Used"}
              </Badge> */}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">{ticket.title}</h1>
            <div className="flex flex-wrap gap-6 text-white/90">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                <span>{ticket.date}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2" />
                <span>{ticket.time}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{ticket.location}</span>
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
            <Tabs defaultValue="details" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Ticket Information</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Seat Number</h4>
                          <p className="text-muted-foreground">{ticket.totalTickets}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Ticket Type</h4>
                          <p className="text-muted-foreground">{ticket.price}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Purchase Date</h4>
                          <p className="text-muted-foreground">{ticket.date}</p>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-1">Price Paid</h4>
                          <p className="text-muted-foreground">{ticket.totalTickets}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Token ID</h4>
                          <p className="text-muted-foreground font-mono text-sm">{ticket.id}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-1">Venue Address</h4>
                          <p className="text-muted-foreground">{ticket.location}</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">About the Event</h4>
                      <p className="text-muted-foreground leading-relaxed">{ticket.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="qr" className="mt-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-4">Entry QR Code</h3>
                    <p className="text-muted-foreground mb-6">Show this QR code at the venue entrance</p>

                    <div className="inline-block p-6 bg-white rounded-lg">
                      <Image
                        src={ticket.image || "/placeholder.svg"}
                        alt="QR Code"
                        width={200}
                        height={200}
                        className="mx-auto"
                      />
                    </div>

                    <p className="text-sm text-muted-foreground mt-4">
                      This QR code is unique to your NFT ticket and cannot be duplicated
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="history" className="mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-4">Transfer History</h3>

                    <div className="space-y-4">
                    <div className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                          <div className="text-sm text-muted-foreground min-w-[100px]">{ticket.date}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">From: {ticket.address}</span>
                              <span className="text-muted-foreground">→</span>
                              <span className="text-sm">To: </span>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">txHash</p>
                          </div>
                        </div>
                      {/* {ticket.transferHistory.map((transfer, index) => (
                        <div key={index} className="flex items-start gap-4 pb-4 border-b last:border-b-0">
                          <div className="text-sm text-muted-foreground min-w-[100px]">{transfer.date}</div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm">From: {transfer.from}</span>
                              <span className="text-muted-foreground">→</span>
                              <span className="text-sm">To: {transfer.to}</span>
                            </div>
                            <p className="text-xs text-muted-foreground font-mono">{transfer.txHash}</p>
                          </div>
                        </div>
                      ))} */}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Quick Actions</h3>
                  <div className="space-y-3">
                    <Button onClick={handleViewOnExplorer} variant="outline" className="w-full justify-start">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View on Explorer
                    </Button>
                    <Button asChild variant="outline" className="w-full justify-start">
                      <Link href={`/events/${ticket.id}`}>
                        <Hash className="h-4 w-4 mr-2" />
                        View Event Details
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* NFT Info */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">NFT Information</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Token Standard</span>
                      <span>Sui NFT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Blockchain</span>
                      <span>Sui Network</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status</span>
                      {/* <Badge variant={ticket.status === "active" ? "default" : "secondary"} className="text-xs">
                        {ticket.status}
                      </Badge> */}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
