"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Wallet, Copy, LogOut, User } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function WalletButton() {
  const [isConnected, setIsConnected] = useState(false)
  const [address, setAddress] = useState("")
  const { toast } = useToast()

  const connectWallet = async () => {
    try {
      // Mock wallet connection - replace with actual Sui wallet integration
      const mockAddress = "0x1234...5678"
      setAddress(mockAddress)
      setIsConnected(true)
      toast({
        title: "Wallet Connected",
        description: "Successfully connected to Sui wallet",
      })
    } catch (error) {
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet",
        variant: "destructive",
      })
    }
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setAddress("")
    toast({
      title: "Wallet Disconnected",
      description: "Successfully disconnected from wallet",
    })
  }

  const copyAddress = () => {
    navigator.clipboard.writeText(address)
    toast({
      title: "Address Copied",
      description: "Wallet address copied to clipboard",
    })
  }

  if (!isConnected) {
    return (
      <Button onClick={connectWallet} className="gap-2">
        <Wallet className="w-4 h-4" />
        Connect Wallet
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <User className="w-4 h-4" />
          {address.slice(0, 6)}...{address.slice(-4)}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={copyAddress} className="gap-2">
          <Copy className="w-4 h-4" />
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={disconnectWallet} className="gap-2 text-destructive">
          <LogOut className="w-4 h-4" />
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
