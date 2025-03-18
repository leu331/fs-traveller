"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import { Header } from "@/components/layout/header";
import { Card } from "@/components/cards/card";
import api from "@/api/api";
import { City } from "@/types/city";

interface ApiResponse {
  statusCode: number;
  message: string;
  cities: City[];
}

export default function HomePage() {
  const router = useRouter();
  const [cities, setCities] = useState<City[]>([]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    fetchCities();
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  async function fetchCities() {
    try {
      const response = await api.get<ApiResponse>("/cities");
      setCities(response.data.cities || []);
    } catch (error) {
      console.error("Erro ao buscar cidades:", error);
    }
  }

  return (
    <Container maxW="80rem" px={6} py={16}>
      <Header showButton={true} />
      <Box display="flex" alignItems="center" gap="150px">
        <Box maxWidth="380px" display="flex" flexDirection="column" justifyContent="center" height="86vh">
          <Heading fontSize="80px" fontWeight="650" color="#123952" mb="40px" as="h1">
            Viva uma Grande aventura
          </Heading>
          <Text color="#617480" maxWidth="320px" fontSize="20px" lineHeight="30px" mb="48px">
            Descubra locais incríveis para se visitar em cidades maravilhosas de Santa Catarina.
          </Text>
          <Button
            onClick={() => router.push("/cities")}
            maxWidth="320px"
            bgColor="#F25D27"
            color="white"
            borderRadius="10px"
            paddingBlock="32px"
            paddingInline="56px"
            _hover={{bgColor: "#F25D27"}}
          >
            Descobrir todos os lugares
          </Button>
        </Box>

        <Box 
          display="grid" 
          gridTemplateColumns="1fr 1fr" 
          gap="32px" 
          alignItems="start"
        >
          {cities.slice(0, 4).map((city, index) => {
  const totalLocals = city.foodAndDrinksCount + city.touristSpotsCount + city.organizedEventsCount;

  return (
    <Box 
      key={city.id} 
      transform={index % 2 === 0 ? "translateY(-36px)" : "translateY(16px)"}
    >
      <Card id={city.id} image={city.image} name={city.name} totalLocals={totalLocals} />
    </Box>
  );
})}

        </Box>
      </Box>
    </Container>
  );
}
