"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { useWallet } from "@/components/wallet-provider"
import { Coins, Shield, Zap, Minus, Plus } from "lucide-react"

interface Event {
  id: string
  title: string
  price: string
  currency: string
  totalTickets: number
  soldTickets: number
}

interface TicketPurchaseProps {
  event: Event
}

export function TicketPurchase({ event }: TicketPurchaseProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const { isConnected, connect } = useWallet()
  const { toast } = useToast()

  const totalPrice = (Number.parseFloat(event.price) * quantity).toFixed(2)
  const availableTickets = event.totalTickets - event.soldTickets

  const handlePurchase = async () => {
    if (!isConnected) {
      await connect()
      return
    }

    setIsLoading(true)

    // Simulate NFT minting process
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000))

      toast({
        title: "Tickets Purchased!",
        description: `Successfully minted ${quantity} NFT ticket(s)`,
      })
    } catch (error) {
      toast({
        title: "Purchase Failed",
        description: "Failed to mint NFT tickets",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const incrementQuantity = () => {
    if (quantity < Math.min(availableTickets, 10)) {
      setQuantity(quantity + 1)
    }
  }

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="sticky top-24">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            Purchase Tickets
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Price Display */}
          <div className="text-center">
            <div className="text-3xl font-bold">
              {event.price} {event.currency}
            </div>
            <p className="text-muted-foreground">per ticket</p>
          </div>

          {/* Quantity Selector */}
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <div className="flex items-center space-x-2 mt-2">
              <Button variant="outline" size="sm" onClick={decrementQuantity} disabled={quantity <= 1}>
                <Minus className="w-4 h-4" />
              </Button>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number.parseInt(e.target.value) || 1))}
                className="text-center"
                min="1"
                max={Math.min(availableTickets, 10)}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={incrementQuantity}
                disabled={quantity >= Math.min(availableTickets, 10)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-1">Max 10 tickets per purchase</p>
          </div>

          <Separator />

          {/* Total */}
          <div className="flex justify-between items-center text-lg font-semibold">
            <span>Total</span>
            <span>
              {totalPrice} {event.currency}
            </span>
          </div>

          {/* Purchase Button */}
          <Button onClick={handlePurchase} disabled={isLoading || availableTickets === 0} className="w-full" size="lg">
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : !isConnected ? (
              "Connect Wallet to Purchase"
            ) : availableTickets === 0 ? (
              "Sold Out"
            ) : (
              `Mint ${quantity} NFT Ticket${quantity > 1 ? "s" : ""}`
            )}
          </Button>

          {/* Features */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Shield className="w-4 h-4 text-green-500" />
              <span>Blockchain verified authenticity</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Instant NFT delivery</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Coins className="w-4 h-4 text-blue-500" />
              <span>Tradeable on secondary markets</span>
            </div>
          </div>

          {/* Availability Badge */}
          <div className="text-center">
            <Badge variant={availableTickets > 100 ? "default" : "destructive"}>
              {availableTickets} tickets remaining
            </Badge>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
