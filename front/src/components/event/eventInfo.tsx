import { capitalizeFirstLetterOfEachWord } from "@/utils/captalizeFirstLetterOfEachWorld";
import { Box, Heading, Text } from "@chakra-ui/react";

interface EventInfoProps {
  name: string;
  description: string;
}

export function EventInfo({ name, description }: EventInfoProps) {
  return (
    <>
      <Heading as="h1" size="2xl" mb={4} mt={16} color="#123952">
        {capitalizeFirstLetterOfEachWord(name)}
      </Heading>
      <Box mt={4}>
        <Text fontSize="md" fontStyle="20px" mb={20} color="#617480">
          {description}
        </Text>
      </Box>
    </>
  );
}
