import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { User, CheckCircle, Clock, GraduationCap, Send } from 'lucide-react';
import { sendTelegramNotification } from '../utils/notifications';

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newScholarship, setNewScholarship] = useState({ name: '', country: '', level: '' });
    const [sending, setSending] = useState(false);

    useEffect(() => {
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

    const handleAddAndNotify = async (e) => {
        e.preventDefault();
        if (!newScholarship.name || !newScholarship.country) return alert("Мэдээллээ бүрэн бөглөнө үү!");

        setSending(true);
        try {
            // 1. Firebase рүү хадгалах
            await addDoc(collection(db, 'scholarships'), {
                ...newScholarship,
                createdAt: serverTimestamp()
            });

            // 2. Telegram руу мэдэгдэх
            const message = `📢 <b>ШИНЭ ТЭТГЭЛЭГ ЗАРЛАГДЛАА!</b>\n\n` +
                           `🎓 <b>Нэр:</b> ${newScholarship.name}\n` +
                           `📍 <b>Улс:</b> ${newScholarship.country}\n` +
                           `🌐 <b>Түвшин:</b> ${newScholarship.level}`;
            
            await sendTelegramNotification(message);

            alert("Амжилттай! Суваг руу мэдээлэл илгээгдлээ.");
            setNewScholarship({ name: '', country: '', level: '' });
        } catch (error) {
            alert("Алдаа гарлаа. Token-оо шинэчилсэн эсэхээ шалгаарай.");
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div className="p-10 text-center font-bold">Ачааллаж байна...</div>;

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto bg-white min-h-screen">
            <div className="mb-12 p-8 bg-slate-900 rounded-[2.5rem] text-white">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                    <Send size={24} className="text-blue-400" /> Шинэ тэтгэлэг зарлах
                </h2>
                <form onSubmit={handleAddAndNotify} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                        className="bg-slate-800 border-none rounded-2xl p-4 text-sm outline-none"
                        placeholder="Тэтгэлэгийн нэр..."
                        value={newScholarship.name}
                        onChange={(e) => setNewScholarship({...newScholarship, name: e.target.value})}
                    />
                    <input 
                        className="bg-slate-800 border-none rounded-2xl p-4 text-sm outline-none"
                        placeholder="Улс..."
                        value={newScholarship.country}
                        onChange={(e) => setNewScholarship({...newScholarship, country: e.target.value})}
                    />
                    <div className="flex gap-2">
                        <select 
                            className="bg-slate-800 border-none rounded-2xl p-4 text-sm flex-1 outline-none"
                            value={newScholarship.level}
                            onChange={(e) => setNewScholarship({...newScholarship, level: e.target.value})}
                        >
                            <option value="">Түвшин сонгох</option>
                            <option value="Бакалавр">Бакалавр</option>
                            <option value="Магистр">Магистр</option>
                            <option value="Доктор">Доктор</option>
                        </select>
                        <button 
                            disabled={sending}
                            className="bg-blue-600 px-8 rounded-2xl font-bold"
                        >
                            {sending ? "..." : "Зарлах"}
                        </button>
                    </div>
                </form>
            </div>
            {/* Хэрэглэгчдийг хянах хэсэг энд үргэлжилнэ... */}
        </div>
    );
};

export default AdminPanel;