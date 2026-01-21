import React, { useEffect, useState } from 'react';
import { collection, query, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore'; // addDoc нэмэв
import { db } from '../lib/firebase';
import { User, CheckCircle, Clock, GraduationCap, Send } from 'lucide-react'; // Send икон нэмэв
import { sendTelegramNotification } from '../utils/notifications'; // Таны үүсгэсэн файлыг import хийв

const AdminPanel = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Шинэ тэтгэлэг нэмэхэд ашиглах state-үүд
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

    // Тэтгэлэг нэмэх болон Телеграм руу илгээх функц
    const handleAddAndNotify = async (e) => {
        e.preventDefault();
        if (!newScholarship.name || !newScholarship.country) return alert("Мэдээллээ бүрэн бөглөнө үү!");

        setSending(true);
        try {
            // 1. Firebase Firestore руу хадгалах
            await addDoc(collection(db, 'scholarships'), {
                ...newScholarship,
                createdAt: serverTimestamp()
            });

            // 2. Телеграм руу мэдэгдэл илгээх (HTML хэлбэрээр)
            const message = `📢 <b>ШИНЭ ТЭТГЭЛЭГ ЗАРЛАГДЛАА!</b>\n\n` +
                           `🎓 <b>Нэр:</b> ${newScholarship.name}\n` +
                           `📍 <b>Улс:</b> ${newScholarship.country}\n` +
                           `🌐 <b>Түвшин:</b> ${newScholarship.level}\n\n` +
                           `📱 <i>Апп-аа нээж дэлгэрэнгүйг харна уу.</i>`;
            
            await sendTelegramNotification(message);

            alert("Амжилттай хадгалагдаж, Телеграм руу илгээгдлээ! ✅");
            setNewScholarship({ name: '', country: '', level: '' }); // Формыг цэвэрлэх
        } catch (error) {
            console.error("Алдаа гарлаа:", error);
            alert("Алдаа гарлаа, дахин оролдоно уу.");
        } finally {
            setSending(false);
        }
    };

    if (loading) return <div className="p-10 text-center font-bold">Ачааллаж байна...</div>;

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto bg-white min-h-screen">
            {/* --- ШИНЭ ХЭСЭГ: Тэтгэлэг нэмэх форм --- */}
            <div className="mb-12 p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl shadow-blue-200">
                <h2 className="text-2xl font-black mb-6 flex items-center gap-3">
                    <Send size={24} className="text-blue-400" /> Шинэ тэтгэлэг зарлах
                </h2>
                <form onSubmit={handleAddAndNotify} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                        className="bg-slate-800 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                        placeholder="Тэтгэлэгийн нэр..."
                        value={newScholarship.name}
                        onChange={(e) => setNewScholarship({...newScholarship, name: e.target.value})}
                    />
                    <input 
                        className="bg-slate-800 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
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
                            <option value="Bachelor">Бакалавр</option>
                            <option value="Master">Магистр</option>
                            <option value="PhD">Доктор</option>
                        </select>
                        <button 
                            disabled={sending}
                            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 px-8 rounded-2xl font-bold transition-all flex items-center justify-center min-w-[120px]"
                        >
                            {sending ? "Илгээж байна..." : "Зарлах"}
                        </button>
                    </div>
                </form>
            </div>

            {/* --- ХУУЧИН ХЭСЭГ: Хэрэглэгчдийн жагсаалт --- */}
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
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center border border-slate-100 shrink-0">
                                    <User size={24} className="text-slate-400" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-slate-800 text-lg">{u.name || 'Нэргүй хэрэглэгч'}</h3>
                                    <p className="text-sm text-slate-500 font-medium">{u.email}</p>
                                </div>
                            </div>

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