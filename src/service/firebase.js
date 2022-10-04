import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

var LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif?a';
const db_usuario = firestore().collection('usuario');
const db_produtos = firestore().collection('produtos');

export const consultaCadastroUsuario = async uid => {
  const docReference = await db_usuario.doc(uid).get();
  return docReference;
};

export const novoCadastroInicial = async (uid, titulo) => {
  const usuario = db_usuario.doc(uid);

  try {
    return await usuario.set({
      titulo: titulo,
    });
  } catch (error) {
    console.error(
      '-----------------> There was an error uploading a file to Cloud Storage:',
      error,
    );
  }
};

export const novoProduto = async (
  foto,
  nomeProduto,
  descriçãoProduto,
  user,
  atualiza,
) => {
  try {
    // 1 - We add a message with a loading icon that will get updated with the shared image.
    const novoProdutoRef = await db_produtos.add({
      id: user.id,
      nome: nomeProduto,
      descrição: descriçãoProduto,
      timeStamp: firestore.FieldValue.serverTimestamp(),
      imageUrl: LOADING_IMAGE_URL,
    });

    // 2 - Upload the image to Cloud Storage.
    // const filePath = `${usuario.uid}/${messageRef.id}/${file.fileName}`;
    const filePath = `${foto.fileName}`;
    const newImageRef = storage().ref(filePath);
    const task = newImageRef.putFile(foto.uri);

    task.on('state_changed', taskSnapshot => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );
    });

    task.then(() => {
      console.log('Image uploaded to the bucket!');
      atualiza(true);
      // 3 - Generate a public URL for the file.
      newImageRef.getDownloadURL().then(publicImageUrl => {
        console.log('------------> url da imagem: ' + publicImageUrl);
        // 4 - Update the chat message placeholder with the image's URL.
        novoProdutoRef.update({
          imageUrl: publicImageUrl,
        });
      });
    });
  } catch (error) {
    console.error(
      '-----------------> There was an error uploading a file to Cloud Storage:',
      error,
    );
  }
};

export const excluirProduto = id => {
  db_produtos.doc(id).delete();
};
