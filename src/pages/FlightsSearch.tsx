import React, { useState } from "react";
import { searchFlights } from "@/services/flightsApi";
import { Flight } from "@/types/flights";
import SearchBar from "@/components/SearchBar";
import FlightCard from "@/components/FlightCard";

import { EditedSearch, Result } from "../types/flightsResult";

const FlightsSearch: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (
    origin: string,
    destination: string,
    date: string
  ) => {
    setLoading(true);
    const results = await searchFlights(origin, destination, date);

    const editedSearch: EditedSearch[] = results.map((i: Result) => ({
      price: i?.price?.formatted,
      origin: i?.legs?.[0]?.origin?.name,
      destination: i?.legs?.[0]?.destination?.name,
      airline: i?.legs?.[0]?.carriers?.marketing?.[0]?.name,
    }));

    console.log("results :>> ", editedSearch);
    setFlights(editedSearch);
    setLoading(false);
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <SearchBar onSearch={handleSearch} loading={loading} />
      <div className="mt-4">
        {flights.length > 0 ? (
          flights.map((flight, index) => (
            <FlightCard key={index} flight={flight} />
          ))
        ) : (
          <p className="text-center text-gray-500">No flights found</p>
        )}
      </div>
    </div>
  );
};

export default FlightsSearch;
