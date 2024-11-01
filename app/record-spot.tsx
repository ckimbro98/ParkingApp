import { View, Text, StyleSheet } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import CustomButton from '@/components/CustomButton';
import AdjustableMap from '@/components/AdjustableMap';
import { router } from 'expo-router';

import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import useLocations from '@/hooks/useLocations';

import * as Location from 'expo-location';
import { useLocalSearchParams } from 'expo-router';
import { Region } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RecordSpot() {
  const colorScheme = useColorScheme();

  // all the data that can be received from the location of the user
  const location = useLocalSearchParams();
  const parsedLocation = JSON.parse(
    location?.location as string,
  ) as Location.LocationObject;
  const coords = parsedLocation.coords;
  const timestamp = parsedLocation.timestamp;

  const { addLocation } = useLocations();

  // state for the map
  const [region, setRegion] = useState<Region>({
    ...coords,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  // state for the marker in the map
  const [marker, setMarker] = useState({
    latitude: coords.latitude,
    longitude: coords.longitude,
  });

  // used by AdjustableMap, sets the new region, inherits it as props
  // needed for the overall map's smoothness - see this issue:
  // https://stackoverflow.com/questions/53181556/react-native-maps-onregionchange-stutters-the-map
  function onRegionChangeComplete(changedRegion: Region) {
    setRegion(changedRegion);
  }

  // needed for the marker, that changes all the time, not only when the map finishes changing
  function onRegionChange(changedRegion: Region) {
    setMarker({
      latitude: changedRegion.latitude,
      longitude: changedRegion.longitude,
    });
  }

  // User sets a marker, that updates in local storage or backend database (which to use, I wonder)
  const saveMarkerLocation = async () => {
    await addLocation({
      latitude: marker.latitude,
      longitude: marker.longitude,
      latitudeDelta: 0.0461,
      longitudeDelta: 0.02105,
    });
    router.replace({
      pathname: './locations',
      params: {},
    });
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View style={{ alignItems: 'center', gap: 20 }}>
          <Text
            style={{ color: Colors[colorScheme ?? 'light'].text, fontSize: 24 }}
          >
            Recorded Location
          </Text>
          <View
            style={{
              width: '90%',
              height: '80%',
              borderStyle: 'dashed',
              borderColor: 'red',
              borderWidth: 2,
            }}
          >
            <AdjustableMap
              initialRegion={{
                latitude: coords.latitude,
                longitude: coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              region={region}
              marker={marker}
              onRegionChange={onRegionChange}
              onRegionChangeComplete={onRegionChangeComplete}
            ></AdjustableMap>
          </View>
          <CustomButton
            onPress={saveMarkerLocation}
            title={'Record Spot'}
          ></CustomButton>
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
