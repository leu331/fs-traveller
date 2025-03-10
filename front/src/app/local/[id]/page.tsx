"use client"; 

import { Box, Heading, Text, SimpleGrid, Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useState } from "react";
import {InfoCard} from "../../../components/cards/infoCard";
import {TopRatedCard} from "../../../components/cards/topRatedCard"; 
import Emphasis from "../../../components/event/ui/emphasis";
import { FaCalendarAlt, FaCamera, FaUtensils } from "react-icons/fa";
import {Header} from "@/components/layout/header";

const cities = [
  { id: "florianopolis", name: "Florianópolis", description: "A capital do estado de Santa Catarina no sul do Brasil, é majoritariamente constituída pela Ilha de Santa Catarina, com 54 km de comprimento.", image: "/assets/floripaDetails.png", locations: 67, food: 20, events: 11 },
  { id: "blumenau", name: "Blumenau", description: "Famosa pela Oktoberfest, é um dos principais polos industriais do estado de Santa Catarina.", image: "/assets/floripaDetails.png", locations: 29, food: 3, events: 7 },
  { id: "bombinhas", name: "Bombinhas", description: "Praias paradisíacas e natureza exuberante fazem desta cidade um destino turístico muito procurado.", image: "/assets/bombinhas.png", locations: 43, food: 10, events: 5 },
  { id: "aguas-mornas", name: "Águas Mornas", description: "Cidade tranquila e relaxante, famosa por suas águas termais.", image: "/assets/aguasMornas.png", locations: 13, food: 8, events: 3 },
];

const topRated = [
  { name: "Doce & Companhia", category: "Comida & Bebida", rating: 4.7, image: "/assets/doces.png", id: "doce--companhia" },
  { name: "Lagoa da Conceição", category: "Pontos Turísticos", rating: 5.0, image: "/assets/lagoa.png", id: "lagoa-conceicao" },
  { name: "Praia-do Campeche", category: "Pontos Turísticos", rating: 4.9, image: "/assets/campeche.png", id: "praia-do-campeche" },
  { name: "Expo Tattoo Floripa", category: "Eventos Organizados", rating: 5.0, image: "/assets/tattoo.png", id: "expo-tattoo" },
];

const emphasiData = {
  name: "Praia dos Ingleses",
  description: "Uma parte do paraíso na terra. Frequentemente com águas claras em tons verdes e azuis. Um dos locais mais preferidos por turistas de viajantes"
};

const categories = ["Todos", "Pontos Turísticos", "Comida & Bebida", "Eventos Organizados"];

export default function CityPage() {
  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/ç/g, "c")
      .replace(/ñ/g, "n")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  };

  const { id } = useParams();
  const city = cities.find((city) => generateSlug(city.name) === id);

  const [selectedCategory, setSelectedCategory] = useState("Todos");

  function handleTurnBack() {
    window.history.back();
  }

  if (!city) {
    return (
      <Box p={8} textAlign="center">
        <Heading as="h1" size="2xl" color="red.500">Cidade não encontrada</Heading>
        <Text color="gray.600">Desculpe, não conseguimos encontrar a cidade solicitada.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Header 
        title={city.name} 
        showSearchBar={false} 
        turnBack={handleTurnBack}
      />

      <Box 
        w="100%" 
        h="340px" 
        bgImage={`url(${city.image})`} 
        bgSize="cover" 
        bgPosition="center" 
        position="relative" 
      />

      <Box p={8} maxW="1200px" mx="auto">
        <Box maxW="1280px" mx="auto" display="flex" gap="110px">
          <Box maxWidth="480px">
            <Heading as="h1" display="flex" flexDirection="column" size="2xl" color="blue.900" mb={4}>
              {city.name}
            </Heading>
            <Text fontSize="lg" color="gray.600" mb={6}>
              {city.description}
            </Text>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
            <InfoCard icon={FaCamera} number={city.locations} label="Pontos Turísticos" />
            <InfoCard icon={FaUtensils} number={city.food} label="Comida e Bebida" />
            <InfoCard icon={FaCalendarAlt} number={city.events} label="Eventos Organizados" />
          </SimpleGrid>
        </Box>

        <Heading as="h2" size="xl" color="blue.900" mb="32px">
          Top avaliados
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
          {topRated.map((place, index) => (
            <TopRatedCard place={place} key={index} />
          ))}
        </SimpleGrid>

        <Box mb="80px">
          <Emphasis emphasi={emphasiData} />
        </Box>

        <Tabs onChange={(index) => setSelectedCategory(categories[index])}>
          <Box display="flex" justifyContent="space-between">
            <Heading as="h2" size="xl" color="blue.900">
              Conheça todos
            </Heading>
            <TabList mb="32px">
              {categories.map((category) => (
                <Tab color="#123952" fontWeight="600" _selected={{ borderColor: "#F25D27" }} key={category}>
                  {category} 
                </Tab>
              ))}
            </TabList>
          </Box>

          <TabPanels>
            {categories.map((_, index) => (
              <TabPanel key={index}>
                <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
                  {topRated.filter((place) => 
                    selectedCategory === "Todos" || place.category === selectedCategory
                  ).map((place) => (
                    <TopRatedCard place={place} key={place.id} />
                  ))}
                </SimpleGrid>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

