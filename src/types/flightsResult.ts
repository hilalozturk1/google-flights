interface Carrier {
  marketing: { name: string }[];
}

interface Leg {
  origin: { name: string };
  destination: { name: string };
  carriers: Carrier[];
}

interface Price {
  formatted: string;
}

export interface Result {
  legs: Leg[];
  price: Price;
}

export interface EditedSearch {
  origin: string | undefined;
  destination: string | undefined;
  price: string | undefined;
  airline: string | undefined;
}