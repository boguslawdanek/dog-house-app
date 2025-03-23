export interface Pet {
  id: string;
  name: string;
  type: string;
  breeds: {
    primary: string;
    secondary?: string;
    mixed: boolean;
    unknown: boolean;
  };
  size: "Small" | "Medium" | "Large" | "Extra Large";
  gender: "Male" | "Female" | "Unknown";
  age: "Baby" | "Young" | "Adult" | "Senior";
  colors: {
    primary?: string;
    secondary?: string;
    tertiary?: string;
  };
  photos: {
    small: string;
    medium: string;
    large: string;
    full: string;
  }[];
  status: "adoptable" | "adopted" | "found";
  attributes: {
    spayed_neutered: boolean;
    house_trained: boolean;
    declawed?: boolean;
    special_needs: boolean;
    shots_current: boolean;
  };
  environment: {
    children?: boolean;
    dogs?: boolean;
    cats?: boolean;
  };
  tags: string[];
  description: string;
  organization_id: string;
  contact: {
    email?: string;
    phone?: string;
    address: {
      address1?: string;
      address2?: string;
      city: string;
      state: string;
      postcode: string;
      country: string;
    };
  };
  published_at: string;
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
