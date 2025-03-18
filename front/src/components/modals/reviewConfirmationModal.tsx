import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Box } from "@chakra-ui/react";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { useRouter } from "next/navigation";

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
      <ModalContent maxWidth="480px" borderRadius="20px" p={6} textAlign="center">
        <ModalHeader p={0} display="flex" flexDirection="column" alignItems="center">
          <IoMdCheckmarkCircleOutline size={64} color="#51B853" />
          <Text fontSize="24px" fontWeight="bold" mt={4}>Avaliação enviada!</Text>
        </ModalHeader>
        <ModalBody>
          <Text fontSize="16px" color="gray.600">
            Obrigado por compartilhar sua opinião. Sua avaliação será analisada antes da publicação.
          </Text>
        </ModalBody>
        <ModalFooter display="flex" flexDirection="column" gap={4}>
          <Button
            bgColor="#51B853"
            color="white"
            borderRadius="10px"
            onClick={handleRedirect}
            width="100%"
          >
            Entendi
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
