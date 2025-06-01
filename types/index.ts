export interface TransferHistory {
  date: string;
  from: string;
  to: string;
  txHash: string;
}

export type EventFormData = {
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  endTime: string;
  location: string;
  address: string;
  price: string;
  totalTickets: string;
  image: string;
  gradient: string;
  speakers: Array<{ name: string; role: string; image: string }>;
  agenda: Array<{ time: string; title: string }>;
}

export type Ticket = EventFormData & {
  id: string;
  transferHistory: TransferHistory[];
};