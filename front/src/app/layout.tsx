import  Layout  from "@/components/layout/layout";  // Importando com a sintaxe normal

import { ChakraProvider } from "@chakra-ui/react";
import type { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Traveler",
  description: "Avaliações de locais turísticos e eventos",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ backgroundColor: "#F5F8FA" }}>
        <ChakraProvider>
          <Layout>{children}</Layout>  
        </ChakraProvider>
      </body>
    </html>
  );
}
