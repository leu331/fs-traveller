import { FaCamera, FaUtensils, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export const getIconForCategory = (category: string) => {
  switch (category) {
    case 'Comida e Bebida':
      return FaUtensils;
    case 'Pontos Turísticos':
      return FaCamera;
    case 'Eventos Organizados':
      return FaCalendarAlt;
    default:
      return FaMapMarkerAlt; // ícone padrão, caso a categoria não corresponda a nenhum dos casos
  }
};
