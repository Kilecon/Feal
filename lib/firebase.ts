import database from '@react-native-firebase/database';

export const fetchPlantHealth = async (id: string): Promise<{ sun: number; humidity: number }> => {
  const snapshot = await database().ref(`/${id}`).once('value');

  if (snapshot.exists()) {
    const val = snapshot.val();

    return {
      sun: parseFloat(val.sun ?? 0),
      humidity: parseFloat(val.humidity ?? 0),
    };
  }

  return { sun: 0, humidity: 0 };
};
