import TicketPageClient from "@/components/ticket-page-client"

export default function TicketPage({ params }: { params: { id: string } }) {
  return <TicketPageClient id={params.id} />
}
