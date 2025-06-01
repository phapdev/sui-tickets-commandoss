import { create } from "zustand";
import { Ticket } from "@/types";
import { events } from "@/mock/tickets-data";

interface TicketStore {
  tickets: Ticket[] | null;
  setTickets: (tickets: Ticket[]) => void;
  getTickets: () => Ticket[] | null;
  addTicket: (ticket: Ticket) => void;
  updateTicket: (ticket: Ticket) => void;
  deleteTicket: (id: string) => void;
  getTicketById: (id: string) => Ticket | null;
}

export const useTicketStore = create<TicketStore>((set, get) => ({
  tickets: events as unknown as Ticket[] | null,
  setTickets: (tickets: Ticket[]) => set({ tickets }),
  getTickets: () => get().tickets,
  addTicket: (ticket: Ticket) => set((state) => ({ tickets: [...(state.tickets || []), ticket] })),
  updateTicket: (ticket: Ticket) => set((state) => ({ tickets: state.tickets?.map((t) => t.id === ticket.id ? ticket : t) })),
  deleteTicket: (id: string) => set((state) => ({ tickets: state.tickets?.filter((t) => t.id !== id) })),
  getTicketById: (id: string) => get().tickets?.find((t) => t.id === id) || null,
}));