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
          schedules.map((eventSchedule, index) => {
            const opening = eventSchedule.openingTime?.trim() || "";
            const closing = eventSchedule.closingTime?.trim() || "";

            const isClosed = !opening && !closing;
            const formattedOpening = opening ? formatTime(opening) : "Fechado";
            const formattedClosing = closing ? formatTime(closing) : "";

            return (
              <OpeningHours 
                key={`${eventSchedule.day}-${index}`} 
                day={eventSchedule.day} 
                openingTime={isClosed ? "Fechado" : formattedOpening} 
                closingTime={isClosed ? "" : formattedClosing} 
              />
            );
          })
        ) : (
          <Text color="#123952">Os horários não estão disponíveis</Text>
        )}
      </Box>
    </Box>
  );
}

export default OpeningHoursSection;
