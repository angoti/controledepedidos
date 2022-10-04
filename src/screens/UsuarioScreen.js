/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Title, Button, Text} from 'react-native-paper';
import {AuthContext} from '../../App';
import CadastroInicial from '../components/CadastroInicial';
import {
  consultaCadastroUsuario,
  novoCadastroInicial,
} from '../service/firebase';

const UsuarioScreen = ({navigation}) => {
  const {logOut, user, setUser} = useContext(AuthContext);
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [cadastroEfetivado, setCadastroEfetivado] = useState(false);

  const novoCadastro = titulo => {
    const uid =
      typeof user.providerData === 'undefined'
        ? user.id
        : user.providerData[0].uid;
    console.log('novo: ' + JSON.stringify(user));
    console.log('novo: ' + uid);
    novoCadastroInicial(uid, titulo).then(() => setCadastroEfetivado(true));
  };

  useEffect(() => {
    console.log('effect: ' + JSON.stringify(user));
    const consulta = consultaCadastroUsuario(user.id);
    consulta
      .then(retorno => {
        if (retorno.exists) {
          setDados(retorno.data());
          setCarregando(false);
        }
      })
      .catch(erro => console.error('----------> usuario: ' + erro));
  }, [cadastroEfetivado]);

  const sair = () => {
    logOut();
    setUser(null);
    navigation.navigate('AuthRoutes');
  };

  const Form = () => (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Text
        style={{
          fontSize: 32,
          textAlign: 'center',
        }}>
        Cadastro inicial
      </Text>
      <CadastroInicial função={novoCadastro} />
      <Card.Actions>
        <Button onPress={sair}>Sair</Button>
      </Card.Actions>
    </View>
  );

  const MostraUsuario = () => (
    <>
      <View style={styles.topo}>
        <Text style={styles.texto}>Perfil do usuário</Text>
        <Card style={styles.card}>
          <View style={styles.cardContentImage}>
            <Avatar.Image size={150} source={{uri: user.foto}} />
          </View>
          <Card.Content>
            <Title style={styles.cardContentText}>{dados.titulo}</Title>
            <View style={styles.textoContent}>
              <Text style={styles.textoContentCabeçalho} variant="bodyMedium">
                E-mail:
              </Text>
              <Text style={styles.textoContentConteúdo} variant="bodyMedium">
                {user.email}
              </Text>
            </View>
            <View style={styles.textoContent}>
              <Text style={styles.textoContentCabeçalho} variant="bodyMedium">
                Nome:
              </Text>
              <Text style={styles.textoContentConteúdo} variant="bodyMedium">
                {user.nome}
              </Text>
            </View>
            <View style={styles.textoContent}>
              <Text style={styles.textoContentCabeçalho} variant="bodyMedium">
                ID:
              </Text>
              <Text style={styles.textoContentConteúdo} variant="bodyMedium">
                {user.id}
              </Text>
            </View>
          </Card.Content>
          <Card.Actions>
            <Button onPress={sair}>Sair</Button>
          </Card.Actions>
        </Card>
      </View>
      <View style={styles.base} />
    </>
  );
  if (user === null) {
    return;
  }
  return (
    <View style={styles.container}>
      {carregando ? <Form /> : <MostraUsuario />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  topo: {
    flex: 1,
    backgroundColor: '#3475F5',
    alignItems: 'center',
  },
  base: {
    flex: 2,
  },
  texto: {
    marginTop: 50,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cardContainer: {flexDirection: 'row'},
  card: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  cardContentImage: {padding: 20, alignSelf: 'center'},
  cardContentText: {padding: 2, alignSelf: 'center'},
  textoContent: {flexDirection: 'row'},
  textoContentCabeçalho: {flex: 1},
  textoContentConteúdo: {flex: 3},
});

export default UsuarioScreen;
