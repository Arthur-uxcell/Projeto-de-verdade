'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type Produto = {
  id: number
  nome: string
  quantidade: number
}

type FormData = {
  nome: string
  quantidade: number
}

export default function EstoquePage() {
  const [produtos, setProdutos] = useState<Produto[]>([])
  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [novaQuantidade, setNovaQuantidade] = useState<number>(0)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>()

  const adicionarProduto = (data: FormData) => {
    const novoProduto: Produto = {
      id: Date.now(),
      nome: data.nome,
      quantidade: data.quantidade,
    }

    setProdutos([...produtos, novoProduto])
    reset()
  }

  const removerProduto = (id: number) => {
    setProdutos(produtos.filter((produto) => produto.id !== id))
  }

  const iniciarEdicao = (produto: Produto) => {
    setEditandoId(produto.id)
    setNovaQuantidade(produto.quantidade)
  }

  const salvarEdicao = (id: number) => {
    setProdutos(produtos.map(produto =>
      produto.id === id ? { ...produto, quantidade: novaQuantidade } : produto
    ))
    setEditandoId(null)
  }

  const cancelarEdicao = () => {
    setEditandoId(null)
  }

  return (
    <div className="min-h-screen bg-gray-200 p-8">
      <div className="max-w-xl mx-auto bg-gray-100 p-6 rounded-2xl shadow-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Estoque de Produtos</h1>

        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit(adicionarProduto)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome do produto</label>
            <input
              {...register('nome', { required: 'Nome é obrigatório' })}
              className="w-full mt-1 px-4 py-2 border rounded-xl border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            {errors.nome && <p className="text-red-600 text-sm">{errors.nome.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Quantidade</label>
            <input
              type="number"
              {...register('quantidade', {
                required: 'Quantidade é obrigatória',
                min: { value: 1, message: 'No mínimo 1' },
              })}
              className="w-full mt-1 px-4 py-2 border rounded-xl border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            {errors.quantidade && (
              <p className="text-red-600 text-sm">{errors.quantidade.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-xl hover:bg-blue-900 transition"
          >
            Adicionar Produto
          </button>
        </form>

        {/* Lista de produtos */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Produtos cadastrados</h2>

          {produtos.length === 0 ? (
            <p className="text-gray-700">Nenhum produto no estoque.</p>
          ) : (
            <ul className="space-y-2">
              {produtos.map((produto) => (
                <li
                  key={produto.id}
                  className="flex justify-between items-center bg-gray-300 p-3 rounded-xl"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{produto.nome}</p>

                    {editandoId === produto.id ? (
                      <div className="flex items-center mt-1 space-x-2">
                        <input
                          type="number"
                          value={novaQuantidade}
                          onChange={(e) => setNovaQuantidade(parseInt(e.target.value))}
                          className="w-24 px-2 py-1 border rounded-xl border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
                        />
                        <button
                          onClick={() => salvarEdicao(produto.id)}
                          className="text-green-700 hover:underline text-sm"
                        >
                          Salvar
                        </button>
                        <button
                          onClick={cancelarEdicao}
                          className="text-gray-700 hover:underline text-sm"
                        >
                          Cancelar
                        </button>
                      </div>
                    ) : (
                      <p className="text-sm text-gray-700">
                        Quantidade: {produto.quantidade}
                      </p>
                    )}
                  </div>

                  {editandoId !== produto.id && (
                    <div className="flex space-x-3">
                      <button
                        onClick={() => iniciarEdicao(produto)}
                        className="text-blue-800 hover:underline text-sm"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => removerProduto(produto.id)}
                        className="text-red-600 hover:underline text-sm"
                      >
                        Remover
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}