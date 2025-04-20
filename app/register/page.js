import RegisterForm from "@/components/register-form";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Create an Account
        </h1>
        <RegisterForm />
      </div>
    </div>
  );
}
