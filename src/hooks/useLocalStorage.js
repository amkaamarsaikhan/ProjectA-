import { useState, useEffect } from 'react';

/**
 * LocalStorage-той ажиллах Custom Hook.
 * Датаг хөтчийн санах ойноос унших болон хадгалах үүргийг гүйцэтгэнэ.
 * * @param {string} key - Хадгалах түлхүүр үг (жишээ нь: 'saved-scholarships')
 * @param {any} initialValue - Хэрэв санах ой хоосон бол ашиглах анхны утга
 */
export const useLocalStorage = (key, initialValue) => {
  // 1. Санах ойгоос өгөгдлийг уншиж State-д оноох
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === "undefined") {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      // Хэрэв санах ой дотор дата байвал JSON-оос объект болгож хөрвүүлнэ
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error("LocalStorage-аас өгөгдөл уншихад алдаа гарлаа:", error);
      return initialValue;
    }
  });

  // 2. State өөрчлөгдөх бүрт санах ой руу (LocalStorage) хадгалах
  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(storedValue));
      }
    } catch (error) {
      console.error("LocalStorage-д хадгалахад алдаа гарлаа:", error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
};