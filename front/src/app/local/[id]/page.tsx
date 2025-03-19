"use client";  

import { Box, Heading, Text, SimpleGrid, Tabs, TabList, Tab } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { InfoCard } from "../../../components/cards/infoCard";
import { FaCamera } from "react-icons/fa";
import { Header } from "@/components/layout/header";
import api from "@/api/api";
import { City } from "@/types/city";
import { TopRatedCard } from "@/components/cards/topRatedCard";  
import Emphasis from "../../../components/event/ui/emphasis";
import { capitalizeFirstLetterOfEachWord } from "@/utils/captalizeFirstLetterOfEachWorld";

interface Event {
  id: string;
  name: string;
  category: string;
  rating: number;
  image: string;
  cityId: string;
  description: string;
  description2: string
}

interface ApiResponse {
  statusCode: number;
  message: string;
  events: Event[];
}

const categories = ["Todos", "Pontos Turísticos", "Comida E Bebida", "Eventos Organizados"];

export default function CityPage() {
  const { id } = useParams();
  const [city, setCity] = useState<City | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [topRatedEvent, setTopRatedEvent] = useState<Event | null>(null);

  useEffect(() => {
    if (!id) return;
    fetchCity();
    fetchEvents();
    fetchTopRatedEventForCity();
  }, [id]);

  async function fetchCity() {
    try {
      const response = await api.get<{ city: City }>(`/cities/${id}`);
      console.log("OS dados da cidade:", response)
      setCity(response.data.city);
    } catch (error) {
      console.error("Erro ao buscar cidade:", error);
      setCity(null);
    } finally {
      setLoading(false);
    }
  }

  async function fetchTopRatedEventForCity() {
    try {
      const response = await api.get<{ event: Event }>(`/events/${id}/top-rated`);
      setTopRatedEvent(response.data.event);
    } catch (error) {
      console.error("Erro ao buscar evento mais bem avaliado:", error);
      setTopRatedEvent(null);
    }
  }

  async function fetchEvents() {
    try {
      const response = await api.get<ApiResponse>("/events");  
      if (Array.isArray(response.data.events)) {
        const filteredEvents = response.data.events.filter((event) => event.cityId === id);
        setEvents(filteredEvents);
      } else {
        console.error("A chave 'events' não contém um array ou não foi encontrada:", response.data);
      }
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    }
  }

  function getTopRatedItems() {
    return events.sort((a, b) => b.rating - a.rating).slice(0, 4);
  }

  function handleTurnBack() {
    window.history.back();
  }

  if (loading) {
    return (
      <Box p={8} textAlign="center">
        <Heading as="h1" size="lg" color="gray.500">
          Carregando...
        </Heading>
      </Box>
    );
  }

  if (!city) {
    return (
      <Box p={8} textAlign="center" h="90vh" display="flex" flexDirection="column" justifyContent="center">
        <Heading as="h1" size="2xl" color="red.500">
          Cidade não encontrada
        </Heading>
        <Text color="gray.600">Desculpe, não conseguimos encontrar a cidade solicitada.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Header title={city.name} showSearchBar={false} turnBack={handleTurnBack} />
      <Box
        h="340px"  
        w="100%"   
        bgImage={`url(${city.image})`} 
        bgSize="cover"  
        bgPosition="center"
        m={0}  
        p={0}  
      />
      <Box p={8} maxW="1200px" mx="auto">
        <Box maxW="1280px" mx="auto" display="flex" justifyContent="space-between" gap="110px">
          <Box maxWidth="480px">
            <Heading as="h1" size="2xl" color="blue.900" mb={10}>
              {city.name}
            </Heading>
            <Text fontSize="lg" lineHeight="30px" color="#123952" mb={8}>
              {city.description}
            </Text>
            <Text fontSize="lg" lineHeight="30px" color="#617480" mb={6}>
              {city.description2}
            </Text>
          </Box>

          <Box>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={8}>
              <InfoCard 
                icon={FaCamera} 
                number={city.touristSpotsCount ?? 0} 
                label="Pontos Turísticos" 
              />
              <InfoCard 
                icon={FaCamera} 
                number={city.foodAndDrinksCount ?? 0} 
                label="Comida & Bebida" 
              />
              <InfoCard 
                icon={FaCamera} 
                number={city.organizedEventsCount ?? 0} 
                label="Eventos Organizados" 
              />
            </SimpleGrid>
          </Box>         
        </Box>

        <Box mb={8}>
          <Heading as="h2" size="xl" color="blue.900" mb="25px">
            Top Avaliados
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={12}>
            {getTopRatedItems().map((item, index) => (
              <TopRatedCard key={index} event={item} />
            ))}
          </SimpleGrid>
        </Box>

        {topRatedEvent && <Emphasis  emphasi={{ id:topRatedEvent.id, name: topRatedEvent.name, description: topRatedEvent.description, image: topRatedEvent.image }} />}

        <Box mb={8} mt="80px">
          <Box display="flex" justifyContent="space-between">
            <Heading as="h2" size="xl" color="blue.900" mb={4}>
              Conheça Todos
            </Heading>

            <Tabs onChange={(index) => setSelectedCategory(categories[index])}>
              <TabList mb="25px">
                {categories.map((category, index) => (
                  <Tab key={index}>{category}</Tab>
                ))}
              </TabList>
            </Tabs>
          </Box>

          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={6}>
            {events
              .filter(
                (event) =>
                  selectedCategory === "Todos" ||
                  capitalizeFirstLetterOfEachWord(event.category.replace(/_/g, " ")) === selectedCategory
              )
              .map((event) => (
                <TopRatedCard key={event.id} event={event} />
              ))}
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}
