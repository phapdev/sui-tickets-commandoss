"use client"

import type React from "react"

import { useWallet } from "@/components/wallet-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet } from "lucide-react"

export function WalletGuard({ children }: { children: React.ReactNode }) {
  const { isConnected, connect } = useWallet()

  if (!isConnected) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Wallet className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Connect Your Wallet</CardTitle>
              <CardDescription>Please connect your Sui wallet to view your tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={connect} className="w-full">
                Connect Wallet
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
