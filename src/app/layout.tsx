import './globals.css'
import { ProdutosProvider } from '@/context/produtoscontext'

export const metadata = {
  title: 'Estoque App',
  description: 'Gerenciamento de produtos',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <ProdutosProvider>
          {children}
        </ProdutosProvider>
      </body>
    </html>
  )
}
