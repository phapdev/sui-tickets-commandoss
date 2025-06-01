import { useQuery } from "@tanstack/react-query"
import { TuskyApi } from "../api"

export const useTusky = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["tusky-files"],
    queryFn: TuskyApi.getFiles,
  })

  return { data, isLoading, error }
}