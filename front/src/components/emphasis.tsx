import { Flex, Box, Heading, Text, Icon } from "@chakra-ui/react";
import Image from 'next/image';
import { FiAlertCircle } from "react-icons/fi";
import emphasisPng from "../../public/assets/emphasisImage.png";

interface Emphasi {
    name: string,
    description: string
}

interface EmphasiProps {
    emphasi: Emphasi
}

const Emphasis = ({ emphasi }: EmphasiProps) => (
  <Flex alignItems="center" mt="4rem" h="284px">
    <Box
      border="1px solid"
      borderColor="#DCE2E5"
      bgColor="white"
      borderBottomLeftRadius="1rem"
      borderTopLeftRadius="1rem"
      maxW="520px"
      height="100%" 
      display="flex"
      flexDirection="column"
      justifyContent="center"
      padding="46px 60px 46px 64px"
    >
      <Text display="flex" alignItems="center" gap="6px" backgroundColor="#F25D27" color="white" padding="8px 16px" mt="46px" borderRadius="100px">
        <FiAlertCircle size="20px" />
        Destaque
      </Text>

      <Heading as="h3" fontWeight="500" marginBlock="32px 16px">{emphasi.name}</Heading>
      <Text pb="46px">{emphasi.description}</Text>
    </Box>

    <Box height="100%" display="flex" alignItems="center">
      <Image src={emphasisPng} alt="Emphasis Image" width={600} height={286} objectFit="cover" />
    </Box>
  </Flex>
);

export default Emphasis;
