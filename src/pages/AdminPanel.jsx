import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User, CheckCircle, Clock, GraduationCap } from 'lucide-react';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Firestore-оос бүх хэрэглэгчдийг бодит цаг хугацаанд хянах
        const q = query(collection(db, 'users'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const usersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setUsers(usersData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) return <div className="p-10 text-center font-bold">Ачааллаж байна...</div>;

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto bg-white min-h-screen">
            <div className="mb-10">
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Admin Dashboard</h1>
                <p className="text-slate-500 font-medium">Хэрэглэгчдийн материал бүрдүүлэлтийн явц</p>
            </div>

            <div className="grid gap-6">
                {users.length === 0 ? (
                    <p className="text-center py-20 text-slate-400">Одоогоор бүртгэлтэй хэрэглэгч байхгүй байна.</p>
                ) : (
                    users.map((u) => (
                        <div key={u.id} className="bg-slate-50/50 p-6 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:shadow-slate-200/50 transition-all">

                            {/* Хэрэглэгчийн үндсэн мэдээлэл */}
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100 shrink-0">
                                    <User size={24} className="text-slate-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg">{u.name || 'Нэргүй хэрэглэгч'}</h3>
                                    <p className="text-sm text-slate-500 font-medium">{u.email}</p>
                                </div>
                            </div>

                            {/* Явцын мэдээлэл */}
                            <div className="flex flex-wrap items-center gap-4">
                                {u.lastUpdatedScholarship && (
                                    <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-xs font-bold border border-blue-100">
                                        <GraduationCap size={16} />
                                        {u.lastUpdatedScholarship}
                                    </div>
                                )}

                                {u.status === "completed" ? (
                                    <div className="flex items-center gap-2 text-green-600 bg-green-100 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider border border-green-200">
                                        <CheckCircle size={18} /> Дууссан
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-amber-600 bg-amber-100 px-5 py-2.5 rounded-2xl font-black text-xs uppercase tracking-wider border border-amber-200">
                                        <Clock size={18} /> Дутуу ({u.status === "in-progress" ? "Явцтай" : "Эхлээгүй"})
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default AdminPanel;