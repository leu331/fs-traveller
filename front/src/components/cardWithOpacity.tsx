import { Box, Image, Text } from "@chakra-ui/react";

interface CardWithOpacityProps {
  city: { name: string; description: string; image: string; locations: number, isFilteredOut: boolean };
  isFilteredOut: boolean;
}

const CardWithOpacity: React.FC<CardWithOpacityProps> = ({ city, isFilteredOut }) => {
  return (
    <Box
      borderWidth={1}
      borderRadius="md"
      overflow="hidden"
      transition="all 0.3s ease"
      opacity={isFilteredOut ? 0.5 : 1} // Aplica opacidade reduzida se a cidade for filtrada
    >
      <Image src={city.image} alt={city.name} />
      <Box p={4}>
        <Text fontSize="xl" fontWeight="bold">{city.name}</Text>
        <Text mt={2} fontSize="sm" color="gray.500">{city.description}</Text>
      </Box>
    </Box>
  );
};

export default CardWithOpacity;
