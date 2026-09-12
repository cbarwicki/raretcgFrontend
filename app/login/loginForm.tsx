'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
// import { jwtDecode } from 'jwt-decode';
import { useAuth } from '@/app/context/AuthContext'

export default function LoginForm() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // const [user, setUser] = useState('');

  const router = useRouter();
  const { user, login } = useAuth();

  // useEffect(() => {
  //   const fetchMe = async () => {
  //     try {
  //       const res = await axios.get("http://localhost:8000/api/users/me");
  //       setUser(res.data.user);
  //     } catch (err) {
  //       // not logged in; ignore
  //     }
  //   };
  //   fetchMe();
  // }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = (e: React.MouseEvent<HTMLButtonElement>) => {
    router.push(`/signup`);
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
        form
      );
      const data = await res;

      login(data.data.token);
      // localStorage.setItem("token", data.data.token)
      // const decoded = jwtDecode(data.data.token)
      console.log(user)

      // the following console log has an error where it will sometimes log the previous users information
      console.log('Login Successful')
      console.log(`Email: ${user?.email}`)
      console.log(`User ID: ${user?.userId}`)
      router.push('/all-cards')

      // if (!res.ok) throw new Error(data.error || 'Login failed');

    } catch (err: any) {
      setMessage(err.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 w-full max-w-md p-8 bg-white border border-gray-200 rounded-lg shadow-xl"
    >
      <div className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Logging in…' : 'Login'}
      </button>

      <button
        onClick={handleSignup}
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Sign up
      </button>

      {message && (
        <p className={`text-center mt-2 p-3 rounded-lg ${
          message.includes('✅') 
            ? 'bg-green-50 text-green-800 border border-green-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {message}
        </p>
      )}
    </form>
  );
}
