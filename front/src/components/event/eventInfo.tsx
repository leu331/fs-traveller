import { Box, Heading, Text } from "@chakra-ui/react";

interface EventInfoProps {
  name: string;
  description: string;
}

export function EventInfo({ name, description }: EventInfoProps) {
  return (
    <>
      <Heading as="h1" size="2xl" mb={4} mt={16}>
        {name}
      </Heading>
      <Box mt={4}>
        <Text fontSize="md" mb={20}>
          {description}
        </Text>
      </Box>
    </>
  );
}
