export interface TransferHistory {
  date: string;
  from: string;
  to: string;
  txHash: string;
}

export interface Ticket {
  id: string;
  eventId: string;
  eventTitle: string;
  date: string;
  time: string;
  location: string;
  address: string;
  price: string;
  category: string;
  status: string;
  purchaseDate: string;
  tokenId: string;
  seatNumber: string;
  ticketType: string;
  image: string;
  gradient: string;
  qrCode: string;
  eventDescription: string;
  transferHistory: TransferHistory[];
}