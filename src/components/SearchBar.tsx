import React, { useState, useEffect, useCallback } from "react";
import { FaPlaneDeparture, FaPlaneArrival } from "react-icons/fa";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { API_HEADERS, API_URL } from "../config/apiConfig";
import axios from "axios";
import _ from "lodash";

interface Location {
  code: string;
  name: string;
}

interface SearchBarProps {
  onSearch: (origin: string, destination: string, date: string) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [origin, setOrigin] = useState<{
    skyId: string;
    entityId: string;
  } | null>(null);

  const [destination, setDestination] = useState<{
    skyId: string;
    entityId: string;
  } | null>(null);

  const [activeInput, setActiveInput] = useState<
    "origin" | "destination" | null
  >(null);

  const [date, setDate] = useState<string>("");
  const [locations, setLocations] = useState<Location[]>([]);
  const [query, setQuery] = useState<string>("");

  // Fetch locations dynamically
  const fetchLocations = useCallback(async (query: string) => {
    if (!query) {
      setLocations([]);
      return;
    }

    try {
      const response = await axios.get<{ flights: Location[] }>(
        `${API_URL}/v1/flights/searchAirport`,
        {
          headers: API_HEADERS,
          params: { query },
        }
      );
      console.log("response :>> ", response);
      setLocations(response.data?.data || []);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  }, []);

  // Debounce the API calls to reduce requests
  const debouncedFetchLocations = useCallback(_.debounce(fetchLocations, 500), [
    fetchLocations,
  ]);

  const handleSelectLocation = (loc: Location) => {
    if (activeInput === "origin") {
      setOrigin({ skyId: loc?.skyId, entityId: loc?.entityId });
    } else if (activeInput === "destination") {
      setDestination({ skyId: loc?.skyId, entityId: loc?.entityId });
    }

    setQuery(""); // Clear query
    setLocations([]); // Hide suggestions
    setActiveInput(null); // Reset active input
  };

  // Trigger API request when query changes
  useEffect(() => {
    debouncedFetchLocations(query);
  }, [query, debouncedFetchLocations]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          icon={<FaPlaneDeparture />}
          placeholder="Origin (e.g., JFK)"
          value={origin?.skyId}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();
            setOrigin(value);
            setQuery(value);
            setActiveInput("origin");
          }}
        />
        <Input
          icon={<FaPlaneArrival />}
          placeholder="Destination (e.g., LAX)"
          value={destination?.skyId}
          onChange={(e) => {
            const value = e.target.value.toUpperCase();
            setDestination(value);
            setQuery(value);
            setActiveInput("destination");
          }}
        />
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      {/* Auto-Complete Suggestions */}
      {locations.length > 0 && (
        <div className="mt-2 p-2 border border-gray-300 rounded-md bg-white shadow-md">
          {locations.map((loc) => (
            <p
              key={loc.skyId}
              onClick={() => handleSelectLocation(loc)}
              className="p-1 hover:bg-gray-100 cursor-pointer"
            >
              {loc.navigation.localizedName}
            </p>
          ))}
        </div>
      )}

      <Button
        onClick={() => onSearch(origin, destination, date)}
        disabled={loading}
      >
        {loading ? "Searching..." : "Search Flights"}
      </Button>
    </div>
  );
};

export default SearchBar;
