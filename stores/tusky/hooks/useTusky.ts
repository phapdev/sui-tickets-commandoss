import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { TuskyApi } from "../api";
import { useTicketStore } from "@/stores/storage/useTicketStorage";
import { Ticket } from "@/types";
import { FileResponse } from "../types";

export const useTusky = () => {
  const { setTickets } = useTicketStore();

  const { data: files, isLoading, error } = useQuery({
    queryKey: ["tusky-files"],
    queryFn: TuskyApi.getFiles,
  });

  const getContentFile = async (fileId: string) => {
    const response = await TuskyApi.getContentFile(fileId);
    return response;
  };

  const { data: events } = useQuery({
    queryKey: ["tusky-events", files],
    queryFn: () => {
      return Promise.all(files?.map((file: FileResponse) => getContentFile(file.id)));
    },
    enabled: !!files,
  });

  useEffect(() => {
    if (events) {
      setTickets(events as unknown as Ticket[]);
    }
  }, [events]);

  return { files, events, getContentFile };
};
