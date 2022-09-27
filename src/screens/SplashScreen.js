import {View, Text, Image, StyleSheet} from 'react-native';

const SplashScreen = () => {
  const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Projeto X</Text>
      <Image source={{uri: LOADING_IMAGE_URL}} style={styles.splashLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#18073f',
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 8,
    color: '#0fa',
  },
  splashLogo: {
    padding: 8,
    width: 32,
    height: 32,
  },
});

export default SplashScreen;
