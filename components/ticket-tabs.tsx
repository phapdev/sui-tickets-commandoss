"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BuyTickets } from "@/components/buy-tickets"
import { MyTickets } from "@/components/my-tickets"
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { CreateEvent } from "@/components/create-event"

export function TicketTabs() {
  const [activeTab, setActiveTab] = useState("buy")

  return (
    <Tabs defaultValue="buy" className="w-full" onValueChange={setActiveTab}>
      <div className="flex justify-center mb-8">
        <TabsList className="grid w-full max-w-2xl grid-cols-3">
          <TabsTrigger value="buy">Buy Tickets</TabsTrigger>
          <TabsTrigger value="my-tickets">My Tickets</TabsTrigger>
          <TabsTrigger value="create">Create Event</TabsTrigger>
        </TabsList>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <TabsContent value="buy" className="mt-0">
            <BuyTickets />
          </TabsContent>
          <TabsContent value="my-tickets" className="mt-0">
            <MyTickets />
          </TabsContent>
          <TabsContent value="create" className="mt-0">
            <CreateEvent />
          </TabsContent>
        </motion.div>
      </AnimatePresence>
    </Tabs>
  )
}
