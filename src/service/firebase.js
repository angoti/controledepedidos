import firestore from '@react-native-firebase/firestore';

export const consultaCadastroUsuario = async uid => {
  const docReference = await firestore().collection('usuario').doc(uid).get();
  return docReference;
};

export const novoCadastroInicial = async (uid, titulo) => {
  const ref = firestore().collection('usuario').doc(uid);

  try {
    return await ref.set({
      titulo: titulo,
    });
  } catch (error) {
    console.error(
      '-----------------> There was an error uploading a file to Cloud Storage:',
      error,
    );
  }
};
