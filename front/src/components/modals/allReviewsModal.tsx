import { Box, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, Text, Image, Button, Flex, ModalFooter } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { Review } from "@/types/review";
import { BiComment } from "react-icons/bi";

interface ReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  reviews: Review[];
}

export function AllReviewsModal({ isOpen, onClose, reviews }: ReviewsModalProps) {
  const averageRating =
    reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="736px" borderRadius="20px" maxHeight="490px" h={538}>
        <Box display="flex" alignItems="center" justifyContent="space-between" paddingInline="40px" paddingBlock="10px">
          <Box display="flex" alignItems="center" gap={10}>
            <ModalHeader display="flex" gap={2} paddingInline="0px" color="#F25D27" fontWeight="600">
              <Text>Nota</Text>
              <Text> {averageRating.toFixed(1).replace(".", ",")}</Text>
            </ModalHeader>

            <Box display="flex" alignItems="center" gap={4} color="#A0ACB2">
              <BiComment />
              <Text fontWeight="600" color="#bdc0c2">{`${reviews.length} comentários`}</Text>
            </Box>
          </Box>

          <Box paddingInline="40px">
            <Button variant="ghost" onClick={onClose} border="1px solid" p={0} borderColor="#DCE2E5">
              <IoMdClose size="20px" color="#A0ACB2" />
            </Button>
          </Box>
        </Box>

        <Text borderBottom="1px solid" borderColor="#DCE2E5" />

        <ModalBody bgColor="#F5F8FA" borderRadius="10px" padding="20px">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <Box key={index} mb={4} display="flex" alignItems="center" gap={4}>
                {review.userPhoto ? (
                  <Image
                    src={review.userPhoto}
                    alt="Foto do usuário"
                    boxSize="40px"
                    borderRadius="50%"
                  />
                ) : (
                  <Box
                    boxSize="40px"
                    borderRadius="50%"
                    bgColor="gray.300"
                  />
                )}

                <Box width="100%">
                  <Box display="flex" justifyContent="space-between">
                    <Text fontWeight="600" color="#617480" fontSize="20px">
                      {review.name}
                    </Text>
                    <Text display="flex" alignItems="center" gap={2}>
                      <FaStar color="#F25D27" /> {review.rating}
                    </Text>
                  </Box>

                  <Text fontWeight="400" mt="16px" color="#617480">
                    {review.text}
                  </Text>
                </Box>
              </Box>
            ))
          ) : (
            <Text color="#115D8C" paddingInline="20px">Não há avaliações ainda.</Text>
          )}
        </ModalBody>

        <Box borderBottom="1px solid" borderColor="#DCE2E5" mt="16px" />
      </ModalContent>
    </Modal>
  );
}
