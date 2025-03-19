"use client";

import { useEffect, useState } from "react";
import { Container, Flex, Grid, Heading, Button, ButtonGroup, Select, Text, Box } from "@chakra-ui/react";
import Image from "next/image";
import { Header } from "../../components/layout/header";
import { Card } from "../../components/cards/card";
import sadEmojiPng from "../../assets/Emoji.png";
import api from "../../api/api";
import { City } from "@/types/city";

interface ApiResponse {
  statusCode: number;
  message: string;
  cities: City[];
}

export default function CitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterType, setFilterType] = useState("all");
  const [cities, setCities] = useState<City[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "auto";
    fetchCities();
  }, []);

  async function fetchCities() {
    try {
      setLoading(true);
      setError(false);
  
      const response = await api.get<ApiResponse>('/cities');
  
      setCities(response.data.cities || []);
    } catch (error: any) {
      console.error("Erro ao buscar cidades:", error.response?.data || error.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const handleFilterTypeChange = (type: string) => {
    setFilterType(type);
  };

  const sortedCities = [...cities]
    .filter((city) => (filterType === "mostAccessed" ? city.organizedEventsCount > 30 : true))
    .sort((a, b) => (sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)))
    .sort((a, b) => {
      const aMatches = a.name.toLowerCase().includes(searchQuery) ? 1 : 0;
      const bMatches = b.name.toLowerCase().includes(searchQuery) ? 1 : 0;
      return bMatches - aMatches;
    });

  const hasMatchingCities = sortedCities.some(city => city.name.toLowerCase().includes(searchQuery));

  return (
    <>
      <Header showButton={true} showSearchBar={true} onSearch={handleSearch} />
      <Container maxW="90rem" py={12} mt="50px">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h1" size="2xl" fontWeight="bold" color="#123952">
            Selecione uma cidade
          </Heading>
          <Flex gap={4}>
            <ButtonGroup variant="outline" spacing={4}>
              <Button onClick={() => handleFilterTypeChange("all")} colorScheme={filterType === "all" ? "blue" : undefined}>
                Todas
              </Button>
              <Button onClick={() => handleFilterTypeChange("mostAccessed")} colorScheme={filterType === "mostAccessed" ? "blue" : undefined}>
                Mais Acessadas
              </Button>
            </ButtonGroup>
            <Select value={sortOrder} onChange={handleSortChange} maxW="200px" placeholder="Ordenar por..." ml="auto">
              <option value="asc">A a Z</option>
              <option value="desc">Z a A</option>
            </Select>
          </Flex>
        </Flex>

        {loading ? (
          <Text textAlign="center" fontSize="lg" fontWeight="bold" color="gray.600">
            Carregando cidades...
          </Text>
        ) : error ? (
          <Text textAlign="center" fontSize="lg" fontWeight="bold" color="red.500">
            Erro ao carregar cidades. Tente novamente mais tarde.
          </Text>
        ) : cities.length === 0 || !hasMatchingCities ? (
          <Box textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={6} minHeight="50vh">
            <Image src={sadEmojiPng} alt="Nada encontrado" width={100} height={100} />
            <Text fontSize="lg" fontWeight="bold" mt="32px" color="gray.600">
              Sem resultados.
            </Text>
            <Text fontSize="lg" color="#617480" fontWeight="bold">
              Tente uma nova busca
            </Text>
          </Box>
        ) : (
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
            {sortedCities.map((city) => {
              const totalLocals = city.foodAndDrinksCount + city.touristSpotsCount + city.organizedEventsCount;
              const isMatch = city.name.toLowerCase().includes(searchQuery);

              return (
                <Box key={city.id} opacity={isMatch ? "1" : "0.5"} transition="opacity 0.3s ease-in-out">
                  <Card {...city} totalLocals={totalLocals} />
                </Box>
              );
            })}
          </Grid>
        )}
      </Container>
    </>
  );
}
