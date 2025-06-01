import { create } from "zustand";
import { Ticket } from "@/types";

interface EventFormData {
  id: string;
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

interface CreateTicketStore {
  formData: EventFormData;
  setFormData: (data: Partial<EventFormData>) => void;
  resetFormData: () => void;
  getFormData: () => EventFormData;
}

const initialFormData: EventFormData = {
  id: "",
  title: "",
  description: "",
  category: "",
  date: "",
  time: "",
  endTime: "",
  location: "",
  address: "",
  price: "",
  totalTickets: "",
  image: "",
  gradient: "from-blue-500 to-purple-600",
  speakers: [],
  agenda: [],
};

export const useCreateTicketStore = create<CreateTicketStore>((set, get) => ({
  formData: initialFormData,
  setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
  resetFormData: () => set({ formData: initialFormData }),
  getFormData: () => get().formData,
}));