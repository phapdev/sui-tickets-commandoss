import { TicketDetailPage } from "@/components/ticket-detail-page"
import { notFound } from "next/navigation"

// Mock ticket data
const getTicket = async (id: string) => {
  const tickets = [
    {
      id: "t-1",
      eventId: "1",
      eventTitle: "Blockchain Summit 2024",
      date: "June 15, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "San Francisco Convention Center",
      address: "747 Howard St, San Francisco, CA 94103",
      price: "0.5 SUI",
      category: "Technology",
      status: "active",
      purchaseDate: "May 1, 2024",
      tokenId: "0x7a3f9b2c1d8e4f5a6b7c8d9e0f1a2b3c",
      seatNumber: "A-42",
      ticketType: "General Admission",
      image: "/placeholder.svg?height=600&width=1200&text=Blockchain+Summit+2024",
      gradient: "from-blue-500 to-purple-600",
      qrCode: "/placeholder.svg?height=200&width=200&text=QR+Code",
      eventDescription:
        "Join the biggest blockchain conference of the year featuring top speakers, workshops, and networking opportunities.",
      transferHistory: [{ date: "May 1, 2024", from: "Minted", to: "0x7a3f...3f9b", txHash: "0xabc123..." }],
    },
    {
      id: "t-2",
      eventId: "3",
      eventTitle: "Crypto Music Festival",
      date: "August 5, 2024",
      time: "4:00 PM - 12:00 AM",
      location: "Bayfront Park",
      address: "301 Biscayne Blvd, Miami, FL 33132",
      price: "1.2 SUI",
      category: "Music",
      status: "active",
      purchaseDate: "May 3, 2024",
      tokenId: "0x3e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8",
      seatNumber: "VIP-15",
      ticketType: "VIP Access",
      image: "/placeholder.svg?height=600&width=1200&text=Crypto+Music+Festival",
      gradient: "from-pink-500 to-orange-500",
      qrCode: "/placeholder.svg?height=200&width=200&text=QR+Code",
      eventDescription: "Experience the ultimate fusion of music and technology at the biggest crypto music festival.",
      transferHistory: [{ date: "May 3, 2024", from: "Minted", to: "0x3e4f...7a8b", txHash: "0xdef456..." }],
    },
    {
      id: "t-3",
      eventId: "5",
      eventTitle: "DeFi Investment Summit",
      date: "September 10, 2024",
      time: "9:30 AM - 5:00 PM",
      location: "McCormick Place",
      address: "2301 S King Dr, Chicago, IL 60616",
      price: "0.7 SUI",
      category: "Finance",
      status: "active",
      purchaseDate: "May 5, 2024",
      tokenId: "0x9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4",
      seatNumber: "B-28",
      ticketType: "General Admission",
      image: "/placeholder.svg?height=600&width=1200&text=DeFi+Investment+Summit",
      gradient: "from-yellow-500 to-red-500",
      qrCode: "/placeholder.svg?height=200&width=200&text=QR+Code",
      eventDescription:
        "Learn from top DeFi experts and discover the latest investment opportunities in decentralized finance.",
      transferHistory: [{ date: "May 5, 2024", from: "Minted", to: "0x9e0f...3a4b", txHash: "0xghi789..." }],
    },
  ]

  return tickets.find((ticket) => ticket.id === id)
}

export default async function TicketPage({ params }: { params: { id: string } }) {
  const ticket = await getTicket(params.id)

  if (!ticket) {
    notFound()
  }

  return <TicketDetailPage ticket={ticket} />
}
