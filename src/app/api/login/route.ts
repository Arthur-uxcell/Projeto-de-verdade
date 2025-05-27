import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import bcrypt from 'bcrypt'

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    const client = await clientPromise
    const db = client.db()

    const user = await db.collection('users').findOne({ email })

    if (!user) {
      return NextResponse.json({ message: 'Usuário não encontrado' }, { status: 404 })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Senha incorreta' }, { status: 401 })
    }

    return NextResponse.json({ message: 'Login realizado com sucesso' }, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: 'Erro no servidor' }, { status: 500 })
  }
}
