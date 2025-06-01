import { MyTicketsGrid } from "@/components/my-tickets-grid";

export default function MyTicketsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">My Tickets</h1>
        <p className="text-muted-foreground text-lg">
          View and manage your NFT tickets
        </p>
      </div>

      <MyTicketsGrid />
    </div>
  );
}
