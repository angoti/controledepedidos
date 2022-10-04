/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {useContext, useEffect, useState} from 'react';
import {FlatList, StyleSheet, ActivityIndicator} from 'react-native';
import {FAB, Text, Modal, Portal, Provider} from 'react-native-paper';
import FormCadastro from '../components/FormCadastro';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../App';
import CardCatalogItem from '../components/CardCatalogItem';

const CatalogScreen = () => {
  const {user} = useContext(AuthContext);
  const ref = firestore()
    .collection('produtos')
    .where('id', '==', user.id)
    .orderBy('timeStamp', 'desc');

  const [produtos, setProdutos] = useState([]);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'white', padding: 20};

  const oneTimeRead = () => {
    const list = [];
    ref.get().then(querySnapshot => {
      querySnapshot.forEach(doc => {
        list.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setProdutos(list);
      setLoading(false);
      setUpdate(false);
    });
  };

  useEffect(() => {
    console.log('------------------> useEffect.Catalog');
    oneTimeRead();
  }, [update, visible]);

  if (loading) {
    return (
      <ActivityIndicator
        size="large"
        style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
      />
    );
  }
  return (
    <>
      <Text variant="titleLarge" style={{alignSelf: 'center', margin: 10}}>
        Lista de produtos
      </Text>
      <FlatList
        data={produtos}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return <CardCatalogItem {...item} setupdate={setUpdate} />;
        }}
      />

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={showModal}
        color="#eee"
        mode="elevated"
      />
      <Provider>
        <Portal>
          <Modal
            style={{margin: 10}}
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={containerStyle}>
            <FormCadastro hideModal={hideModal} atualiza={setUpdate} />
          </Modal>
        </Portal>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#437',
    borderRadius: 28,
  },
});

export default CatalogScreen;
