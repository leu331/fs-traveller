// src/components/Footer.tsx
import { Box, Text } from "@chakra-ui/react";

export default function Footer() {
  return (
    <Box as="footer" bg="gray.800" py={4} px={6} color="white" textAlign="center">
      <Text>© {new Date().getFullYear()} Traveler. Todos os direitos reservados.</Text>
    </Box>
  );
}
