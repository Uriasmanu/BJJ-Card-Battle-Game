import { RegisterForm } from "@/components/auth/register-form";


export default function RegisterPage() {
  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-amber-300 mb-2">
          BJJ Card Battle
        </h1>
        <p className="text-gray-400">Faça login em sua conta</p>
      </div>
      
      <RegisterForm />
      
      <div className="text-center">
        <p className="text-gray-400">
          Não tem uma conta?{" "}
          <a href="/register" className="text-amber-300 hover:underline">
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}