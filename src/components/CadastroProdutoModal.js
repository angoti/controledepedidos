import {useState} from 'react';
import {Modal, Portal, Text} from 'react-native-paper';

const CadastroProdutoModal = () => {
  const [visible, setVisible] = useState(true);

  const hideModal = () => setVisible(false);
  const containerStyle = {backgroundColor: 'red', padding: 20};

  return (
    <>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}>
          <Text>Example Modal. Click outside this area to dismiss.</Text>
        </Modal>
      </Portal>
    </>
  );
};

export default CadastroProdutoModal;
