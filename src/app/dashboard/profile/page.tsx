
import LoginForm from "@/components/auth/login-form";
import ProfileComponent from "@/components/profileComponent";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-900 to-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-300 mb-2">
            Informações Jogador
          </h1>
        </div>
        
        <ProfileComponent />
        
      </div>
    </div>
  );
}