/* eslint-disable react-native/no-inline-styles */
import {useContext, useState} from 'react';
import {Image, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {TextInput, Button} from 'react-native-paper';
import {AuthContext} from '../../App';
import {novoProduto} from '../service/firebase';

const FormCadastro = ({hideModal, atualiza}) => {
  const {user} = useContext(AuthContext);
  const [nomeProduto, setNomeProduto] = useState('');
  const [descriçãoProduto, setDescriçãoProduto] = useState('');
  const [foto, setFoto] = useState(null);

  const escolherImagem = () => {
    console.log('escolhendo imagem');
    launchImageLibrary({
      mediaType: 'photo',
    })
      .then(result => {
        console.log('-----------------> ' + JSON.stringify(result.assets[0]));
        setFoto(result.assets[0]);
      })
      .catch(error => {
        console.log('-------------------------> ' + error);
      });
  };

  const efetuaCadastro = () => {
    hideModal();
    novoProduto(foto, nomeProduto, descriçãoProduto, user, atualiza);
  };

  return (
    <View style={{margin: 0}}>
      <TextInput
        placeholder="Nome do produto"
        value={nomeProduto}
        onChangeText={texto => setNomeProduto(texto)}
        mode="flat"
      />
      <View style={{marginTop: 10}} />
      <TextInput
        placeholder="Descrição"
        value={descriçãoProduto}
        onChangeText={texto => setDescriçãoProduto(texto)}
        mode="flat"
      />
      <View style={{marginTop: 10}} />
      <Button
        icon="image"
        mode="contained"
        onPress={() => escolherImagem()}
        style={{borderRadius: 0}}>
        {foto ? 'Foto escolhida' : 'Escolher foto'}
      </Button>
      {foto ? (
        <Image
          style={{width: '100%', height: 200}}
          resizeMode="cover"
          source={{uri: foto.uri}}
        />
      ) : (
        <></>
      )}
      <View style={{marginTop: 10}} />
      <Button
        icon="pencil-plus"
        mode="contained"
        style={{borderRadius: 0}}
        onPress={efetuaCadastro}>
        Cadastrar
      </Button>
    </View>
  );
};

export default FormCadastro;
