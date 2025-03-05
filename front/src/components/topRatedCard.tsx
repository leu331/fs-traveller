import { Box, Heading, Text, Icon, Flex } from "@chakra-ui/react";
import Image from 'next/image';
import { FaStar } from "react-icons/fa";
import { getIconForCategory } from "../app/utils/getIconForCategory";

export interface Place {
    name: string;
    category: string;
    rating: number;
    image: string;
  }

  interface PlaceProps {
    place: Place
  }

const TopRatedCard = ({ place }: PlaceProps) => (
  <Box bg="white" border="1px solid" borderColor="#DCE2E5" borderRadius="1rem" overflow="hidden" position="relative">
    <Image src={place.image} alt={place.name} width={500} height={150} objectFit="cover" />

    <Box
      position="absolute"
      top="10px"
      left="10px"
      bg="#F25D27"
      borderRadius="8px"
      p="14px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Icon as={FaStar} color="white" boxSize="16px" />
      <Text color="white" fontSize="sm" fontWeight="bold" mt="4px">{(place.rating).toFixed(1).replace(".", ",")}</Text>
    </Box>

    <Box>
      <Flex align="center" mb={2}></Flex>
      <Heading mt="24px" mb="24px" marginInline="1.5rem 6px" as="h3" fontSize="1.25rem" color="blue.900">{place.name}</Heading>
      <Box borderBottom="1px solid" borderColor="#DCE2E5"></Box>
      <Text color="#617480" fontWeight="" paddingInline="1.30rem" paddingBlock="1.25rem" display="flex" alignItems="center">
        {place.category}
        <Icon boxSize="24px" ml="auto" as={getIconForCategory(place.category)} color="orange.400" mr={2} />
      </Text>
    </Box>
  </Box>
);

export default TopRatedCard;
