import { Box, Flex, Text } from "@chakra-ui/react";

interface OpeningHoursProps {
    day: string;
    openingTime: string;
    closingTime: string
}

export function OpeningHours ({ day, openingTime, closingTime}: OpeningHoursProps) {
  return (
    <Box bgColor="white" p={4} borderRadius="8px" border="1px solid" borderColor="#DCE2E5">
      <Box display="flex" flexDirection="column">
        <Text color="#123952">{day}</Text> 
        <Box display="flex" gap="2px">
        <Text fontWeight="bold" color="#123952">{openingTime} </Text>
        <Text fontWeight="bold" color="#123952"> - </Text>
        <Text fontWeight="bold" color="#123952">{closingTime}</Text>
        </Box>
      </Box>
    </Box>
  );
};


