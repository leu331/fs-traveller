"use client";

import Image from "next/image";
import logoSvg from "../../assets/Logo.png";
import { Box, Button, Container, Flex, Link, Spacer } from "@chakra-ui/react";
import {SearchBar} from "../layout/searchBar";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";

interface HeaderProps {
  showSearchBar?: boolean;
  onSearch?: (query: string) => void;
  turnBack?: () => void;
  title?: string;
  showButton?: boolean;
}

export function Header({ showSearchBar = false, onSearch, title, turnBack, showButton = false }: HeaderProps) {
  const router = useRouter();

  function handleTurnBack() {
    window.history.back();
  }

  return (
    <Box as="header" position="fixed" top={0} left={0} right={0} bg="white" boxShadow="sm" zIndex={1000}>
      <Container maxW="90rem" py={4}>
        <Flex align="center">
          <Link href="/">
            <Image src={logoSvg} alt="Logo" width={150} height={50} />
          </Link>
          {turnBack && (
            <Button bg="transparent" border="1px solid" borderColor="#DCE2E5" borderRadius="10px" ml="34px" onClick={handleTurnBack}>
              <FaArrowLeft size=".9rem" color="#A0ACB2" />
            </Button>
          )}
          {title && (
            <Box position="absolute" left="50%" transform="translateX(-50%)" textAlign="center">
              <Box as="h2" fontSize="xl" fontWeight="bold" color="gray.700">
                {title}
              </Box>
            </Box>
          )}
          <Box flex="1" display="flex" justifyContent="center">
            {showSearchBar && <SearchBar title="" turnBack={handleTurnBack} onSearch={onSearch ?? (() => {})} />}
          </Box>
          {showButton && (
            <Button colorScheme="blue" backgroundColor="#DDE9F0" variant="outline">
              Acesso restrito
            </Button>
          )}
        </Flex>
      </Container>
    </Box>
  );
}
