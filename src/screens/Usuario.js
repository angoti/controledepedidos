import {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar, Card, Title, Button, Text} from 'react-native-paper';
import {AuthContext} from '../../App';

const Usuario = () => {
  const {signOut, usuario} = useContext(AuthContext);
  console.log(usuario);
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
                  uri: usuario.photoURL,
                }}
              />
            </View>
            <Card.Content>
              <View>
                <Title style={styles.cardContentText}>Ícones do Angoti</Title>
                <Text variant="bodySmall">E-mail: {usuario.email}</Text>
                <Text variant="bodySmall">
                  Último login:
                  {new Date(usuario.metadata.lastSignInTime).toLocaleString(
                    'pt-BR',
                    {timeZone: 'America/Sao_Paulo'},
                  )}
                </Text>
              </View>
            </Card.Content>
            <Card.Actions>
              <Button onPress={signOut}>Sair</Button>
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

export default Usuario;
