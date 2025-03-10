import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, ModalCloseButton, Textarea, Input, Box, Text, Icon, Flex, Image } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { FaStar } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { IoAlertCircleOutline } from "react-icons/io5";
import { useRouter } from 'next/navigation';

interface AddReviewsModalProps {
  isOpen: boolean;
  onClose: () => void;
  newReview: string;
  setNewReview: (review: string) => void;
  selectedStars: number;
  setSelectedStars: (stars: number) => void;
  handleAddReview: () => void;
  userName: string;
  setUserName: Dispatch<SetStateAction<string>>;
}

const MAX_CHARACTERS = 240;

export function AddReviewsModal({
  isOpen,
  onClose,
  newReview,
  setNewReview,
  selectedStars,
  setSelectedStars,
  handleAddReview,
  userName,
  setUserName
}: AddReviewsModalProps) {
  const totalStars = 5;
  const [file, setFile] = useState<File | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

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
    }
  };

  const handleFormSubmit = () => {
    setIsSubmitting(true);
    handleAddReview();

    setTimeout(() => {
      setIsSubmitting(false);
      onClose();
      router.push('/thank-you');
    }, 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxWidth="736px" borderRadius="20px" maxHeight="538px" h={538}>
        <Box display="flex" alignItems="center" justifyContent="space-between">
          <ModalHeader paddingInline="40px">Adicionar Avaliação</ModalHeader>
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
                bgColor="#115D8C"
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
                color="#FFFFFF"
                fontWeight="600"
                bgColor="#115D8C"
                width="105%"
                borderRadius="8px"
                paddingInline="20px"
                paddingBlock="7px"
                size="14px"
              >
                Upload da sua foto
              </Text>
            </Box>
            <Input type="text" placeholder="Seu nome completo" value={userName} onChange={(event) => setUserName(event.target.value)} />
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
              <Text position="absolute" bottom="8px" right="156px" fontSize="12px" color={newReview.length > 0 ? "#F25D27" : "gray-500"}>
                {`(${newReview.length})`}
              </Text>
              <Text position="absolute" bottom="8px" right="12px" fontSize="12px" color={newReview.length > 0 ? "#F25D27" : "gray-500"}>
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
                    backgroundColor={selectedStars >= starIndex ? "#F1BEAC" : "transparent"}
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
          {imageURL && (
            <Box mt={4}>
              <Text fontSize="14px" color="gray.600">Imagem selecionada:</Text>
              <Image src={imageURL} alt="Imagem da avaliação" boxSize="150px" objectFit="cover" />
            </Box>
          )}
        </ModalBody>
        <ModalFooter mt="42px">
          <Flex alignItems="center" justifyContent="space-between" width="100%">
            <Flex alignItems="center" gap={6}>
              <IoAlertCircleOutline color="#F25D27" size="32px" />
              <Text maxWidth="200px">Sua avaliação será analisada antes da publicação.</Text>
            </Flex>
            <Button
              bgColor="#51B853"
              color="white"
              paddingBlock="11px"
              paddingInline="32px"
              borderRadius="10px"
              onClick={handleFormSubmit}
              isLoading={isSubmitting}
              isDisabled={isSubmitting}
            >
              Salvar Avaliação
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
