import { redirect } from 'next/navigation';

export default function HomePage() {
  // Redireciona para login ou dashboard baseado na autenticação
  redirect('/login');
  
  return null;
}