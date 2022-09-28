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
    novoCadastroInicial(user.uid, titulo).then(() =>
      setCadastroEfetivado(true),
    );
  };

  useEffect(() => {
    const consulta = consultaCadastroUsuario(user.uid);
    consulta
      .then(retorno => {
        if (retorno.exists) {
          setDados(retorno.data());
          setCarregando(false);
        }
      })
      .catch(erro => console.error('----------> usuario: ' + erro));
  }, [user, cadastroEfetivado]);

  const sair = () => {
    logOut();
    setUser(null);
    navigation.navigate('AuthRoutes');
  };
  if (carregando) {
    return (
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
  }
  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.texto}>Perfil do usuário</Text>
        <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <View style={styles.cardContentImage}>
              <Avatar.Image
                size={150}
                source={{
                  uri: user.photoURL,
                }}
              />
            </View>
            <Card.Content>
              <View>
                <Title style={styles.cardContentText}>{dados.titulo}</Title>
                <Text variant="bodySmall">E-mail: {user.email}</Text>
                <Text variant="bodySmall">
                  Último login:
                  {new Date(user.metadata.lastSignInTime).toLocaleString(
                    'pt-BR',
                    {timeZone: 'America/Sao_Paulo'},
                  )}
                </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={sair}>Sair</Button>
            </Card.Actions>
          </Card>
        </View>
      </View>
      <View style={styles.base} />
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
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
  },
  cardContentImage: {padding: 20, alignSelf: 'center'},
  cardContentText: {padding: 20, alignSelf: 'center'},
});

export default UsuarioScreen;
