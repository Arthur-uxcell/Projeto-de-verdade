// components/Header.tsx
'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-blue-800 text-white px-6 py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Wequit</h1>
        <nav className="space-x-4">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/estoque" className="hover:underline">
            Estoque
          </Link>
          <Link href="/register" className="hover:underline">
          Cadastro
          </Link>
          <Link href="/login" className="hover:underline">
            Login
          </Link>
        </nav>
      </div>
    </header>
  )
}
