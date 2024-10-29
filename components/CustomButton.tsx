import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
}

const CustomButton = React.forwardRef<View, CustomButtonProps>((props, ref) => {
  const { onPress, title } = props;
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    button: {
      backgroundColor: Colors[colorScheme ?? 'light'].background,
      borderRadius: 25, // For rounded corners
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    text: {
      color: Colors[colorScheme ?? 'light'].text,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <Pressable ref={ref} onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
});

export default CustomButton;
