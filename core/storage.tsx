import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export function useStorage<T = string>(key: string) {
  const [value, setValue] = useState<T | null>(null);

  const setItem = async (newValue: T) => {
    try {
      const jsonValue = JSON.stringify(newValue);
      await AsyncStorage.setItem(key, jsonValue);
      setValue(newValue);
    } catch (error) {
      console.error(`Erreur lors de l'enregistrement de ${key} :`, error);
    }
  };

  const getItem = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      if (jsonValue !== null) {
        setValue(JSON.parse(jsonValue));
      } else {
        setValue(null);
      }
    } catch (error) {
      console.error(`Erreur lors de la lecture de ${key} :`, error);
    }
  };

  const removeItem = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setValue(null);
    } catch (error) {
      console.error(`Erreur lors de la suppression de ${key} :`, error);
    }
  };

  useEffect(() => {
    getItem();
  }, []);

  return [value, setItem, removeItem] as const;
}

export default useStorage;
