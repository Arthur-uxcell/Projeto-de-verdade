'use client'

import { useProdutos } from '@/context/produtoscontext'
import Header from '@/components/header'

export default function Home() {
  const { produtos } = useProdutos()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-gray-900 p-8">
        <h2 className="text-3xl font-bold mb-6">Produtos Cadastrados</h2>

        <p className="text-lg text-gray-800 mb-8 leading-relaxed">
          Ser microempreendedor é uma jornada desafiadora, mas também repleta de oportunidades. 
          Cada produto que você cadastra aqui representa não apenas mais um item no seu estoque, 
          mas também um passo firme na construção do seu sonho e no fortalecimento do seu negócio. 
          Lembre-se: grandes histórias de sucesso começam com pequenos começos, com dedicação diária 
          e a coragem de acreditar que é possível transformar ideias em realizações concretas. 
          Estamos ao seu lado nessa caminhada!
        </p>

        {produtos.length === 0 ? (
          <p className="text-gray-700 text-lg">Nenhum produto cadastrado.</p>
        ) : (
          <ul className="space-y-2">
            {produtos.map((produto) => (
              <li key={produto.id} className="bg-gray-100 p-4 rounded-xl shadow-sm text-gray-900">
                <strong className="font-semibold">{produto.nome}</strong> — {produto.quantidade}
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  )
}
