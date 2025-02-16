import axios from 'axios';
import { API_URL, API_HEADERS } from '../config/apiConfig';
import { Result } from '../types/flightsResult';

export const searchFlights = async (
  origin: { skyId: string; entityId: string },
  destination: { skyId: string; entityId: string },
  date: string,
): Promise<Result[]> => {
  try {
    const response = await axios.get<{
      data: { itineraries: Result[] };
      flights: Result[];
    }>(`${API_URL}/v2/flights/searchFlights`, {
      headers: API_HEADERS,
      params: {
        originSkyId: origin.skyId,
        destinationSkyId: destination.skyId,
        originEntityId: origin.entityId,
        destinationEntityId: destination.entityId,
        date: date,
      },
    });
    return response.data?.data?.itineraries || [];
  } catch (error) {
    console.error('Error fetching flights', error);
    return [];
  }
};
