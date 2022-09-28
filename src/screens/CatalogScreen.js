// import {StyleSheet} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />;

const CatalogScreen = () => (
  <Card>
    <Card.Title
      title="Card Title"
      subtitle="Card Subtitle"
      left={LeftContent}
    />
    <Card.Content>
      <Title>Card title</Title>
      <Paragraph>Card content</Paragraph>
    </Card.Content>
    <Card.Cover source={{uri: 'https://picsum.photos/700'}} />
    <Card.Actions>
      <Button>Cancel</Button>
      <Button>Ok</Button>
    </Card.Actions>
  </Card>
);

export default CatalogScreen;
// const styles = StyleSheet.create({});
