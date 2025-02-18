export type Data = {
    id: number;
    image: any;
    title: string;
    text: string;
  };
  
  export const data: Data[] = [
    {
      id: 1,
      image: require('../assets/plants_on_pots.png'),
      title: 'Take care of your plant...',
      text: 'virtually',
    },
    {
      id: 2,
      image: require('../assets/onboarding_carrousell.png'),
      title: 'Search your plant',
      text: '',
    },
    {
      id: 3,
      image: require('../assets/zamioculcas_zamiifolia_plant.png'),
      title: 'Follow plan health',
      text: '',
    },
  ];