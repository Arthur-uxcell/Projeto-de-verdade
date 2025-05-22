'use client'

import { useProdutos } from '@/context/produtoscontext'
import Header from '@/components/header'

export default function Home() {
  const { produtos } = useProdutos()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-900 p-8">
        <h2 className="text-2xl font-bold mb-4">Produtos Cadastrados</h2>
        {produtos.length === 0 ? (
          <p className="text-gray-700">Nenhum produto cadastrado.</p>
        ) : (
          <ul className="space-y-2">
            {produtos.map((produto) => (
              <li key={produto.id} className="bg-gray-100 p-4 rounded-xl shadow-sm">
                <strong>{produto.nome}</strong> — {produto.quantidade}
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}
