import { Box, Heading, Text, Flex, Icon } from "@chakra-ui/react";

interface InfoCardProps {
    icon: React.ElementType,
    number: number,
    label: string
}

const InfoCard = ({ icon, number, label }: InfoCardProps) => (
  <Flex
    p={6}
    bg="white"
    borderRadius="20px"
    align="flex-start"
    justify="flex-start"
    direction="column"
    height="260px"
    textAlign="left"
    position="relative"
    border="1px solid"
    borderColor="#DCE2E5"
  >
    <Box
      mb={3}
      borderBottom="1px solid"
      borderColor="#DCE2E5"
      pb={3}
      width="calc(100% + 12px)"
      marginLeft="-6px"
    >
      <Icon as={icon} boxSize={8} color="orange.400" />
    </Box>

    <Heading size="lg" fontWeight="600" fontSize="2.5rem" mb={2} mt="32px" textAlign="left">{number}</Heading>
    <Text color="gray.600" textAlign="left">{label}</Text>
  </Flex>
);

export default InfoCard;
