import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Todos os campos são obrigatórios' }, { status: 400 });
    }

    await client.connect();
    const db = client.db('meu_banco'); // Troque pelo nome do seu banco
    const users = db.collection('users');

    const existingUser = await users.findOne({ email });

    if (existingUser) {
      return NextResponse.json({ error: 'Usuário já cadastrado' }, { status: 400 });
    }

    await users.insertOne({ name, email, password });

    return NextResponse.json({ message: 'Usuário cadastrado com sucesso!' }, { status: 201 });
  } catch (error) {
    console.error('Erro no registro:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  } finally {
    await client.close();
  }
}
