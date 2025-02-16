import React, { useState } from 'react';
import { searchFlights } from '../services/flightsApi';
import { Flight } from '../types/flights';
import SearchBar from '../components/SearchBar';
import FlightCard from '../components/FlightCard';
import { Result } from '../types/flightsResult';

const FlightsSearch: React.FC = () => {
  const [flights, setFlights] = useState<Flight[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async (
    origin: { skyId: string; entityId: string },
    destination: { skyId: string; entityId: string },
    date: string,
  ): Promise<void> => {
    setLoading(true);
    const results: Result[] = await searchFlights(origin, destination, date);
    const editedSearch: Flight[] = results.map((i: Result) => ({
      price: i.price?.formatted || 'N/A',
      origin: i.legs?.[0]?.origin?.name || 'N/A',
      destination: i.legs?.[0]?.destination?.name || 'N/A',
      airline: i.legs?.[0]?.carriers?.[0]?.marketing?.[0]?.name || 'N/A',
    }));
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
