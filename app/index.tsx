import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { router, Link } from 'expo-router';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useState } from 'react';
import * as Location from 'expo-location';

export default function MainPage() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );
  const [loading, setLoading] = useState<boolean>(false);

  const colorScheme = useColorScheme();
  // event that runs when user presses "find my spots"
  // not implemented yet
  const findSpotsHandler = () => {
    router.push({ pathname: './locations', params: {} });
  };

  // event that runs when user presses "record a spot"
  // snapshots their location, then navigates them to the record-spot page
  const recordSpotHandler = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    // location fail - needs future implementation (asking users to give location details)
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    setLoading(true);
    const currentLocation = await Location.getCurrentPositionAsync({});
    setLoading(false);
    // navigate to the record-spot screen
    router.push({
      pathname: './record-spot',
      params: { location: JSON.stringify(currentLocation) },
    });
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-around',
      alignItems: 'stretch',
      marginHorizontal: 16,
    },
    title: {
      textAlign: 'center',
      marginVertical: 8,
      fontSize: 24,
      color: Colors[colorScheme ?? 'light'].text,
    },
    separator: {
      marginVertical: 20,
      borderBottomColor: Colors[colorScheme ?? 'light'].tint,
      borderBottomWidth: StyleSheet.hairlineWidth,
    },
  });

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <View>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text style={styles.title}>Getting your accurate location...</Text>
          </View>
        ) : (
          <>
            <View>
              <Text style={styles.title}>Parking Helper</Text>
            </View>
            <View>
              <CustomButton onPress={recordSpotHandler} title="Record a Spot" />
              <View style={styles.separator} />
              <CustomButton onPress={findSpotsHandler} title="Find My Spots" />
            </View>
          </>
        )}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
