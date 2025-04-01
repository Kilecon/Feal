import database from '@react-native-firebase/database';

export const fetchPlantHealth = async (id: string): Promise<{ sun: number; humidity: number }> => {
  const plantHealth = { sun: 0, humidity: 0 };

  database()
    .ref(`/${id}`)
    .once('value')
    .then((snapshot) => {
      if (snapshot.exists()) {
        plantHealth.sun = snapshot.val()['sun'];
        plantHealth.humidity = snapshot.val()['humidity'];
      }
    });
  return plantHealth;
};
