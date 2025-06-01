"use client"
import { TicketDetailPage } from "@/components/ticket-detail-page"
import { useTicketStore } from "@/stores/storage/useTicketStorage"
import { Ticket } from "@/types"
import { notFound } from "next/navigation"

export default function TicketPageClient({ id }: { id: string }) {
  const { getTicketById } = useTicketStore()
  const ticket = getTicketById(id)

  if (!ticket) {
    notFound()
  }

  return <TicketDetailPage ticket={ticket as Ticket} />
}