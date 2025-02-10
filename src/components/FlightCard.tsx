import React from "react";
import Card from "@/components/ui/Card";
import { Flight } from "@/types/flights";

interface FlightCardProps {
  flight: Flight;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
  return (
    <Card>
      <p>
        <strong>From:</strong> {flight.origin} - <strong>To:</strong>{" "}
        {flight.destination}
      </p>
      <p>
        <strong>Price:</strong> ${flight.price}
      </p>
      <p>
        <strong>Airline:</strong> {flight.airline}
      </p>
    </Card>
  );
};

export default FlightCard;
