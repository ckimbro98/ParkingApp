import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import CustomButton from '@/components/CustomButton';
import AdjustableMap from '@/components/AdjustableMap';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';

export default function RecordSpot() {
  const colorScheme = useColorScheme();

  const location = useLocalSearchParams();
  const parsedLocation = JSON.parse(
    location?.location as string,
  ) as Location.LocationObject;
  const coords = parsedLocation.coords;
  const timestamp = parsedLocation.timestamp;

  useEffect(() => {
    console.log('location', location);
    console.log(coords);
    console.log(timestamp);
  }, [location]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'center' }}>
          <Text
            style={{ color: Colors[colorScheme ?? 'light'].text, fontSize: 24 }}
          >
            Recorded Location
          </Text>
          <AdjustableMap
            initialRegion={{
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          ></AdjustableMap>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginHorizontal: 16,
  },
  columnContainer: {
    flexDirection: 'row', // Row layout for side-by-side columns
    justifyContent: 'space-between', // Space between the columns
    width: '100%',
    marginTop: 20,
  },
  column: {
    flex: 1, // Each column takes equal width
    alignItems: 'center', // Center content horizontally
    padding: 10,
  },
});

/**
 *  Old code that tells us what variables we have access to with currentLocation
 * 
 * <View style={styles.columnContainer}>
            <View style={styles.column}>
              <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
                Latitude
              </Text>
              <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
                Longitude
              </Text>
              <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
                Altitude
              </Text>
              <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
                Altitude Accuracy
              </Text>
              <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
                Heading
              </Text>
              <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
                Speed
              </Text>
            </View>
            <View style={styles.column}>
              <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
                {coords.latitude}
              </Text>
              <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
                {coords.longitude}
              </Text>
              <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
                {coords.altitude}
              </Text>
              <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
                {coords.altitudeAccuracy}
              </Text>
              <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
                {coords.heading}
              </Text>
              <Text style={{ color: Colors[colorScheme ?? 'light'].text }}>
                {coords.speed}
              </Text>
            </View>
          </View>
 */