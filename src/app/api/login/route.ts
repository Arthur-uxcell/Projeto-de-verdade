
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  if (!email || !password) {
    return NextResponse.json({ message: 'Email e senha são obrigatórios' }, { status: 400 })
  }

  // Simulação de verificação
  if (email === 'admin@teste.com' && password === '123456') {
    return NextResponse.json({ message: 'Login autorizado' }, { status: 200 })
  } else {
    return NextResponse.json({ message: 'Credenciais inválidas' }, { status: 401 })
  }
}
