"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Box, Button, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const places = [
  { name: "Florianópolis", locations: 98, image: "/assets/floripa.png", offset: "0px" },
  { name: "Blumenau", locations: 29, image: "/assets/blumenau.png", offset: "32px" },
  { name: "Bombinhas", locations: 43, image: "/assets/bombinhas.png", offset: "0px" },
  { name: "Águas Mornas", locations: 13, image: "/assets/aguasMornas.png", offset: "32px" },

];

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    document.body.style.overflow = "hidden"; // Remove a rolagem
    return () => {
      document.body.style.overflow = "auto"; // Restaura ao sair da página
    };
  }, []);
  return (

    <Container maxW="80rem" px={6} py={16} >
  <Heading as="h2" size="xl" mb={8}>
    Selecione uma cidade
  </Heading>

  <Grid 
    templateColumns="repeat(4, 1fr)"
    gap={6} 
    justifyContent="center"
    justifyItems="center"
    alignItems="center"
    
  >
    {places.map((place) => (
      <Box 
        key={place.name} 
        bg="white" 
        borderRadius="16px" 
        boxShadow="lg" 
        overflow="hidden"
      >
        <Image 
          src={place.image} 
          alt={place.name} 
          width={400} 
          height={200} 
          style={{ width: "100%", height: "200px" }} 
        />
        <Box p={4}>
          <Heading as="h3" size="md" mb={1}>{place.name}</Heading>
          <Text fontSize="sm" color="gray.500">{place.locations} locais para explorar</Text>
          <Button colorScheme="orange" mt={3}>Ver mais</Button>
        </Box>
      </Box>
    ))}
  </Grid>
</Container>
)
}
