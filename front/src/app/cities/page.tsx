"use client";

import { useEffect, useState } from "react";
import { Container, Flex, Grid, Heading, Button, ButtonGroup, Select, Text, Box } from "@chakra-ui/react";
import Image from "next/image";
import {Header} from "../../components/layout/header";
import {Card} from "../../components/cards/card";
import sadEmojiPng from "../../assets/Emoji.png";

const cities = [
  { name: "Florianópolis", description: "A capital de Santa Catarina", image: "/assets/floripa.png", locations: 98 },
  { name: "Blumenau", description: "Famosa pela Oktoberfest", image: "/assets/blumenau.png", locations: 29 },
  { name: "Bombinhas", description: "Praias paradisíacas", image: "/assets/bombinhas.png", locations: 43 },
  { name: "Águas Mornas", description: "Cidade tranquila e relaxante", image: "/assets/aguasMornas.png", locations: 13 },
];

export function CitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    document.body.style.overflow = "auto";
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  const handleFilterTypeChange = (type: string) => {
    setFilterType(type);
  };

  const filteredCities = cities
    .filter((city) => city.name.toLowerCase().includes(searchQuery))
    .filter((city) => {
      if (filterType === "mostAccessed") {
        return city.locations > 30;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name);
      } else {
        return b.name.localeCompare(a.name);
      }
    });

  return (
    <>
      <Header showButton={true} showSearchBar={true} onSearch={handleSearch} />
      <Container maxW="90rem" py={12} mt="100px">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h1" size="2xl" fontWeight="bold" color="#123952">
            Selecione uma cidade
          </Heading>
          <Flex gap={4}>
            <ButtonGroup variant="outline" spacing={4}>
              <Button
                onClick={() => handleFilterTypeChange("all")}
                colorScheme={filterType === "all" ? "blue" : undefined}
              >
                Todas
              </Button>
              <Button
                onClick={() => handleFilterTypeChange("mostAccessed")}
                colorScheme={filterType === "mostAccessed" ? "blue" : undefined}
              >
                Mais Acessadas
              </Button>
            </ButtonGroup>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              maxW="200px"
              placeholder="Ordenar por..."
              ml="auto"
            >
              <option value="asc">A a Z</option>
              <option value="desc">Z a A</option>
            </Select>
          </Flex>
        </Flex>
        {filteredCities.length === 0 ? (
          <Box textAlign="center" display="flex" flexDirection="column" justifyContent="center" alignItems="center" mt={6} minHeight="50vh">
            <Image src={sadEmojiPng} alt="Nada encontrado" width={100} height={100} />
            <Text fontSize="lg" fontWeight="bold" mt="32px" color="gray.600">Sem resultados.</Text>
            <Text fontSize="lg" color="#617480" fontWeight="bold">Tente uma nova busca</Text>
          </Box>
        ) : (
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
            {filteredCities.map((city) => (
              <Card id={city.name} key={city.name} {...city} />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
