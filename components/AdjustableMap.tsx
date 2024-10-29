import React from 'react';
import MapView, { Region } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

interface AdjustableMapProps {
  initialRegion: Region;
}

export default function AdjustableMap({ initialRegion }: AdjustableMapProps) {
  const [region, setRegion] = useState<Region>(initialRegion);

  function onRegionChange(changedRegion: Region) {
    setRegion(changedRegion);
  }

  return (
    <MapView
      style={styles.map}
      region={region}
      onRegionChange={onRegionChange}
    />
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
