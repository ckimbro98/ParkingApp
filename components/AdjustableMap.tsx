import React from 'react';
import MapView, { Region, Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

interface AdjustableMapProps {
  initialRegion: Region;
  region: Region;
  onRegionChange: (changedRegion: Region) => void;
}

export default function AdjustableMap({
  initialRegion,
  region,
  onRegionChange,
}: AdjustableMapProps) {
  return (
    <MapView
      style={styles.map}
      region={region}
      onRegionChange={onRegionChange}
      zoomTapEnabled={false}
    >
      <Marker
        coordinate={{ latitude: region.latitude, longitude: region.longitude }}
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
