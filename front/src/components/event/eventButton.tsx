import { formatPhoneNumberForDisplay, formatPhoneNumberForWhatsApp } from "@/utils/formatPhoneNumber";
import { Box, Button, Text } from "@chakra-ui/react";
import { IoLogoWhatsapp } from "react-icons/io";

interface EventButtonProps {
  phone?: string;
}

export function EventButton({ phone }: EventButtonProps) {
  return (
    <Box mt={10} display="flex" alignItems="center" gap={8}>
      {phone ? (
        <>
          <Button
            padding="26px 32px"
            display="flex"
            alignItems="center"
            gap={3}
            bgColor="#51B853"
            as="a"
            href={`https://wa.me/${formatPhoneNumberForWhatsApp(phone)}`}
            target="_blank"
          >
            <IoLogoWhatsapp color="white" />
            <Text color="white"> Entrar em contato</Text>
          </Button>

          <Box>
            <Text color="#617480" lineHeight="26px">Telefone</Text>
            <Text color="#123952" lineHeight="30px" fontSize="20px" fontWeight="600">
              {formatPhoneNumberForDisplay(phone)}
            </Text>
          </Box>
        </>
      ) : (
        <Text> Telefone indisponível para este evento</Text>
      )}
    </Box>
  );
}
