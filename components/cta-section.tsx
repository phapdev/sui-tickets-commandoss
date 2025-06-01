"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-r from-primary/10 via-purple-500/10 to-primary/10">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-6 py-3 rounded-full text-sm font-medium mb-8"
          >
            <Sparkles className="w-4 h-4" />
            <span>Ready to Get Started?</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6">Start Your Web3 Ticketing Journey Today</h2>

          <p className="text-xl text-muted-foreground mb-8">
            Join thousands of event organizers and attendees who trust SuiTickets for secure, transparent, and
            fraud-proof ticketing.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="text-lg px-8">
              <Link href="/events">
                Explore Events
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-lg px-8">
              <Link href="/my-tickets">View My Tickets</Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
