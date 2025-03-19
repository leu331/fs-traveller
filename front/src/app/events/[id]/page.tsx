"use client";

import { Header } from "@/components/layout/header";
import { Box, Heading, Text, Flex } from "@chakra-ui/react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import OpeningHoursSection from "@/components/event/details/openingHoursSection.tsx";
import { EventAddress } from "@/components/event/eventAddress";
import { EventImage } from "@/components/event/eventImage";
import { EventButton } from "@/components/event/eventButton";
import { EventReviews } from "@/components/event/eventReviews";
import { EventInfo } from "@/components/event/eventInfo";
import { AddReviewsModal } from "@/components/modals/addReviewModal";
import { ThankYouModal } from "@/components/modals/thankYoumodal"; 
import { Review } from "@/types/review";
import api from "@/api/api";

interface Event {
  name: string;
  category: string;
  rating: number;
  image: string;
  id: string;
  description: string;
  phone: string;
  address: string;
  schedules: { day: string; openingTime: string; closingTime: string }[];
  reviews: Review[];
}

export default function EventPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [isThankYouModalOpen, setIsThankYouModalOpen] = useState(false); 
  const [newReview, setNewReview] = useState(""); 
  const [selectedStars, setSelectedStars] = useState(0);
  const [userName, setUserName] = useState("");
  const [averageRating, setAverageRating] = useState<number>(0);
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchEvent() {
      try {
        const response = await api.get<{ event: Event }>(`/events/${id}`);
        setEvent(response.data.event);
        setAverageRating(response.data.event.rating);
      } catch (error: any) {
        console.error("Erro ao buscar evento:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchEvent();
  }, [id]);

  const handleAddReview = (
    newRating: number, 
    review: string, 
    userName: string, 
    userPhotoURL: string | null 
  ) => {
    if (event) {
      const updatedReviews = Array.isArray(event.reviews) ? [...event.reviews] : [];
    
      const newReviewData: Review = {
        name: userName,
        userPhoto: userPhotoURL, 
        text: review,
        rating: newRating,
      };
    
      updatedReviews.push(newReviewData);
    
      const totalRating = updatedReviews.reduce((sum, review) => sum + (review.rating ?? 0), 0);
      const updatedRating = totalRating / updatedReviews.length;
      
      setAverageRating(updatedRating);
    
      setEvent({
        ...event,
        reviews: updatedReviews,
      });
  
      setAverageRating(updatedRating);
      setIsAddReviewModalOpen(false);
      setSelectedStars(0);
      setUserName("");
      setNewReview("");
    
      setIsThankYouModalOpen(true);  // Exibe o modal de agradecimento
    }
  };
  
  

  if (loading) {
    return (
      <Box p={8} textAlign="center">
        <Heading as="h1" size="lg" color="gray.500" h="80vh" display="flex" justifyContent="center">
          Carregando...
        </Heading>
      </Box>
    );
  }

  if (error || !event) {
    return (
      <Box p={8} h="80vh" display="flex" flexDirection="column" justifyContent="center" textAlign="center">
        <Heading as="h1" size="2xl" color="red.500">
          Evento não encontrado
        </Heading>
        <Text color="gray.600">Desculpe, não conseguimos encontrar o evento solicitado.</Text>
      </Box>
    );
  }

  const totalReviews = event.reviews ? event.reviews.length : 0;

  return (
    <Box position="relative" maxW="1200px" mx="auto">
      <Header turnBack={() => router.back()} />
      <Flex p={8} mt={4} gap={16}>
        <Box flex={1} maxW="50%">
          <EventInfo name={event.name} description={event.description} />
          <OpeningHoursSection schedules={event.schedules} />
          <EventButton phone={event.phone} />
          <EventAddress address={event.address} />
          <EventReviews averageRating={averageRating} onAddReview={() => setIsAddReviewModalOpen(true)} reviews={event.reviews} />
        </Box>
        <EventImage category={event.category} image={event.image} />
      </Flex>

      {isAddReviewModalOpen && (
        <Box position="fixed" top={0} left={0} w="100vw" h="100vh" bg="rgba(18, 57, 82, 0.7)" zIndex={10}>
          <AddReviewsModal
            averageRating={averageRating}
            totalReviews={totalReviews}
            key={event.id}
            setAverageRating={setAverageRating}
            isOpen={isAddReviewModalOpen}
            newReview={newReview} 
            selectedStars={selectedStars}
            setNewReview={setNewReview} 
            onClose={() => setIsAddReviewModalOpen(false)}
            userName={userName}
            setSelectedStars={setSelectedStars}
            handleAddReview={handleAddReview}
            setUserName={setUserName}
            setUserPhotoURL={setUserPhotoURL}
          />
        </Box>
      )}

      {isThankYouModalOpen && (
        <Box position="fixed" top={0} left={0} w="100vw" h="100vh" bg="rgba(18, 57, 82, 0.7)" zIndex={10}> 
          <ThankYouModal isOpen={isThankYouModalOpen} onClose={() => setIsThankYouModalOpen(false)} />
        </Box>
      )}
    </Box>
  );
}
