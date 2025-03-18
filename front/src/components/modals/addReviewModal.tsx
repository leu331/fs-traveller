import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Textarea, Input, Box, Text, Icon, Flex, Image } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";

interface AddReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  newReview: string;
  setNewReview: (review: string) => void;
  selectedStars: number;
  setSelectedStars: (stars: number) => void;
  handleAddReview: (newRating: number, review: string, userName: string, userPhotoUrl: string | null) => void;  
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
  averageRating: number;  
  totalReviews: number;  
  setAverageRating: Dispatch<SetStateAction<number>>; 
  setUserPhotoURL: Dispatch<SetStateAction<string | null>>; 
}

const MAX_CHARACTERS = 240;

export function AddReviewsModal({
  isOpen,
  onClose,
  newReview,
  setNewReview,
  selectedStars,
  userName,
  setUserName,
  averageRating,
  totalReviews,
  setSelectedStars,
  handleAddReview,
  setAverageRating,
}: AddReviewsModalProps) {
  const totalStars = 5;
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userPhotoURL, setUserPhotoURL] = useState<string | null>(null);

  const handleReviewChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_CHARACTERS) {
      setNewReview(e.target.value);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
      const fileURL = URL.createObjectURL(selectedFile);
      setImageURL(fileURL);
      setUserPhotoURL(fileURL);  // Passando a URL da imagem para o componente pai
    }
  };

  const handleFormSubmit = () => {
    if (!selectedStars || !newReview || !userName) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const newTotalReviews = totalReviews + 1;
    const newRating = (averageRating * totalReviews + selectedStars) / newTotalReviews;

    const finalUserPhotoURL = userPhotoURL ? userPhotoURL : null;

    handleAddReview(newRating, newReview, userName, finalUserPhotoURL);

    setNewReview('');
    setSelectedStars(0);
    setUserName('');
    setUserPhotoURL(null);  
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="736px" borderRadius="20px" maxHeight="490px" h={538}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <ModalHeader color="#115D8C" fontWeight="bold" fontSize="24px" paddingInline="40px" whiteSpace="nowrap">Adicionar Avaliação</ModalHeader>
          <Box paddingInline="40px">
            <Button variant="ghost" onClick={onClose} border="1px solid" p={0} borderColor="#DCE2E5">
              <IoMdClose size="20px" color="#A0ACB2" />
            </Button>
          </Box>
        </Box>
        <Text borderBottom="1px solid" borderColor="#DCE2E5" />
        <ModalBody bgColor="#F5F8FA" borderRadius="10px">
          <Box display="flex" gap={4} mt="25px" mb="16px">
            <Box position="relative">
              <Input
                position="relative"
                placeholder="Upload da sua foto"
                border="none"
                width="100%"
                height="100%"
                type="file"
                bgColor={file ? "#51B853" : "#115D8C"} 
                color="#FFFFFF"
                cursor="pointer"
                opacity="0"
                zIndex={1}
                onChange={handleFileChange}
              />
               <Text
                position="absolute"
                top="50%"
                left="50%"
                transform="translate(-50%, -50%)"
                color={file? "#51B853" : "#ffffff"}
                fontWeight="600"
                bgGradient={file ? "linear(to-r, #DCF5DD, #DCF5DD00)" : "linear(to-r, #115D8C, #2C7ED6)"} 
                width="105%"
                borderRadius="8px"
                paddingInline="20px"
                paddingBlock="7px"
                size="14px"
              >
                {file ? "Feito!" : "Upload da sua foto"}
              </Text>
            </Box>
            <Input type="text" placeholder="Seu nome completo" value={userName} onChange={(event) => setUserName(event.target.value)} color="gray.500" />
          </Box>
          <Box position="relative">
            <Textarea
              placeholder="Escreva sua avaliação aqui"
              value={newReview}
              onChange={handleReviewChange}
              maxLength={MAX_CHARACTERS}
              resize="none"
              pr="400px"
              height="140px"
              color="gray.500" 
            />
            <Box>
              <Text lineHeight="22px" position="absolute" bottom="8px" right="156px" fontSize="12px" color={newReview.length > 0 ? "#F25D27" : "gray-500"} >
                {`(${newReview.length})`}
              </Text>
              <Text position="absolute" bottom="8px" right="12px" fontSize="12px" lineHeight="22px" color={newReview.length > 0 ? "#F25D27" : "gray-500"} >
                Máximo de 240 caracteres
              </Text>
            </Box>
          </Box>
          <Flex mt={4} justify="space-between" align="center">
            <Text fontSize="16px" color="#123952" fontWeight="600">
              Sua nota de 1 a 5
            </Text>
            <Flex gap={2}>
              {[...Array(totalStars)].map((_, index) => {
                const starIndex = index + 1;
                return (
                  <Box
                    key={starIndex}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    height="50px"
                    width="48px"
                    p="10px"
                    borderRadius="10px"
                    backgroundColor={"transparent"}
                    cursor="pointer"
                    transition="background 0.3s ease"
                    onClick={() => setSelectedStars(starIndex)}
                    border="1px solid"
                    borderColor="#F25D27"
                  >
                    <Icon as={FaStar} boxSize={5} color={selectedStars >= starIndex ? "#F25D27" : "#DCE2E5"} />
                  </Box>
                );
              })}
            </Flex>
          </Flex>
          <Box mt={10}>
            <Flex alignItems="center" justifyContent="space-between" width="100%">
              <Flex alignItems="center" gap={6}>
                <IoAlertCircleOutline color="#F25D27" size="32px" />
                <Text maxWidth="200px" fontSize="14px" color="#617480">Sua avaliação será analisada antes da publicação.</Text>
              </Flex>
              <Button
                bgColor="#51B853"
                color="white"
                paddingInline="32px"
                borderRadius="10px"
                onClick={handleFormSubmit}
                isLoading={isSubmitting}
                isDisabled={isSubmitting}
                _hover={{bgColor: "#47A446"}}
              >
                Enviar Avaliação
              </Button>
            </Flex>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
