export function formatPhoneNumberForDisplay(phone: string | number): string {
  const phoneStr = phone.toString().replace(/\D/g, ''); 
  if (phoneStr.length !== 11) return "Telefone inválido";
  return `(${phoneStr.slice(0, 2)}) ${phoneStr.slice(2, 7)}-${phoneStr.slice(7)}`;
};

export function formatPhoneNumberForWhatsApp(phone: string | number): string {
  const phoneStr = phone.toString().replace(/\D/g, ''); 
  if (phoneStr.length !== 11) return "Telefone inválido"; 
  return `+55${phoneStr}`;
};
