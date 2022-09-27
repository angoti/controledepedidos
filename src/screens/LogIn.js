import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  GoogleSigninButton,
} from '@react-native-google-signin/google-signin';
import {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {AuthContext} from '../../App';

export async function logOut() {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
}

const LogIn = () => {
  const {signIn} = useContext(AuthContext);
  const [isSigninInProgress, setIsSigninInProgress] = useState(false);

  GoogleSignin.configure({
    webClientId:
      '640948777931-u7afm2hrvf3hskpon84po5fm4l3gvjpg.apps.googleusercontent.com',
  });

  async function onGoogleButtonPress() {
    setIsSigninInProgress(true);
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  return (
    <View style={styles.container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => onGoogleButtonPress().then(user => signIn(user.user))}
        disabled={isSigninInProgress}
      />
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
});

export default LogIn;
