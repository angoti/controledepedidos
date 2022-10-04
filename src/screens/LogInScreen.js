/* eslint-disable react-native/no-inline-styles */
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useContext, useState} from 'react';
import {
  Image,
  Text,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import {AuthContext} from '../../App';
import Loader from '../components/Loader';

GoogleSignin.configure({
  webClientId:
    '640948777931-u7afm2hrvf3hskpon84po5fm4l3gvjpg.apps.googleusercontent.com',
});

export const logOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

export const loginSilently = async () => {
  try {
    return await GoogleSignin.signInSilently();
  } catch (error) {
    console.log('---------> signInSilently: ' + error);
  }
};

const LogInScreen = ({navigation}) => {
  // controle do botão do Google
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);
  // controle da splashscreen
  const [loading, setLoading] = useState(false);

  // controles do formulário
  // @ts-ignore
  const [userEmail, setUserEmail] = useState('');
  // @ts-ignore
  const [userPassword, setUserPassword] = useState('');
  // @ts-ignore
  const [errortext, setErrortext] = useState('');

  // contexto
  const {setUser} = useContext(AuthContext);

  async function onGoogleButtonPress() {
    setIsSigninInProgress(true);
    setLoading(true);
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const googleButton = () => {
    return (
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={processaGoolgeLogin}
        disabled={isSigninInProgress}
      />
    );
  };

  const processaGoolgeLogin = () => {
    onGoogleButtonPress()
      .then(user => {
        console.log('--------> loginScreen ' + JSON.stringify(user));
        // @ts-ignore
        const usuario = {
          // @ts-ignore
          nome: user.user.providerData[0].displayName,
          // @ts-ignore
          foto: user.user.providerData[0].photoURL,
          // @ts-ignore
          id: user.user.providerData[0].uid,
          // @ts-ignore
          email: user.user.providerData[0].email,
        };
        setUser(usuario);
        setLoading(false);
        setIsSigninInProgress(false);
        navigation.navigate('HomeRoutes');
      })
      .catch(error => {
        setLoading(false);
        setIsSigninInProgress(false);
        console.log('------------------> Erro: ' + error);
      });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={styles.containerStyle}>
        <View>
          <KeyboardAvoidingView enabled>
            <View style={{alignItems: 'center'}}>
              <Image
                // @ts-ignore
                source={require('../images/entrar.png')}
                style={{
                  width: '50%',
                  height: 50,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              />
              <View>{googleButton()}</View>
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                placeholder="Email" //dummy@abc.com
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(UserPassword)}
                placeholder="Senha" //12345
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>
            {errortext !== '' ? (
              <Text style={styles.errorTextStyle}>{errortext}</Text>
            ) : null}
            <TouchableOpacity style={styles.buttonStyle} activeOpacity={0.5}>
              <Text style={styles.buttonTextStyle}>Entrar</Text>
            </TouchableOpacity>
            <Text
              onPress={() => navigation.navigate('RegisterScreen')}
              style={styles.registerTextStyle}>
              Não tem cadastro ?
            </Text>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#3355aa',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 55,
    marginRight: 55,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#fff',
    height: 40,
    alignItems: 'center',
    marginLeft: 55,
    marginRight: 55,
    marginTop: 20,
    marginBottom: 25,
  },
  buttonTextStyle: {
    color: '#000',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderColor: '#dadae8',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
    alignSelf: 'center',
    padding: 10,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});

export default LogInScreen;
