import { StyleSheet, Button, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import CustomButton from '@/components/CustomButton';

export default function Index() {
  const browseLotsHandler = () => {
    console.log('browseLotsHandler');
  };

  const useMyLocationHandler = () => {
    console.log('useMyLocationHandler');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.title}>Where are you parking?</Text>
        </View>
        <View>
          <CustomButton
            onPress={useMyLocationHandler}
            title="Use My Location"
          />

          <View style={styles.separator}></View>
          <View style={styles.button}>
            <Button
              title="Browse parking lots"
              color={'white'}
              onPress={browseLotsHandler}
            ></Button>
          </View>
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
  title: {
    textAlign: 'center',
    marginVertical: 8,
    fontSize: 24,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 25, // For rounded corners
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 30,
    alignItems: 'center',
  },
});
