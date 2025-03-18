import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Box } from "@chakra-ui/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";
import smileEmojiPng from "../../assets/happyEmojiPng.png"
import Image from "next/image";

interface ReviewConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThankYouModal({ isOpen, onClose }: ReviewConfirmationModalProps) {
  const router = useRouter();

  const handleRedirect = () => {
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bgColor="rgba(18, 57, 82, 0.1)" maxWidth="480px" borderRadius="20px"  p={6} textAlign="center">
        <ModalHeader p={0} display="flex" flexDirection="column" alignItems="center">
          <Image src={smileEmojiPng} alt=""></Image>
          <Text fontSize="36px" color="#FFFFFF" lineHeight="34px" fontWeight="bold" mt={4}>Avaliação enviada!</Text>
        </ModalHeader>
        <ModalBody>
          <Text fontSize="16px" color="#A0ACB2">
          Agradecemos pelo seu tempo
          e colaboração.
          </Text>
        </ModalBody>
        <ModalFooter display="flex" flexDirection="column" gap={4}>
          <Button
            bgColor="#F25D27"
            color="white"
            borderRadius="10px"
            onClick={handleRedirect}
            width="40%"
            _hover={{bgColor: "#F25D27"}}
          >
            Disponha :)
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
