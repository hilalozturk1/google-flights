import axios from "axios";
import { API_URL, API_HEADERS } from "@/config/apiConfig";
import { FlightSearchParams } from "@/types/flights";

export const searchFlights = async (
  origin: string,
  destination: string,
  date: string,
): Promise<FlightSearchParams[]> => {
  try {

    const response = await axios.get<{ flights: FlightSearchParams[] }>(
      `${API_URL}/v2/flights/searchFlights`,
      {
        headers: API_HEADERS,
        params: {
          originSkyId: origin?.skyId,
          destinationSkyId: destination?.skyId,
          originEntityId: origin?.entityId,
          destinationEntityId: destination?.entityId,
          date: date
        },
      }
    );
    return response.data?.data?.itineraries || [];
  } catch (error) {
    console.error("Error fetching flights", error);
    return [];
  }
};
