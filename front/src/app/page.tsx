"use client"
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Box, Button, Container, Flex, Grid, Heading, Text } from "@chakra-ui/react";
import {Header} from "@/components/layout/header";
import {Card} from "@/components/cards/card";

const places = [
  { name: "Florianópolis", locations: 98, image: "/assets/floripa.png", offset: "0px" },
  { name: "Blumenau", locations: 29, image: "/assets/blumenau.png", offset: "70px" },
  { name: "Bombinhas", locations: 43, image: "/assets/bombinhas.png", offset: "0px" },
  { name: "Águas Mornas", locations: 13, image: "/assets/aguasMornas.png", offset: "70px" },

];

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    document.body.style.overflow = "hidden"; 
    return () => {
      document.body.style.overflow = "auto"; 
    };
  }, []);
  return (

    <Container maxW="80rem" px={6} py={16}>
      <Header showButton={true}/>
      <Box display="flex" alignItems="center" gap="150px">
      <Box maxWidth="380px" display="flex" flexDirection="column" justifyContent="center" height="80vh">
        <Heading fontSize="80px" fontWeight="650" color="#123952" mb="40px" as="h1">Viva uma Grande aventura</Heading>
        <Text color="#617480" maxWidth="320px" fontSize="20px" lineHeight="30px" mb="48px"> Descubra locais incríveis para se visitar em cidades maravilhosas de Santa Catarina.</Text>
        <Button onClick={() => router.push("/cities")} maxWidth="320px" bgColor="#F25D27" color="white" borderRadius="10px" paddingBlock="32px" paddingInline="56px">Descobrir todos os lugares</Button>
      </Box>

      <Box display="grid" gridTemplateColumns="1fr 1fr" gap={8}>
        {places.map((place)=> (
          <Box> 
            <Text><Card id={place.name} image={place.image} name={place.name} locations={place.locations} offset={place.offset} ></Card></Text>
          </Box>
        ))}
      </Box>
      </Box>
      
</Container>
)
}
