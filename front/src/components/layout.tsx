// src/components/Layout.tsx
import { Box, Container, Flex } from "@chakra-ui/react";
import { ReactNode } from "react";
import Header from "./header";


interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <Flex direction="column" minH="100vh">
      <Header />
      <Container maxW="6xl" flex="1" py={6}>
        {children}
      </Container>
    </Flex>
  );
}
