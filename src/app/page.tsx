'use client'

import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-200">
      <header className="bg-blue-900 text-white py-4 px-8 shadow-md">
        <nav className="flex justify-between items-center">
          <h1 className="text-xl font-bold">Wequit</h1>
          <div className="space-x-4">
            <Link href="/" className="hover:underline">Home</Link>
            <Link href="/login" className="hover:underline">Login</Link>
            <Link href="/register" className="hover:underline">Cadastro</Link>
            <Link href="/estoque" className="hover:underline">Estoque</Link>
          </div>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center text-center px-6 py-20">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Bem-vindo(a) à sua jornada empreendedora</h2>
        <p className="text-lg text-gray-700 max-w-2xl">
          Cada passo que você dá é uma semente plantada no solo fértil dos seus sonhos. Esta plataforma foi feita para apoiar microempreendedores como você,
          oferecendo ferramentas simples e eficazes para que seu negócio cresça com mais organização, controle e confiança. Vamos transformar seu esforço diário
          em grandes conquistas!
        </p>
      </main>
    </div>
  )
}
