import { Box, Flex, Text } from "@chakra-ui/react";

interface OpeningHoursProps {
    day: string;
    status: string;
}

export function OpeningHours ({ day, status }: OpeningHoursProps) {
  return (
    <Box bgColor="white" p={4} borderRadius="8px" border="1px solid" borderColor="#DCE2E5">
      <Box display="flex" flexDirection="column">
        <Text >{day}</Text> 
        <Text fontWeight="700">{status}</Text>
      </Box>
    </Box>
  );
};


