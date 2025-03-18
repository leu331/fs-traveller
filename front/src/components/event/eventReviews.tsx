import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { Review } from "../../types/review";
import { AllReviewsModal } from "../modals/allReviewsModal";

interface EventReviewsProps {
  reviews: Review[];
  onAddReview: () => void;
  averageRating: number;
}

export function EventReviews({ reviews = [], onAddReview, averageRating }: EventReviewsProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Box mt={20} mb={4} display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading color="#123952">Avaliações</Heading>
        <Text color="#F25D27" fontWeight="600" display="flex" alignItems="center" gap={2}>
          <FaStar /> {averageRating.toFixed(1).replace(".", ",")}
        </Text>
        <Box display="flex" gap={4}>
          <Button
            bgColor="transparent"
            color="#A0ACB2"
            cursor="pointer"
            _hover={{ bgColor: "transparent" }}
            onClick={onAddReview}
          >
            Adicionar
          </Button>
          <Button
            color="#A0ACB2"
            bgColor="transparent"
            onClick={handleOpenModal}
            _hover={{ bgColor: "transparent" }}
          >
            Ver todas
          </Button>
        </Box>
      </Box>

      <Box borderBottom="1px solid #DCE2E5" mt={4} />

      <Box mt={8} width="100%">
        {reviews.length > 0 ? (
          reviews.slice(0, 2).map((review, index) => (
            <Box
              key={index}
              mb={4}
              display="flex"
              alignItems="center"
              gap={4}
              borderBottom={index === reviews.length - 1 ? "none" : "1px solid #DCE2E5"}
              paddingBottom={index === reviews.length - 1 ? "0" : "16px"}
            >
              <Image
                src={review.userPhoto}
                alt="Foto do usuário"
                boxSize="40px"
                borderRadius="50%"
              />
              <Box width="100%">
                <Box display="flex" justifyContent="space-between">
                  <Text fontWeight="600" color="#617480" fontSize="20px">
                    {review.name}
                  </Text>
                  <Text display="flex" alignItems="center" gap={2}>
                    <FaStar color="#F25D27" /> {review.rating}
                  </Text>
                </Box>

                <Text fontWeight="400" mt="8px" color="#617480">
                  {review.text}
                </Text>
              </Box>
            </Box>
          ))
        ) : (
          <Text>Nenhuma avaliação disponível</Text> 
        )}
      </Box>

      {isModalOpen && (
        <Box position="fixed" top={0} left={0}  w="100vw" h="100vh" bg="rgba(18, 57, 82, 0.7)" zIndex={10}>
          <AllReviewsModal isOpen={isModalOpen} onClose={handleCloseModal} reviews={reviews} />
        </Box>
      )}
    </Box>
  );
}
