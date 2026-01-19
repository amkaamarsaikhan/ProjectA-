import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link нэмсэн
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Энд 'Amka' гэж хатуу бичихгүйгээр, localStorage-д байгаа бол 
    // тэр мэдээллийг авдаг логик дараа нь нэмж болно.
    login({ name: 'Amka', email: email }); 
    
    // Нүүр хуудас руу шилжинэ. Хэрэв '/profile' руу явуулмаар байвал '/' -ыг сольж болно.
    navigate('/'); 
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50/50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Welcome Back</h2>
          <p className="text-slate-500 mt-2 font-medium">Log in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="email" required placeholder="Email address"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="password" required placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all active:scale-[0.98]">
            Sign In <ArrowRight size={20} />
          </button>
        </form>

        {/* Энэ хэсэг таны асуусан Sign Up хэсэг рүү очих линк юм */}
        <div className="mt-8 text-center font-medium">
          <p className="text-slate-500">
            Don't have an account?{' '}
            <Link to="/signup" className="text-green-600 hover:text-green-700 font-bold underline underline-offset-4">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;