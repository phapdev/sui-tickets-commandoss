import { EventDetailPage } from "@/components/event-detail-page"
import { notFound } from "next/navigation"

// Mock event data - in real app, fetch from API/blockchain
const getEvent = async (id: string) => {
  const events = [
    {
      id: "1",
      title: "Blockchain Summit 2024",
      date: "June 15, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "San Francisco Convention Center",
      address: "747 Howard St, San Francisco, CA 94103",
      price: "0.5 SUI",
      category: "Technology",
      description:
        "Join the biggest blockchain conference of the year featuring top speakers, workshops, and networking opportunities. Learn about the latest developments in Web3, DeFi, and blockchain technology.",
      image: "/placeholder.svg?height=600&width=1200&text=Blockchain+Summit+2024",
      gradient: "from-blue-500 to-purple-600",
      gallery: [
        "/placeholder.svg?height=400&width=600&text=Speaker+Stage",
        "/placeholder.svg?height=400&width=600&text=Networking+Area",
        "/placeholder.svg?height=400&width=600&text=Exhibition+Hall",
        "/placeholder.svg?height=400&width=600&text=Workshop+Room",
      ],
      speakers: [
        {
          name: "Vitalik Buterin",
          role: "Ethereum Founder",
          image: "/placeholder.svg?height=200&width=200&text=Vitalik",
        },
        { name: "Changpeng Zhao", role: "Binance CEO", image: "/placeholder.svg?height=200&width=200&text=CZ" },
        { name: "Brian Armstrong", role: "Coinbase CEO", image: "/placeholder.svg?height=200&width=200&text=Brian" },
      ],
      agenda: [
        { time: "9:00 AM", title: "Registration & Welcome Coffee" },
        { time: "10:00 AM", title: "Keynote: The Future of Blockchain" },
        { time: "11:30 AM", title: "Panel: DeFi Innovation" },
        { time: "1:00 PM", title: "Lunch & Networking" },
        { time: "2:30 PM", title: "Workshop: Smart Contract Development" },
        { time: "4:00 PM", title: "Fireside Chat: Web3 Adoption" },
        { time: "5:30 PM", title: "Closing Remarks & Networking" },
      ],
      totalTickets: 1000,
      soldTickets: 750,
      organizer: "Blockchain Events Inc.",
    },
    {
      id: "2",
      title: "Web3 Developer Conference",
      date: "July 22, 2024",
      time: "10:00 AM - 8:00 PM",
      location: "Jacob K. Javits Convention Center",
      address: "429 11th Ave, New York, NY 10001",
      price: "0.8 SUI",
      category: "Technology",
      description:
        "The premier conference for Web3 developers featuring hands-on workshops, technical talks, and the latest tools and frameworks for building decentralized applications.",
      image: "/placeholder.svg?height=600&width=1200&text=Web3+Developer+Conference",
      gradient: "from-green-500 to-blue-500",
      gallery: [
        "/placeholder.svg?height=400&width=600&text=Coding+Workshop",
        "/placeholder.svg?height=400&width=600&text=Tech+Talks",
        "/placeholder.svg?height=400&width=600&text=Developer+Lounge",
        "/placeholder.svg?height=400&width=600&text=Demo+Area",
      ],
      speakers: [
        { name: "Dan Abramov", role: "React Core Team", image: "/placeholder.svg?height=200&width=200&text=Dan" },
        { name: "Evan You", role: "Vue.js Creator", image: "/placeholder.svg?height=200&width=200&text=Evan" },
        { name: "Ryan Dahl", role: "Node.js Creator", image: "/placeholder.svg?height=200&width=200&text=Ryan" },
      ],
      agenda: [
        { time: "10:00 AM", title: "Registration & Setup" },
        { time: "11:00 AM", title: "Keynote: Building the Decentralized Web" },
        { time: "12:30 PM", title: "Workshop: Smart Contract Testing" },
        { time: "2:00 PM", title: "Lunch Break" },
        { time: "3:30 PM", title: "Panel: Frontend Frameworks for Web3" },
        { time: "5:00 PM", title: "Hands-on: Building a DApp" },
        { time: "7:00 PM", title: "Demo Showcase & Networking" },
      ],
      totalTickets: 800,
      soldTickets: 600,
      organizer: "Web3 Developers Guild",
    },
    // Add more events as needed
  ]

  return events.find((event) => event.id === id)
}

export default async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id)

  if (!event) {
    notFound()
  }

  return <EventDetailPage event={event} />
}
