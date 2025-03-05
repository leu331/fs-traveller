"use client";

import { useEffect, useState } from "react";
import { Container, Flex, Grid, Heading, Button, ButtonGroup, Select, Text, Box} from "@chakra-ui/react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import Header from "../../components/header";
import Card from "../../components/card"; // Certifique-se de usar o componente Card original
import sadEmojiPng from "../../assets/Emoji.png"

const cities = [
  { name: "Florianópolis", description: "A capital de Santa Catarina", image: "/assets/floripa.png", locations: 98 },
  { name: "Blumenau", description: "Famosa pela Oktoberfest", image: "/assets/blumenau.png", locations: 29 },
  { name: "Bombinhas", description: "Praias paradisíacas", image: "/assets/bombinhas.png", locations: 43 },
  { name: "Águas Mornas", description: "Cidade tranquila e relaxante", image: "/assets/aguasMornas.png", locations: 13 },
];

export default function CitiesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // "asc" para crescente, "desc" para decrescente
  const [filterType, setFilterType] = useState("all"); // "all" para todas, "mostAccessed" para mais acessadas

  useEffect(() => {
    document.body.style.overflow = "auto"; // Restaurar o scroll da página
  }, []);

  // Função para atualizar a pesquisa
  const handleSearch = (query: string) => {
    setSearchQuery(query.toLowerCase());
  };

  // Função para ordenar as cidades
  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(event.target.value);
  };

  // Função para filtrar o tipo de cidade (todas ou mais acessadas)
  const handleFilterTypeChange = (type: string) => {
    setFilterType(type);
  };

  // Filtrando as cidades com base no termo de pesquisa e tipo de filtro
  const filteredCities = cities
    .filter((city) => city.name.toLowerCase().includes(searchQuery))
    .filter((city) => {
      if (filterType === "mostAccessed") {
        // Exemplo fictício de filtro "Mais acessadas" baseado na quantidade de locais
        return city.locations > 30; // Apenas cidades com mais de 30 locais
      }
      return true; // Se for "all", mostra todas
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.name.localeCompare(b.name); // Ordena em ordem crescente
      } else {
        return b.name.localeCompare(a.name); // Ordena em ordem decrescente
      }
    });

  return (
    <>
      {/* Header com a barra de pesquisa */}
      <Header showSearchBar={true} onSearch={handleSearch} />

      <Container maxW="90rem" py={12} mt="100px">
        {/* Flex para alinhar título, filtro de ordenação e filtro de tipo */}
        <Flex justify="space-between" align="center" mb={6}>
          <Heading as="h1" size="2xl" fontWeight="bold" color="#123952">
            Selecione uma cidade
          </Heading>

          <Flex gap={4}>
            {/* Filtro de tipo (Todas ou Mais Acessadas) */}
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
              ml="auto" // Margem automática para garantir que o filtro fique à direita
            >
              <option value="asc">A a Z</option>
              <option value="desc">Z a A</option>
            </Select>
          </Flex>
        </Flex>

        {/* Exibindo os cards de cidades ou mensagem de erro */}
        {filteredCities.length === 0 ? (
          <Box 
          textAlign="center" 
          display="flex" 
          flexDirection="column" 
          justifyContent="center" 
          alignItems="center"  // Adicionando alinhamento horizontal
          mt={6} 
          minHeight="50vh" // Garante que o Box tenha pelo menos metade da altura da tela
        >
          <Image
            src={sadEmojiPng} // A imagem da cara triste
            alt="Nada encontrado"
            width={100}
            height={100}
           
          />
          <Text fontSize="lg" fontWeight="bold" mt="32px" color="gray.600">Sem resultados.</Text>
          <Text fontSize="lg" color="#617480" fontWeight="bold" >Tente uma nova busca </Text>
        </Box>
        ) : (
          <Grid templateColumns={{ base: "1fr", md: "repeat(4, 1fr)" }} gap={8}>
            {filteredCities.map((city) => (
              <Card key={city.name} {...city} />
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
}
