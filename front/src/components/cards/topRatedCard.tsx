import { Box, Heading, Text, Icon, Flex } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { FaStar } from "react-icons/fa";
import { getIconForCategory } from "../../utils/getIconForCategory";
import { capitalizeFirstLetterOfEachWord } from "@/utils/captalizeFirstLetterOfEachWorld";

export interface Event {
  name: string;
  category: string;
  rating: number;
  image: string;
  id: string
}

interface EventProps {
  event: Event;
}

export function TopRatedCard({ event }: EventProps) {
  
  return (
    <Link href={`/events/${event.id}`} passHref>
      <Box
         as="a"
         bg="white"
         borderRadius="16px"
         boxShadow="lg"
         overflow="hidden"
         position="relative"
         height="266px"
         width="256px"
         display="flex"
         flexDirection="column"
         justifyContent="center"
         cursor="pointer"
         transition="transform 0.2s ease-in-out"
         _hover={{ transform: "scale(1.05)" }}
      >
        <Image
          src={event.image}
          alt={event.name}
          width={500}
          height={150}
          style={{ objectFit: "cover" }}
        />
        <Box
          position="absolute"
          top="10px"
          left="10px"
          bg="#F25D27"
          borderRadius="8px"
          p="14px"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={FaStar} color="white" boxSize="16px" />
          <Text color="white" fontSize="sm" fontWeight="bold" mt="4px">
            {(event.rating).toFixed(1).replace(".", ",")}
          </Text>
        </Box>

        <Box>
          <Flex align="center" mb={2}></Flex>
          <Heading as="h3" size="md" marginBlock={4} color="blue.900"
            
            marginInline="1.5rem 6px"
           
            fontSize="1.25rem"
          >
            {capitalizeFirstLetterOfEachWord(event.name)}
          </Heading>
          <Box borderBottom="1px solid" borderColor="#DCE2E5"></Box>
          <Text
            color="#617480"
            paddingInline="24px 0px"
            marginBlock={5}
            paddingBottom={5}
            display="flex"
            alignItems="center"
          >
            {capitalizeFirstLetterOfEachWord(event.category.replace(/_/g, " "))}
            <Icon
              boxSize="20px"
              ml="auto"
              marginInline="45px"
              as={getIconForCategory(event.category)}  // O ícone será mostrado aqui
              color="orange.400"
              mr={2}
            />
          </Text>
        </Box>
      </Box>
    </Link>
  );
}
