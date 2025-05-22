'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Produto = {
  id: number
  nome: string
  quantidade: number
}

type FormData = {
  nome: string
  quantidade: number
}

type ProdutosContextType = {
  produtos: Produto[]
  adicionarProduto: (data: FormData) => void
  editarProduto: (id: number, novaQuantidade: number) => void
  removerProduto: (id: number) => void
}

const ProdutosContext = createContext<ProdutosContextType | undefined>(undefined)

export function ProdutosProvider({ children }: { children: ReactNode }) {
  const [produtos, setProdutos] = useState<Produto[]>([])

  const adicionarProduto = (data: FormData) => {
    const novoProduto: Produto = {
      id: Date.now(),
      nome: data.nome,
      quantidade: data.quantidade
    }
    setProdutos(prev => [...prev, novoProduto])
  }

  const editarProduto = (id: number, novaQuantidade: number) => {
    setProdutos(prev =>
      prev.map(produto =>
        produto.id === id ? { ...produto, quantidade: novaQuantidade } : produto
      )
    )
  }

  const removerProduto = (id: number) => {
    setProdutos(prev => prev.filter(produto => produto.id !== id))
  }

  return (
    <ProdutosContext.Provider value={{ produtos, adicionarProduto, editarProduto, removerProduto }}>
      {children}
    </ProdutosContext.Provider>
  )
}

export function useProdutos() {
  const context = useContext(ProdutosContext)
  if (!context) {
    throw new Error('useProdutos deve ser usado dentro de ProdutosProvider')
  }
  return context
}
