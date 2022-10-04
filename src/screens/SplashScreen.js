/* eslint-disable react-native/no-inline-styles */
import {useState, useEffect, useContext} from 'react';
import {ActivityIndicator, View, StyleSheet, Image} from 'react-native';
import {AuthContext} from '../../App';
import {loginSilently} from './LogInScreen';

const LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';

const SplashScreen = ({navigation}) => {
  console.log('passando pela splashscreen');
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);

  // contexto
  const {setUser} = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setAnimating(false);
      loginSilently()
        .then(user => {
          console.log('--------> login silently ' + JSON.stringify(user));
          if (typeof user === 'undefined') {
            navigation.replace('AuthRoutes');
          } else {
            const usuario = {
              // @ts-ignore
              nome: user.user.name,
              // @ts-ignore
              foto: user.user.photo,
              // @ts-ignore
              id: user.user.id,
              email: user.user.email,
            };
            setUser(usuario);
            navigation.replace('HomeRoutes');
          }
        })
        .catch(error =>
          console.log('---------> SplashScreen signInSilently: ' + error),
        );
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{uri: LOADING_IMAGE_URL}}
        style={{width: '90%', resizeMode: 'contain', margin: 30}}
      />
      <ActivityIndicator
        animating={animating}
        color="#FFFFFF"
        size="large"
        style={styles.activityIndicator}
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
});
