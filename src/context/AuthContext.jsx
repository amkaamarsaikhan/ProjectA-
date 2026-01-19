import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  onAuthStateChanged, 
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut 
} from 'firebase/auth';
import { 
  doc, 
  onSnapshot, 
  setDoc,
  updateDoc, 
  arrayUnion, 
  arrayRemove 
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase'; 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedItems, setSavedItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // onAuthStateChanged нь Firebase-ээс хэрэглэгчийн мэдээллийг 
    // бүрэн татаж дууссаны дараа л ажилладаг.
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      
      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        const unsubSaved = onSnapshot(userDocRef, (docSnap) => {
          if (docSnap.exists()) {
            setSavedItems(docSnap.data().savedScholarships || []);
          }
          // Өгөгдөл ирсэн даруйд loading-ийг false болгоно
          setLoading(false);
        }, (error) => {
          console.error("Firestore error:", error);
          setLoading(false);
        });
        
        return () => unsubSaved();
      } else {
        setSavedItems([]);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const signup = async (email, password, name) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const newUser = userCredential.user;
    await setDoc(doc(db, 'users', newUser.uid), {
      uid: newUser.uid,
      name: name,
      email: email,
      savedScholarships: [],
      createdAt: new Date().toISOString()
    });
    return userCredential;
  };

  const login = (email, password) => {
    // Энд заавал email болон password-ийг салгаж дамжуулах ёстой.
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = () => {
    return signOut(auth);
  };

  const toggleSave = async (scholarship) => {
    if (!user) return alert("Нэвтрэх хэрэгтэй");
    const userDocRef = doc(db, 'users', user.uid);
    const isSaved = savedItems.some(item => item.id === scholarship.id);
    
    await updateDoc(userDocRef, {
      savedScholarships: isSaved ? arrayRemove(scholarship) : arrayUnion(scholarship)
    });
  };

  const value = { user, signup, login, logout, savedItems, toggleSave, loading };

  return (
    <AuthContext.Provider value={value}>
      {/* Loading үед юу ч харуулахгүй гацахаас сэргийлж children-ийг шууд харуулж болно */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);