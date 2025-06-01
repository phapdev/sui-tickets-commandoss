import { EventsGrid } from "@/components/events-grid"
import { EventsFilter } from "@/components/events-filter"
import { Suspense } from "react"

export default function EventsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Upcoming Events</h1>
        <p className="text-muted-foreground text-lg">
          Discover amazing events and secure your tickets on the blockchain
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <EventsFilter />
        </div>
        <div className="lg:col-span-3">
          <Suspense fallback={<div>Loading events...</div>}>
            <EventsGrid />
          </Suspense>
        </div>
      </div>
    </div>
  )
}
