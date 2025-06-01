import { Metadata } from "next";
import { getTicketById } from "@/stores/tusky/api";

export async function generateMetadata({ searchParams }: { searchParams: { id: string } }): Promise<Metadata> {
  const id = searchParams.id;
  const event = await getTicketById(id);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The requested event could not be found.",
    };
  }

  return {
    title: event.title,
    description: event.description,
    openGraph: {
      title: event.title,
      description: event.description,
      images: [event.image],
      type: "website",
      url: `https://sui-tickets-commandoss.vercel.app/view?id=${id}`,
    },
    twitter: {
      card: "summary_large_image",
      title: event.title,
      description: event.description,
      images: [event.image],
      creator: "@suitickets",
      site: "@suitickets",
      player: {
        url: `https://sui-tickets-commandoss.vercel.app/view?id=${id}`,
        width: 580,
        height: 680,
      },
    },
  };
} 