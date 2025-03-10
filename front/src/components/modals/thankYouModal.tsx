import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Text, Box } from "@chakra-ui/react";
import happyEmojiPng from "../../assets/happyEmojiPng.png";
import Image from "next/image";

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThankYouModal({ isOpen, onClose }: ThankYouModalProps) {
  return (
    <Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay border="none" />
        <ModalContent border="none">
          <Box bgColor="#123952" display="flex" justifyContent="center" mt="100px">
            <Image src={happyEmojiPng} alt="emoji sorrindo" />
          </Box>

          <ModalHeader textAlign="center" fontSize="20px">
            Avaliação enviada!
          </ModalHeader>
          <ModalBody textAlign="center" fontSize="16px">
            <Text>Agradecemos pelo seu tempo de colaboração</Text>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button
              bgColor="#F25D27"
              color="white"
              mb="100px"
              borderRadius="10px"
              onClick={onClose}
            >
              Disponha
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
