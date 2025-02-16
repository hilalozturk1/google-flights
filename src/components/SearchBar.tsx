import React, { useState, useEffect, useCallback } from 'react';
import { FaPlaneDeparture, FaPlaneArrival } from 'react-icons/fa';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import { API_HEADERS, API_URL } from '../config/apiConfig';
import axios from 'axios';
import _ from 'lodash';

interface Location {
  skyId: string;
  entityId: string;
  navigation: {
    localizedName: string;
  };
}

export interface SearchBarProps {
  onSearch: (
    origin: { skyId: string; entityId: string },
    destination: { skyId: string; entityId: string },
    date: string,
  ) => void;
  loading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, loading }) => {
  const [origin, setOrigin] = useState<
    { skyId: string; entityId: string } | string | null
  >(null);
  const [destination, setDestination] = useState<
    { skyId: string; entityId: string } | string | null
  >(null);
  const [date, setDate] = useState('');
  const [locations, setLocations] = useState<Location[]>([]);
  const [activeInput, setActiveInput] = useState<
    'origin' | 'destination' | null
  >(null);
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [query, setQuery] = useState('');

  const fetchLocations = useCallback(async (query: string) => {
    if (!query) {
      setLocations([]);
      return;
    }
    try {
      const response = await axios.get<{
        data: Location[];
      }>(`${API_URL}/v1/flights/searchAirport`, {
        headers: API_HEADERS,
        params: { query },
      });
      setLocations(response.data.data || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
    }
  }, []);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFetchLocations = useCallback(_.debounce(fetchLocations, 500), [
    fetchLocations,
  ]);

  useEffect(() => {
    debouncedFetchLocations(query);
  }, [query, debouncedFetchLocations]);

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Input
          icon={<FaPlaneDeparture />}
          placeholder="Origin (e.g., JFK)"
          value={originInput}
          onChange={e => {
            const value = e.target.value.toUpperCase();
            setOriginInput(value);
            setQuery(value);
            setActiveInput('origin');
            debouncedFetchLocations(value);
          }}
        />
        <Input
          icon={<FaPlaneArrival />}
          placeholder="Destination (e.g., LAX)"
          value={destinationInput}
          onChange={e => {
            const value = e.target.value.toUpperCase();
            setDestinationInput(value);
            setQuery(value);
            setActiveInput('destination');
            debouncedFetchLocations(value);
          }}
        />
        <Input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </div>
      {locations.length > 0 && (
        <div className="mt-2 p-2 border border-gray-300 rounded-md bg-white shadow-md">
          {locations.map(loc => (
            <p
              key={loc.skyId}
              onClick={() => {
                if (activeInput === 'origin') {
                  setOriginInput(loc.skyId);
                  setOrigin({ skyId: loc.skyId, entityId: loc.entityId });
                } else if (activeInput === 'destination') {
                  setDestinationInput(loc.skyId);
                  setDestination({ skyId: loc.skyId, entityId: loc.entityId });
                }
                setLocations([]);
              }}
              className="p-1 hover:bg-gray-100 cursor-pointer"
            >
              {loc.navigation.localizedName}
            </p>
          ))}
        </div>
      )}
      <Button
        onClick={() => {
          if (
            origin &&
            typeof origin !== 'string' &&
            destination &&
            typeof destination !== 'string'
          ) {
            onSearch(origin, destination, date);
          } else {
            console.error('Please select both origin and destination.');
          }
        }}
        disabled={loading}
      >
        {loading ? 'Searching...' : 'Search Flights'}
      </Button>
    </div>
  );
};

export default SearchBar;
