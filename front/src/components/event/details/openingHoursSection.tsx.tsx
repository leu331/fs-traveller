import { Box, Heading, Text } from "@chakra-ui/react";
import { OpeningHours } from "./openingHours";
import { formatTime } from "@/utils/formatTime";

interface OpeningHoursSectionProps {
  schedules?: { day: string; openingTime: string; closingTime: string }[];
}

export function OpeningHoursSection({ schedules = [] }: OpeningHoursSectionProps) { 

  return (
    <Box marginBottom={4}>
      <Heading mt={5} color="#123952" fontWeight="700" as="h3">
        Atendimento
      </Heading>

      <Box borderBottom="1px solid #DCE2E5" mt={4} />

      <Box mt={8} display="flex" gap={2} flexWrap="wrap">
        {schedules.length > 0 ? (
          schedules.map((eventSchedule, index) => (
            <OpeningHours 
              key={`${eventSchedule.day}-${index}`} // Chave única combinando o dia e o índice
              day={eventSchedule.day} 
              openingTime={formatTime(eventSchedule.openingTime)} 
              closingTime={formatTime(eventSchedule.closingTime)} 
            />
          ))
        ) : (
          <Text color="#123952">Os horários não estão disponíveis</Text>
        )}
      </Box>
    </Box>
  );
}

export default OpeningHoursSection;
