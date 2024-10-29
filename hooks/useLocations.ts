// useLocations.ts
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Region } from 'react-native-maps';

const STORAGE_KEY = 'locations';

const useLocations = () => {
  const [locations, setLocations] = useState<Array<Region>>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Add a location to local storage
  const addLocation = async (location: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }) => {
    try {
      const storedLocations = await AsyncStorage.getItem(STORAGE_KEY);
      const newLocations = storedLocations ? JSON.parse(storedLocations) : [];
      newLocations.push(location);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newLocations));
      setLocations(newLocations);
    } catch (error) {
      console.error(error);
    }
  };

  // Remove a location from local storage
  const removeLocation = async (index: number) => {
    try {
      const storedLocations = await AsyncStorage.getItem(STORAGE_KEY);
      const newLocations = storedLocations ? JSON.parse(storedLocations) : [];
      newLocations.splice(index, 1);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newLocations));
      setLocations(newLocations);
    } catch (error) {
      console.error(error);
    }
  };

  // Get locations from local storage
  const getLocations = async () => {
    try {
      const storedLocations = await AsyncStorage.getItem(STORAGE_KEY);
      const newLocations = storedLocations ? JSON.parse(storedLocations) : [];
      setLocations(newLocations);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLocations();
    setLoading(false);
  }, []);

  return { locations, addLocation, removeLocation, loading };
};

export default useLocations;
