import api from "@/api/api";
import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { City } from "@/types/city";

interface CardProps {
  id: string;
  name: string;
  description?: string;
  image: string;
  foodAndDrinksCount?: number;
  touristSpotsCount?: number
  organizedEventsCount?: number
  totalLocals: number
}

export function Card({ id, name, description, image, foodAndDrinksCount, organizedEventsCount, touristSpotsCount, totalLocals }: CardProps) {

  return (
    <Link href={`/local/${id}`} passHref>
      <Box
        as="a"
        bg="white"
        borderRadius="16px"
        boxShadow="lg"
        overflow="hidden"
        position="relative"
        height="266px"
        width="256px"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        marginInline="auto"
        cursor="pointer"
        transition="transform 0.2s ease-in-out"
        _hover={{ transform: "scale(1.05)" }}
      >
        <Image
          src={image}
          alt={name}
          width={200}
          height={200}
          style={{
            width: "100%",
            height: "175px",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        />
        <Box p={4}>
          <Heading as="h3" size="md" mb={2} color="blue.900">
            {name}
          </Heading>
          <Text fontSize="sm" color="gray.600">
            {totalLocals} locais 
          </Text>
        </Box>
      </Box>
    </Link>
  );
}

export default Card;
