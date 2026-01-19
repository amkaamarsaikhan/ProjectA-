import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  // AuthContext-өөс signup функцийг авна
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // 1. Нууц үг шалгах
    if (formData.password !== formData.confirmPassword) {
      setError("Нууц үг хоорондоо таарахгүй байна!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.");
      return;
    }

    try {
      setLoading(true);
      // 2. Firebase рүү бүртгүүлэх хүсэлт илгээх
      await signup(formData.email, formData.password, formData.name);
      
      // Амжилттай болвол нүүр хуудас руу шилжих
      navigate('/');
    } catch (err) {
      console.error(err);
      // Алдааны мессежийг хэрэглэгчид ойлгомжтой харуулах
      if (err.code === 'auth/email-already-in-use') {
        setError('Энэ и-мэйл хаяг аль хэдийн бүртгэгдсэн байна.');
      } else {
        setError('Бүртгэл амжилтгүй боллоо. Дахин оролдоно уу.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50/50 py-12 px-4">
      <div className="max-w-md w-full bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 rounded-2xl bg-green-50 text-green-600 mb-4">
            <CheckCircle2 size={28} />
          </div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tight">Create Account</h2>
          <p className="text-slate-500 mt-2 font-medium">Join ProjectA+ to find scholarships</p>
        </div>

        {/* Алдааны мессеж харуулах хэсэг */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-600 text-xs font-bold rounded-r-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Full Name */}
          <div className="relative group">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
            <input
              type="text"
              required
              placeholder="Full Name"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
            <input
              type="email"
              required
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
            <input
              type="password"
              required
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
            />
          </div>

          {/* Confirm Password */}
          <div className="relative group">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-green-500 transition-colors" size={20} />
            <input
              type="password"
              required
              placeholder="Confirm Password"
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-green-500 outline-none transition-all"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all mt-4 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>Create Account <ArrowRight size={20} /></>
            )}
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-slate-500 font-medium">
          Already have an account?{' '}
          <Link to="/login" className="font-bold text-green-600 hover:text-green-700">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;