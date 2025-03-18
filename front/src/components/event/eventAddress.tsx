import { Box, Button, Heading, Text } from "@chakra-ui/react";

interface EventAddressProps {
  address: string | undefined;
}

export function EventAddress({ address }: EventAddressProps) {
  return (
    <>
      <Box mt={20} mb={4} display="flex" alignItems="center" justifyContent="space-between">
        <Heading color="#123952">Endereço</Heading>
        {address ? (
          <Button
            mt={0}
            as="a"
            href={`https://www.google.com/maps?q=${encodeURIComponent(address)}`}
            target="_blank"
            background="transparent"
            color="#A0ACB2"
            _hover={{ bgColor: "transparent" }}
          >
            Ver no Google Maps
          </Button>
        ) : (
          <Text>Endereço não disponível</Text>
        )}
      </Box>
      <Box borderBottom="1px solid #DCE2E5" mt={4} />
      <Box mt={8}>
        {address ? (
          <iframe
            width="100%"
            height="164px"
            frameBorder="0"
            style={{ border: 0, borderRadius: "16px" }}
            src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&hl=pt&z=15&output=embed`}
            allowFullScreen
          ></iframe>
        ) : (
          <Text>Endereço não disponível para exibição no mapa.</Text>
        )}
      </Box>
      <Box>
        {address ? (
          <Text mt={6} lineHeight="26px" color="#617480">{address}</Text>
        ) : (
          <Text>Endereço não encontrado</Text>
        )}
      </Box>
    </>
  );
}
