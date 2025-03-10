import { Box, Button, Heading, Text, Image } from "@chakra-ui/react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";

interface EventRatingsProps {
  event: { rating: number };
  reviews: { userPhoto: string; text: string; rating: number }[];
}

export function EventRatings({ event, reviews }: EventRatingsProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box>
      <Box mt={20} mb={4} display="flex" alignItems="center" justifyContent="space-between">
        <Heading>Avaliações</Heading>
        <Text color="#F25D27" display="flex" alignItems="center" gap={2}>
          <FaStar /> {(event.rating).toFixed(1).replace(".", ",")}
        </Text>
        <Box display="flex" gap={4}>
          <Button
            bgColor="transparent"
            color="#A0ACB2"
            cursor="pointer"
            _hover={{ bgColor: "transparent" }}
            onClick={() => setIsOpen(true)}
          >
            Adicionar
          </Button>
          <Button color="#A0ACB2" bgColor="transparent" disabled>
            Ver todas
          </Button>
        </Box>
      </Box>    
    </Box>
  );
}
