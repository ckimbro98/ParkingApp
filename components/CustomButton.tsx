import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';

const CustomButton = ({
  onPress,
  title,
}: {
  onPress: () => void;
  title: string;
}) => {
  return (
    <Pressable onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'blue',
    borderRadius: 25, // For rounded corners
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CustomButton;
