
import LoginForm from "@/components/auth/login-form";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="w-full max-w-md">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-300 mb-5">
            BJJ Batalha de Cartas
          </h1>
        </div>
        
        <LoginForm />
        
      </div>
    </div>
  );
}