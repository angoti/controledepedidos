/* eslint-disable react-native/no-inline-styles */
import {useState} from 'react';
import {View} from 'react-native';
import {TextInput, Button} from 'react-native-paper';

const CadastroInicial = ({função}) => {
  const [text, setText] = useState('');

  return (
    <View style={{margin: 20}}>
      <TextInput
        placeholder="Título do negócio"
        value={text}
        onChangeText={texto => setText(texto)}
        mode="flat"
      />
      <View style={{marginTop: 20}} />
      <Button
        icon="pencil-plus"
        mode="elevated"
        style={{borderRadius: 0}}
        onPress={() => função(text)}>
        Cadastrar
      </Button>
    </View>
  );
};

export default CadastroInicial;
