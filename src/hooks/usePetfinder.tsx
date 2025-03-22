// Set your Petfinder Api Key and Secret here
// You can get your API Key and Secret by signing up at https://www.petfinder.com/developers/

import { PetfinderResponse, PetToken } from "@/types";
import { useCallback, useState } from "react";
import { useQuery } from "@tanstack/react-query";

const API_KEY = "";
const API_SECRET = "";

const API_URL = "https://api.petfinder.com/v2";

export function usePetfinder() {
  const [token, setToken] = useState<PetToken | null>(null);

  const authenticate = useCallback(async (): Promise<PetToken> => {
    try {
      const response = await fetch(`${API_URL}/oauth2/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `grant_type=client_credentials&client_id=${API_KEY}&client_secret=${API_SECRET}`,
      });

      if (!response.ok) {
        throw new Error("Failed to authenticate with Petfinder API");
      }

      const data = await response.json();
      console.log("data", data);
      const expiresAt = Date.now() + data.expires_in * 1000;
      return { ...data, expiresAt };
    } catch (error) {
      console.error("Authentication error:", error);
      throw error;
    }
  }, []);

  const getValidToken = useCallback(async (): Promise<string> => {
    if (!token || Date.now() >= token.expiresAt) {
      const newToken = await authenticate();
      setToken(newToken);
      return newToken.access_token;
    }
    return token.access_token;
  }, [token, authenticate]);

  const fetchPets = useCallback(
    async (
      size?: string[],
      breed?: string[],
      traits?: string[],
      page = 1
    ): Promise<PetfinderResponse> => {
      try {
        const accessToken = await getValidToken();

        const params = new URLSearchParams({
          type: "dog",
          page: page.toString(),
          limit: "20",
          status: "adoptable",
        });

        const response = await fetch(
          `${API_URL}/animals?${params.toString()}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch pets");
        }

        return await response.json();
      } catch (error) {
        console.error("Error fetching pets:", error);

        return {
          animals: [],
          pagination: {
            count_per_page: 20,
            total_count: 0,
            current_page: 1,
            total_pages: 0,
          },
        };
      }
    },
    [getValidToken]
  );

  return {
    fetchPets,
  };
}

export function usePets(
  size: string[] = [],
  breed: string[] = [],
  traits: string[] = [],
  page = 1
) {
  const { fetchPets } = usePetfinder();

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["pets", size, breed, traits, page],
    queryFn: () => fetchPets(size, breed, traits, page),
  });

  return {
    pets: data?.animals || [],
    pagination: data?.pagination,
    isLoading,
    error,
    refetch,
  };
}
