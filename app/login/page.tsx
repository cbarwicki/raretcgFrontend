// import LoginForm from './LoginForm';
import LoginForm from "@/app/login/loginForm";

// TODO: Cache Components adoption. Refactor this route so this opt-out can be removed.
// See: https://nextjs.org/docs/app/guides/migrating-to-cache-components
// export const instant = false;

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <h1 className="text-4xl font-bold mb-8 text-gray-900">Login</h1>
      <LoginForm />
    </div>
  );
}

