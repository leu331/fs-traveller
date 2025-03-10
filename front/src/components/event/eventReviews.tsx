import { Box, Heading, Text, Button, Image } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { calculateAverageRating } from "../../utils/calculateAverageRating";
import { useState } from "react";
import { AllReviewsModal } from "../modals/allReviewsModal";
import { Review } from "../../types/review";

interface EventReviewsProps {
  reviews: Review[];
  onAddReview: () => void;
}

export function EventReviews({ reviews, onAddReview }: EventReviewsProps) {
  const averageRating = calculateAverageRating(reviews);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <Box mt={20} mb={4} display="flex" flexDirection="column">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Heading>Avaliações</Heading>
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
          <Text></Text>
        )}
      </Box>

      <AllReviewsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        reviews={reviews}
      />
    </Box>
  );
}
