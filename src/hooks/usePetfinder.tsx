// Set your Petfinder Api Key and Secret here
// You can get your API Key and Secret by signing up at https://www.petfinder.com/developers/

import { PetToken } from "@/types";
import { useCallback, useState } from "react";

// const API_KEY = "";
// const API_SECRET = "";

const API_URL = "https://api.petfinder.com/v2";

export function usePetfinder() {
  const [token, setToken] = useState<PetToken | null>(null);

  const authenticate = useCallback(async (): Promise<PetToken> => {}, []);
}
