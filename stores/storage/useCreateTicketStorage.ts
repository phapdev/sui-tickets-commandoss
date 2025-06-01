import { create } from "zustand";
import { Ticket } from "@/types";

interface CreateTicketStore {
  createTicket: Ticket | null;
  getCreateTicket: () => Ticket | null;
  setCreateTicket: (ticket: Ticket) => void;
  deleteCreateTicket: () => void;
}

export const useCreateTicketStore = create<CreateTicketStore>((set, get) => ({
  createTicket: null,
  getCreateTicket: () => get().createTicket,
  setCreateTicket: (ticket: Ticket) => set({ createTicket: ticket }),
  deleteCreateTicket: () => set({ createTicket: null }),
}));