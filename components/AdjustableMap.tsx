import React from 'react';
import MapView, { Region, Marker, LatLng } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

interface AdjustableMapProps {
  initialRegion: Region;
  region: Region;
  marker: LatLng;
  onRegionChange: (changedRegion: Region) => void;
  onRegionChangeComplete?: (changedRegion: Region) => void;
}

export default function AdjustableMap({
  initialRegion,
  region,
  marker,
  onRegionChange,
  onRegionChangeComplete,
}: AdjustableMapProps) {
  return (
    <MapView
      style={styles.map}
      region={region}
      onRegionChange={onRegionChange}
      onRegionChangeComplete={onRegionChange}
      zoomTapEnabled={false}
      showsUserLocation={true}
    >
      <Marker
        coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
