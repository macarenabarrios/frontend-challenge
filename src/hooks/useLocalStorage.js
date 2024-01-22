import { useState, useEffect } from 'react';

function useLocalStorage(key, initialValue) {
  // Obtener el valor almacenado o establecer el valor inicial si no existe
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  // Guardar el valor en localStorage cada vez que cambie
  useEffect(() => {
    try {
      const valueToStore = storedValue instanceof Function ? storedValue(storedValue) : storedValue;
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  }, [key, storedValue]);

  // Función para actualizar el valor
  const setValue = value => {
    setStoredValue(value);
  };

  return [storedValue, setValue];
}

// Hacer deleteValue

export default useLocalStorage;