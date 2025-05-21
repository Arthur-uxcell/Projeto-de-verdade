'use client'

import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type FormData = {
  name: string
  email: string
  password: string
}

export default function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    setLoading(true)

    // Simula envio para API
    await new Promise(res => setTimeout(res, 1000))
    alert(`Usuário cadastrado:\n${JSON.stringify(data, null, 2)}`)

    setLoading(false)
    router.push('/login') // redireciona após cadastro
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="bg-gray-100 p-8 rounded-2xl shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Cadastro</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nome</label>
            <input
              {...register("name", { required: "Nome é obrigatório" })}
              className="mt-1 block w-full px-4 py-2 border rounded-xl border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            {errors.name && <p className="text-red-600 text-sm">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              {...register("email", { required: "Email é obrigatório" })}
              className="mt-1 block w-full px-4 py-2 border rounded-xl border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            {errors.email && <p className="text-red-600 text-sm">{errors.email.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Senha</label>
            <input
              type="password"
              {...register("password", {
                required: "Senha é obrigatória",
                minLength: { value: 6, message: "Mínimo de 6 caracteres" }
              })}
              className="mt-1 block w-full px-4 py-2 border rounded-xl border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
            />
            {errors.password && <p className="text-red-600 text-sm">{errors.password.message}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-800 text-white py-2 px-4 rounded-xl hover:bg-blue-900 transition"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  )
}
