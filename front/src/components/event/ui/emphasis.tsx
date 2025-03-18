import { capitalizeFirstLetterOfEachWord } from "@/utils/captalizeFirstLetterOfEachWorld";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import Image from 'next/image';
import Link from "next/link";
import { FiAlertCircle } from "react-icons/fi";

interface Emphasi {
    name: string;
    description: string;
    image: string; 
    id: string;
}

interface EmphasiProps {
    emphasi: Emphasi;
}

export default function Emphasis({ emphasi }: EmphasiProps) {
  return (
    <Link href={`/events/${emphasi.id}`} style={{ textDecoration: "none" }}>
      <Flex alignItems="center" mt="4rem" h="284px" cursor="pointer">
        {/* Box do texto */}
        <Box
          border="1px solid"
          borderColor="#DCE2E5"
          bgColor="white"
          borderBottomLeftRadius="1rem"
          borderTopLeftRadius="1rem"
          w="72%"
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          padding="46px 60px 46px 64px"
        >
          <Text
            display="flex"
            alignItems="center"
            gap="6px"
            backgroundColor="#F25D27"
            maxWidth="130px"
            color="white"
            padding="8px 16px"
            mt="46px"
            borderRadius="100px"
          >
            <FiAlertCircle size="20px" />
            Destaque
          </Text>

          <Heading as="h3" fontWeight="600" marginBlock="22px" color="#123952">
            {capitalizeFirstLetterOfEachWord(emphasi.name)}
          </Heading>

          <Text pb="46px">{emphasi.description}</Text>
        </Box>

        <Box 
          w="55%" 
          h="100%" 
          overflow="hidden" 
          borderTopRightRadius="1rem" 
          borderBottomRightRadius="1rem"
        >
          <Image
            src={emphasi.image}  
            alt={emphasi.name}
            width={700}
            height={284}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </Box>
      </Flex>
    </Link>
  );
}
