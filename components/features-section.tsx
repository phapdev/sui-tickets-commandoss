"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Zap, Coins, Users, Lock, Globe } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Blockchain Security",
    description: "Every ticket is secured by the Sui blockchain, ensuring authenticity and preventing fraud.",
  },
  {
    icon: Zap,
    title: "Instant Transfers",
    description: "Buy, sell, and transfer tickets instantly with near-zero transaction fees.",
  },
  {
    icon: Coins,
    title: "True Ownership",
    description: "Own your tickets as NFTs with full control and trading capabilities.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Join a community of event-goers and collectors in the decentralized ecosystem.",
  },
  {
    icon: Lock,
    title: "Anti-Counterfeiting",
    description: "Cryptographic proof ensures every ticket is genuine and cannot be duplicated.",
  },
  {
    icon: Globe,
    title: "Global Access",
    description: "Access events worldwide with a single wallet, no geographical restrictions.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose SuiTickets?</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience the future of event ticketing with blockchain technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
