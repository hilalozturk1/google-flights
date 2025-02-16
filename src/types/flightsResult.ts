export interface Result {
  price?: {
    formatted?: string;
  };
  legs?: {
    origin?: { name?: string };
    destination?: { name?: string };
    carriers?: {
      marketing?: { name?: string }[];
    }[];
  }[];
}

export interface EditedSearch {
  price?: string;
  origin?: string;
  destination?: string;
  airline?: string;
}
