import { Input, Box, InputGroup, InputLeftElement, Heading, Button, Flex } from "@chakra-ui/react";
import { MagnifyingGlass } from "phosphor-react"; // Ícone de busca
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
  turnBack: () => void;
  title: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, turnBack, title }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearch(query);
    onSearch(query);
  };

  return (
    <Box w="100%" maxW="500px" mx="auto" my={6}>
      {/* Flex para o título centralizado */}
      <Flex justify="center" mb={4}>
        <Heading as="h3" size="lg" color="blue.900">{title}</Heading>
      </Flex>

      <InputGroup>
        <InputLeftElement
          ml="8px"
          pointerEvents="none"
          display="flex"
          justifyContent="center"
          h="100%" 
        >
          <MagnifyingGlass size={20} color="#F25D27" fontWeight="bold"/>
        </InputLeftElement>
        <Input
          placeholder="Pesquise a cidade"
          value={search}
          onChange={handleSearch}
          size="lg"
          borderRadius="full"
          bg="gray.100"
          _focus={{ borderColor: "blue.500", boxShadow: "outline" }}
        />
      </InputGroup>

      {/* Flex para o botão ao lado da logo */}
      {search && (
        <Flex justify="flex-start" mt={4}>
          <Button
            colorScheme="blue"
            variant="outline"
            onClick={turnBack}
            w="auto"
            borderRadius="full"
          >
            Voltar
          </Button>
        </Flex>
      )}
    </Box>
  );
};

export default SearchBar;
