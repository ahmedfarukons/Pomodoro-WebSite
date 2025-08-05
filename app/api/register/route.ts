import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const usersFile = path.join(process.cwd(), 'users.json');

export async function POST(req: NextRequest) {
  const { name, email, password } = await req.json();
  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Tüm alanlar zorunlu.' }, { status: 400 });
  }
  let users = [];
  if (fs.existsSync(usersFile)) {
    users = JSON.parse(fs.readFileSync(usersFile, 'utf-8'));
  }
  if (users.find((u: any) => u.email === email)) {
    return NextResponse.json({ error: 'Bu e-posta ile zaten kayıtlı bir kullanıcı var.' }, { status: 400 });
  }
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password
  };
  users.push(newUser);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  return NextResponse.json({ success: true });
} 