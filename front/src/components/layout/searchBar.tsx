import { Input, Box, InputGroup, InputLeftElement, Heading, Button, Flex } from "@chakra-ui/react";
import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  turnBack: () => void;
  title: string;
}

export  function SearchBar({ onSearch, turnBack, title }: SearchBarProps) {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    onSearch(query);
  };

  return (
    <Box w="100%" maxW="500px" mx="auto">
      <Flex justify="center">
        <Heading as="h3" size="lg" color="blue.900">{title}</Heading>
      </Flex>

      <InputGroup>
        <InputLeftElement ml="8px" pointerEvents="none" display="flex"  _focus={{color: "#F25D27"}} justifyContent="center" h="100%">
          <MagnifyingGlass size={20} color="#A0ACB2" fontWeight="bold" />
        </InputLeftElement>
        <Input
          placeholder="Pesquise a cidade"
          color="#A0ACB2"
          value={search}
          onChange={handleSearch}
          size="lg"
          border="1px solid"
          borderColor="#DCE2E5"
          bg="#F5F8FA"
          _focus={{  }}
        />
      </InputGroup>
    </Box>
  );
}
