import { EventDetailPage } from "@/components/event-detail-page"

export default async function EventPage({ params }: { params: { id: string } }) {
  return <EventDetailPage id={params.id} />
}
