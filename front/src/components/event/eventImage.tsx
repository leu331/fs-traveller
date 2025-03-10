import { getIconForCategory } from "@/utils/getIconForCategory";
import { Box, Image, Icon } from "@chakra-ui/react";

interface EventImageProps {
  image: string;
  category: string;
}

export function EventImage({ category, image }: EventImageProps) {
  const IconComponent = getIconForCategory(category);
  return (
    <Box flex={1} maxW="50%" height="704px" position="relative">
      <Image position="relative" width="100%" height="100%" objectFit="cover" borderRadius="16px" src={image} />
      {IconComponent && (
        <Icon
          as={IconComponent}
          position="absolute"
          top="20px"
          right="20px"
          boxSize="48px"
          color="#F25D27"
          bgColor="white"
          borderRadius="16px"
          p="12px"
        />
      )}
    </Box>
  );
}
