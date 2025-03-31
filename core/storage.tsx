import AsyncStorage from '@react-native-async-storage/async-storage';
import EventEmitter from 'eventemitter3';
import { useEffect, useState } from 'react';

const storageEmitter = new EventEmitter();

export function useStorage<T = string>(key: string) {
  const [value, setValue] = useState<T | null>(null);

  const setItem = async (newValue: T) => {
    try {
      const jsonValue = JSON.stringify(newValue);
      await AsyncStorage.setItem(key, jsonValue);
      setValue(newValue);
      storageEmitter.emit(key, newValue);
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
      storageEmitter.emit(key, null);
    } catch (error) {
      console.error(`Erreur lors de la suppression de ${key} :`, error);
    }
  };

  useEffect(() => {
    getItem();

    const listener = (newValue: T | null) => {
      setValue(newValue);
    };

    storageEmitter.addListener(key, listener);

    return () => {
      storageEmitter.removeListener(key, listener);
    };
  }, [key]);

  return [value, setItem, removeItem] as const;
}

export default useStorage;
