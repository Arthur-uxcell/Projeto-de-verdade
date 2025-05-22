'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useProdutos } from '@/context/produtoscontext'
import Header from '@/components/header'

type FormData = {
  nome: string
  quantidade: number
}

export default function EstoquePage() {
  const { produtos, adicionarProduto, editarProduto, removerProduto } = useProdutos()

  const [editandoId, setEditandoId] = useState<number | null>(null)
  const [novaQuantidade, setNovaQuantidade] = useState<number>(0)

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>()

  const onSubmit = (data: FormData) => {
    adicionarProduto(data)
    reset()
  }

  const iniciarEdicao = (id: number, quantidade: number) => {
    setEditandoId(id)
    setNovaQuantidade(quantidade)
  }

  const salvarEdicao = (id: number) => {
    editarProduto(id, novaQuantidade)
    setEditandoId(null)
  }

  const cancelarEdicao = () => {
    setEditandoId(null)
  }

  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-gray-900 p-8">
        <div className="max-w-xl mx-auto bg-gray-50 p-6 rounded-2xl shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Estoque de Produtos</h1>

          {/* Formulário */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nome do produto</label>
              <input
                {...register('nome', { required: 'Nome é obrigatório' })}
                className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
              {errors.nome && <p className="text-red-700 text-sm">{errors.nome.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium">Quantidade</label>
              <input
                type="number"
                {...register('quantidade', {
                  required: 'Quantidade é obrigatória',
                  min: { value: 1, message: 'No mínimo 1' },
                })}
                className="w-full mt-1 px-4 py-2 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800"
              />
              {errors.quantidade && (
                <p className="text-red-700 text-sm">{errors.quantidade.message}</p>
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
            <h2 className="text-lg font-semibold mb-4">Produtos cadastrados</h2>
            {produtos.length === 0 ? (
              <p className="text-gray-700">Nenhum produto no estoque.</p>
            ) : (
              <ul className="space-y-2">
                {produtos.map((produto) => (
                  <li
                    key={produto.id}
                    className="flex justify-between items-center bg-gray-100 p-3 rounded-xl shadow-sm"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{produto.nome}</p>
                      {editandoId === produto.id ? (
                        <div className="flex items-center mt-1 space-x-2">
                          <input
                            type="number"
                            value={novaQuantidade}
                            onChange={(e) => setNovaQuantidade(Number(e.target.value))}
                            className="w-24 px-2 py-1 border border-gray-400 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-800"
                          />
                          <button
                            onClick={() => salvarEdicao(produto.id)}
                            className="text-green-700 hover:underline text-sm"
                          >
                            Salvar
                          </button>
                          <button
                            onClick={cancelarEdicao}
                            className="text-gray-800 hover:underline text-sm"
                          >
                            Cancelar
                          </button>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-800">
                          Quantidade: {produto.quantidade}
                        </p>
                      )}
                    </div>

                    {editandoId !== produto.id && (
                      <div className="flex space-x-3">
                        <button
                          onClick={() => iniciarEdicao(produto.id, produto.quantidade)}
                          className="text-blue-900 hover:underline text-sm"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => removerProduto(produto.id)}
                          className="text-red-700 hover:underline text-sm"
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
    </>
  )
}
