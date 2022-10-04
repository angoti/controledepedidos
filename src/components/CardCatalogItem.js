/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import {Alert, Text, View} from 'react-native';
import {Avatar, Card} from 'react-native-paper';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import {excluirProduto} from '../service/firebase';

const CardCatalogItem = ({nome, imageUrl, id, setupdate}) => {
  const LeftContent = props => <Avatar.Icon {...props} icon="check" />;

  const LeftSwipeActions = () => {
    return (
      <View
        style={{flex: 1, backgroundColor: '#00aa55', justifyContent: 'center'}}>
        <Text
          style={{
            color: '#40394a',
            fontWeight: '600',
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}>
          Editar
        </Text>
      </View>
    );
  };
  const rightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: '#ff3322',
          justifyContent: 'center',
          alignItems: 'flex-end',
          flex: 1,
        }}>
        <Text
          style={{
            color: '#1b1a17',
            fontWeight: '600',
            paddingHorizontal: 30,
            paddingVertical: 20,
          }}>
          Apagar
        </Text>
      </View>
    );
  };
  const swipeFromLeftOpen = () => {
    Alert.alert('Swipe from left');
  };

  // apagar um produto
  const swipeFromRightOpen = () => {
    excluirProduto(id);
    setupdate(true);
    Alert.alert('Produto excluido');
  };

  return (
    <Swipeable
      renderLeftActions={LeftSwipeActions}
      renderRightActions={rightSwipeActions}
      onSwipeableRightOpen={swipeFromRightOpen}
      onSwipeableLeftOpen={swipeFromLeftOpen}>
      <Card elevation={5} style={{margin: 10}}>
        <Card.Title title={nome} left={LeftContent} />
        <Card.Cover source={{uri: imageUrl}} />
      </Card>
    </Swipeable>
  );
};
export default CardCatalogItem;
