"use client"

import { motion } from "framer-motion"
import { Ticket, Shield, Zap } from "lucide-react"

export function TicketAnimation() {
  return (
    <div className="relative w-80 h-80">
      {/* Main ticket */}
      <motion.div
        className="absolute inset-0 ticket-gradient rounded-2xl p-6 text-white shadow-2xl"
        animate={{
          rotateY: [0, 10, 0],
          rotateX: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <div className="h-full flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <Ticket className="w-8 h-8" />
              <span className="text-sm opacity-80">NFT TICKET</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Blockchain Conference</h3>
            <p className="text-sm opacity-80">March 15, 2024</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Seat</span>
              <span>A-42</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Price</span>
              <span>0.5 SUI</span>
            </div>
          </div>
        </div>

        {/* Perforated edge */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-background rounded-full border-4 border-white" />
      </motion.div>

      {/* Floating icons */}
      <motion.div
        className="absolute -top-4 -right-4 bg-green-500 p-3 rounded-full text-white shadow-lg"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Shield className="w-6 h-6" />
      </motion.div>

      <motion.div
        className="absolute -bottom-4 -left-4 bg-yellow-500 p-3 rounded-full text-white shadow-lg"
        animate={{
          y: [0, 10, 0],
          rotate: [0, -360],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        <Zap className="w-6 h-6" />
      </motion.div>

      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 ticket-gradient rounded-2xl opacity-20 blur-xl"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
    </div>
  )
}
