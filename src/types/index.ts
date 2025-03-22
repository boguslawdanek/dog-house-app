export interface Pet {
  id: string;
  name: string;
  type: string;
  size: "Small" | "Medium" | "Large" | "Extra Large";
  gender: "Male" | "Female" | "Unknown";
  age: "Baby" | "Young" | "Adult" | "Senior";
}

export interface PetToken {
  token_type: string;
  expires_in: number;
  access_token: string;
  expiresAt: number;
}
export interface PetfinderResponse {
  animals: Pet[];
  pagination: {
    count_per_page: number;
    total_count: number;
    current_page: number;
    total_pages: number;
  };
}
