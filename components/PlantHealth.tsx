import { faDroplet, faSun } from '@fortawesome/free-solid-svg-icons';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ActivityIndicator } from 'react-native';
import { Box } from 'theme';

import { InformationCard } from '~/components/InformationCard';
import { fetchPlantHealth } from '~/lib/firebase';

type PlantHealthProps = {
  id: string;
};

export const PlantHealth = ({ id }: PlantHealthProps) => {
  const { isPending, error, data } = useQuery({
    queryKey: ['plantHealth', id],
    queryFn: async () => fetchPlantHealth(id),
  });

  if (isPending) {
    return <ActivityIndicator size="large" color="green" />;
  }

  if (error) {
    return null;
  }

  return (
    <Box flexDirection="column" alignItems="center" gap="s_8">
      <Box flexDirection="row">
        <InformationCard
          label="Humidity"
          color="green"
          icon={faDroplet}
          pourcent={data?.humidity}
        />
      </Box>
      <Box style={{ width: '100%' }}>
        <InformationCard label="Light" color="orange" icon={faSun} pourcent={data?.sun} />
      </Box>
    </Box>
  );
};
