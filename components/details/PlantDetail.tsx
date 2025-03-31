import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ChipsList } from '~/components/details/ChipsList';
import { faDroplet, faLeaf, faSkull, faMedkit } from '@fortawesome/free-solid-svg-icons';

type PlantDetailProps = {
  navigation: any;
  route: any;
};

type PlantData = {
  name: string;
  humidity?: number;
  light?: number;
  image: any;
  properties: string[];
};

const PlantDetail: React.FC<PlantDetailProps> = ({ navigation }) => {
  const plantData: PlantData = {
    name: 'Delicate Desert Delights',
    humidity: 72,
    light: 10,
    image: require('../assets/lucky_bamboo.png'),
    properties: ['Digest', 'Medicinal', 'Poisonous'],
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Plant detail</Text>
        </View>

        <Text style={styles.plantName}>{plantData.name}</Text>

        <View style={styles.contentContainer}>
          <View style={styles.metricsContainer}>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="water-outline" size={24} color="#888" />
              </View>
              <Text style={styles.metricLabel}>Humidity</Text>
              <View style={[styles.metricValue, styles.humidityValue]}>
                <Text style={styles.metricValueText}>{plantData.humidity}%</Text>
              </View>
            </View>
            <View style={styles.metricItem}>
              <View style={styles.metricIconContainer}>
                <Ionicons name="sunny-outline" size={24} color="#888" />
              </View>
              <Text style={styles.metricLabel}>Light</Text>
              <View style={[styles.metricValue, styles.lightValue]}>
                <Text style={styles.metricValueText}>{plantData.light}%</Text>
              </View>
            </View>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={plantData.image}
              style={styles.plantImage}
              resizeMode="contain"
            />
          </View>
        </View>
        
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>Tips for your plant</Text>
          
          <ChipsList data={[
            {
              id: "digest",
              label: "Digest",
              color: "green",
              icon: faDroplet
            },
            {
              id: "medicinal",
              label: "Medicinal",
              color: "green",
              icon: faMedkit
            },
            {
              id: "poisonous",
              label: "Poisonous",
              color: "green",
              icon: faSkull
            }
          ]} onChipPress={(id) => console.log(`Chip ${id} pressed`)} />
          
          <View style={styles.descriptionContainer}>
            <Text style={styles.descriptionText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem Ipsum has been the industry's standard dummy text ever since the
              1500s, when an unknown printer took a...
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
    marginLeft: 15,
  },
  plantName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a2540',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 25,
  },
  contentContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  metricsContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
    height: 220,
  },
  metricItem: {
    alignItems: 'center',
    marginVertical: 15,
  },
  metricIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
  },
  metricLabel: {
    fontSize: 14,
    color: '#333',
    marginVertical: 5,
  },
  metricValue: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginTop: 5,
  },
  humidityValue: {
    backgroundColor: '#e6f7e6',
  },
  lightValue: {
    backgroundColor: '#ffefcc',
  },
  metricValueText: {
    fontSize: 14,
    fontWeight: '500',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  plantImage: {
    width: 150,
    height: 200,
  },
  tipsContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  tipsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  descriptionContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  descriptionText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#333',
  },
});

export default PlantDetail;