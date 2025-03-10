"use client"
import { Box, Button, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import happyEmojiPng from "../../assets/happyEmojiPng.png";
import Image from "next/image";

export function ThankYouPage() {
  const router = useRouter();

  return (
    <Box
      bgColor="#123952"
      w="100%"
      h="calc(100vh - 22px)"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      overflow="hidden"
    >
      <Container
        maxW="container.sm"
        display="flex"
        justifyContent="center"
        alignItems="center"
        textAlign="center"
        flex="1"
        p={6}
        overflow="hidden"
      >
        <VStack spacing={8} w="100%" align="center" justify="center">
          <Box display="flex" justifyContent="center" borderRadius="50%" p={4}>
            <Image
              src={happyEmojiPng}
              alt="emoji sorrindo"
              width={120}
              height={120}
            />
          </Box>
          <Heading size="2xl" color="white" fontWeight="bold">
            Avaliação enviada!
          </Heading>
          <Text fontSize="lg" color="white" maxWidth="350px">
            Agradecemos pelo seu tempo e colaboração. Sua opinião é muito importante para nós.
          </Text>
          <Button
            bgColor="#F25D27"
            color="white"
            size="lg"
            fontWeight="bold"
            onClick={() => router.push("/")}
            _hover={{ bg: "#e64c18" }}
            paddingInline={8}
            paddingBlock={4}
            borderRadius="12px"
            w="fit-content"
            mt={6}
          >
            Disponha
          </Button>
        </VStack>
      </Container>
    </Box>
  );
}
