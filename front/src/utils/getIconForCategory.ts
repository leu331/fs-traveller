import { FaCamera, FaUtensils, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";

export function getIconForCategory(category: string) {
  const categoryFormatted = category.replace(/_/g, " ").toLowerCase();
  switch (category) {
    case 'comida_e_bebida':
      return FaUtensils;
    case 'pontos_turisticos':
      return FaCamera;
    case 'eventos_organizados':
      return FaCalendarAlt;
    default:
      return FaMapMarkerAlt;
  }
};
