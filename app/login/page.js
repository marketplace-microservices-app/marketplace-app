import LoginForm from "@/components/login-form";

export default function LoginPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-2 text-center">Sign In</h1>
        <p className="text-muted-foreground text-center mb-6">
          Enter your credentials to access your account
        </p>
        <div className="border rounded-lg p-6 shadow-sm">
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
