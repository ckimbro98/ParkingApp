// LocationsList.tsx
import useLocations from '@/hooks/useLocations';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  StyleSheet,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import MapView, { Marker } from 'react-native-maps';
import { Region } from 'react-native-maps';
import CustomButton from '@/components/CustomButton';

export default function Locations() {
  const { locations, loading, removeLocation } = useLocations();

  if (loading) {
    return <ActivityIndicator />;
  }

  const _renderItem = ({ item, index }: { item: Region; index: number }) => (
    <View
      style={{
        width: '100%',
        height: 400,
        borderStyle: 'dashed',
        borderColor: 'red',
        borderWidth: 2,
      }}
    >
      <MapView
        initialRegion={item}
        scrollEnabled={false}
        style={{ width: '100%', height: '80%' }}
      >
        <Marker
          coordinate={{
            latitude: item.latitude,
            longitude: item.longitude,
          }}
        ></Marker>
      </MapView>

      <View style={styles.columnContainer}>
        <View style={styles.column}>
          <CustomButton
            onPress={() => {
              removeLocation(index);
            }}
            title="Delete Location"
          />
        </View>
        <View style={styles.column}>
          <CustomButton
            onPress={() => {
              console.log('Mapping');
            }}
            title="Map to Location"
          />
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ height: '100%' }}>
        <FlatList
          style={{ padding: 20 }}
          contentContainerStyle={{ gap: 20, paddingBottom: 70 }}
          data={locations}
          renderItem={_renderItem}
          keyExtractor={(item, index) =>
            index
              .toString()
              .concat(
                item.latitude.toString().concat(item.longitude.toString()),
              )
          }
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  columnContainer: {
    flexDirection: 'row', // Row layout for side-by-side columns
    justifyContent: 'center', // Space between the columns
    width: '100%',
  },
  column: {
    flex: 1, // Each column takes equal width
  },
});
