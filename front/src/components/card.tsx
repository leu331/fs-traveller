import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

interface CardProps {
  id: string; // Usando o id para passar no link
  name: string;
  description: string;
  image: string;
  locations: number;
  offset?: string;
}

const Card: React.FC<CardProps> = ({ id, name, description, image, locations, offset = "0px" }) => {
  return (
    <Link href={`/local/${name.toLowerCase()}`} passHref> {/* Corrigido para corresponder à estrutura de pasta "local" */}
      <Box
        as="a"
        bg="white"
        borderRadius="16px"
        boxShadow="lg"
        overflow="hidden"
        position="relative"
        top={offset}
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
            {locations} locais para explorar
          </Text>
        </Box>
      </Box>
    </Link>
  );
};

export default Card;
