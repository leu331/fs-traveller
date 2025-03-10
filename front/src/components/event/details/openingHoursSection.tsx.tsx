import { Box, Heading, Text } from "@chakra-ui/react";
import {OpeningHours} from "./openingHours"; 

interface OpeningHoursSectionProps {
  hours: { day: string; status: string }[]; 
}

export function OpeningHoursSection ({ hours }: OpeningHoursSectionProps) {
  return (
    <Box marginBottom={4}>
      <Heading mt={5} color="#123952" fontWeight="700" as="h3">
        Atendimento
      </Heading>

      <Box borderBottom="1px solid #DCE2E5" mt={4} />

      <Box mt={8} display="flex" gap={2} flexWrap="wrap">
        {hours.length > 0 ? (
          hours.map((eventHour) => (
            <OpeningHours key={eventHour.day} day={eventHour.day} status={eventHour.status} />
          ))
        ) : (
          <Text>Os horários não estão disponíveis</Text>
        )}
      </Box>
    </Box>
  );
};

export default OpeningHoursSection;
