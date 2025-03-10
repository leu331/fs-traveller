"use client";

import{ Header} from "@/components/layout/header";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import OpeningHoursSection from "@/components/event/details/openingHoursSection.tsx";
import { EventAddress } from "@/components/event/eventAddress";
import { EventImage } from "@/components/event/eventImage";
import { EventButton } from "@/components/event/eventButton";
import { EventReviews } from "@/components/event/eventReviews";
import { AllReviewsModal } from "@/components/modals/allReviewsModal";
import { EventInfo } from "@/components/event/eventInfo";
import { AddReviewsModal } from "@/components/modals/addReviewModal";
import { Review } from "@/types/review";
import { useState } from "react";
// import { ThankYouModal } from "@/components/modals/thankYouModal";

interface Event {
  name: string;
  category: string;
  rating: number;
  image: string;
  id: string;
  description: string;
  phone: number;
  address: string;
  hours: { day: string; status: string }[];
  reviews: Review[];
}

const topRated: Event[] = [
  {
    name: "Doce & Companhia",
    category: "Comida & Bebida",
    rating: 4.7,
    image: "/assets/events/doce.png",
    description: "qssqsqsqs",
    id: "doce--companhia",
    phone: 84981473454,
    address: "Rua Exemplo, 123, Centro, Florianópolis - SC",
    hours: [
      { day: "Segunda", status: "08h - 18h" },
      { day: "Terça", status: "08h - 18h" },
      { day: "Quarta", status: "08h - 18h" },
      { day: "Quinta", status: "08h - 18h" },
      { day: "Sexta", status: "08h - 18h" },
      { day: "Sabádo", status: "08h - 16h" },
      { day: "Domingo", status: "Fechado" },
    ],
    reviews: [],
  },
  {
    name: "Expo Tattoo Floripa",
    category: "Eventos Organizados",
    rating: 5.0,
    image: "/assets/events/expoo-tattoo-floripa.png",
    id: "expo-tattoo-floripa",
    description: "qssqsqsqs",
    phone: 84981668234,
    address: "Rua 7 de setembro, 319, Jardim América, Florianópolis - SC",
    hours: [
      { day: "Segunda", status: "08h - 18h" },
      { day: "Terça", status: "08h - 18h" },
      { day: "Quarta", status: "08h - 18h" },
      { day: "Quinta", status: "08h - 18h" },
      { day: "Sexta", status: "08h - 18h" },
      { day: "Sabádo", status: "08h - 16h" },
      { day: "Domingo", status: "Fechado" },
    ],
    reviews: [
      { text: "Excelente comida, amei o atendimento!", rating: 5, userPhoto: "/assets/users/user1.png", name: "Patricksom Vieras" },
      { text: "Boa comida, mas o tempo de espera foi longo.", rating: 4, userPhoto: "/assets/users/user2.png", name: "Maria Eduarda" },
    ],
  },
  {
    name: "Lagoa da Conceição",
    category: "Comida & Bebida",
    rating: 4.7,
    image: "/assets/events/doce.png",
    id: "lagoa-da-conceicao",
    description: "qssqsqsqs",
    phone: 84981473454,
    address: "Rua Exemplo, 123, Centro, Florianópolis - SC",
    hours: [
      { day: "Segunda", status: "08h - 18h" },
    ],
    reviews: [],
  },
  {
    name: "Praia do Campeche",
    category: "Comida & Bebida",
    rating: 4.7,
    image: "/assets/events/doce.png",
    id: "praia-do-campeche",
    description: "qssqsqsqs",
    phone: 84981473454,
    address: "Rua Exemplo, 123, Centro, Florianópolis - SC",
    hours: [
      { day: "Segunda", status: "08h - 18h" },
    ],
    reviews: [],
  },
];

export default function EventPage() {
  const { id } = useParams();
  const router = useRouter();

  const event = topRated.find((event) => event.id === id)

  if (!event) {
    return (
      <Box p={8} h="80vh" display="flex" flexDirection="column" justifyContent="center" textAlign="center">
        <Heading as="h1" size="2xl" color="red.500">
          Evento não encontrado
        </Heading>
        <Text color="gray.600">Desculpe, não conseguimos encontrar o evento solicitado.</Text>
      </Box>
    );
  }

  const [newReview, setNewReview] = useState("");
  const [selectedStars, setSelectedStars] = useState(0);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [isAllReviewsModalOpen, setIsAllReviewsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(event.reviews);
  const [userName, setUserName] = useState("");
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false);

  const handleAddReview = () => {
    if (newReview && selectedStars) {
      const updatedReviews = [
        ...reviews,
        { text: newReview, rating: selectedStars, userPhoto: "/assets/users/default.png", name: userName || "Usuário" },
      ];
      setReviews(updatedReviews);
      setNewReview("");
      setSelectedStars(0);
      setUserName("");
      setIsAddReviewModalOpen(false);
      setIsThankYouModalOpen(true);
    }
  };

  const handleViewAllReviews = () => {
    setIsAllReviewsModalOpen(true);
  };

  return (
    <Box position="relative" maxW="1200px" mx="auto">
      <Header turnBack={() => router.back()} />
      <Flex p={8} mt={4} gap={16}>
        <Box flex={1} maxW="50%">
          <EventInfo name={event.name} description={event.description} />
          <OpeningHoursSection hours={event.hours} />
          <EventButton phone={event.phone} />
          <EventAddress address={event.address} />
          <EventReviews reviews={reviews} onAddReview={() => setIsAddReviewModalOpen(true)} />
        </Box>
        <EventImage category={event.category} image={event.image} />
      </Flex>

      <AllReviewsModal
        isOpen={isAllReviewsModalOpen}
        onClose={() => setIsAllReviewsModalOpen(false)}
        reviews={reviews}
      />

      <AddReviewsModal
        isOpen={isAddReviewModalOpen}
        onClose={() => setIsAddReviewModalOpen(false)}
        newReview={newReview}
        setNewReview={setNewReview}
        selectedStars={selectedStars}
        setSelectedStars={setSelectedStars}
        handleAddReview={handleAddReview}
        setUserName={setUserName}
        userName={userName}
      />

      {/* <ThankYouModal
        isOpen={isThankYouModalOpen}
        onClose={() => setIsThankYouModalOpen(false)} // Fecha o modal de agradecimento
      /> */}
    </Box>
  );
};


