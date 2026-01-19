import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { useAuth } from '../context/AuthContext';
import { User, CheckCircle, Clock } from 'lucide-react';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    // Бүх хэрэглэгчдийг бодит цаг хугацаанд татаж харах
    const q = query(collection(db, 'users'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersData);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Хэрэглэгчдийн хяналт</h1>
      <div className="grid gap-4">
        {users.map((u) => (
          <div key={u.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-100 rounded-full">
                <User size={20} className="text-slate-600" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{u.name}</h3>
                <p className="text-sm text-slate-500">{u.email}</p>
              </div>
            </div>

            {u.status === "completed" ? (
              <div className="flex items-center gap-2 text-green-600 bg-green-50 px-4 py-2 rounded-full font-bold text-sm">
                <CheckCircle size={18} /> Дууссан
              </div>
            ) : (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-full font-bold text-sm">
                <Clock size={18} /> Дутуу
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPanel;