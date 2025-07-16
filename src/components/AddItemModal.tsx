import React, { useState } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Switch } from 'react-native';

interface AddItemModalProps {
  visible: boolean;
  onClose: () => void;
  onAddItem: (name: string, quantity: number, unit: 'un' | 'kg') => void;
}

export const AddItemModal = ({ visible, onClose, onAddItem }: AddItemModalProps) => {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isKg, setIsKg] = useState(false);

  const handleAddItem = () => {
    if (name && quantity) {
      onAddItem(name, parseFloat(quantity.replace(',', '.')), isKg ? 'kg' : 'un');
      setName('');
      setQuantity('');
      setIsKg(false);
      onClose();
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={modalStyles.centeredView}>
        <View style={modalStyles.modalView}>
          <Text style={modalStyles.modalTitle}>Adicionar Novo Item</Text>
          
          <TextInput
            style={modalStyles.input}
            placeholder="Nome do Produto"
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={modalStyles.input}
            placeholder="Quantidade ou KG"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />

          <View style={modalStyles.switchContainer}>
            <Text>Unidade</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isKg ? "#007bff" : "#f4f3f4"}
              onValueChange={() => setIsKg(previousState => !previousState)}
              value={isKg}
            />
            <Text>{isKg ? 'KG' : 'UN'}</Text>
          </View>
          
          <TouchableOpacity style={modalStyles.addButton} onPress={handleAddItem}>
            <Text style={modalStyles.addButtonText}>Adicionar à Lista</Text>
          </TouchableOpacity>
          <TouchableOpacity style={modalStyles.closeButton} onPress={onClose}>
            <Text style={modalStyles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const modalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        width: '100%',
        backgroundColor: "white",
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        borderRadius: 8,
        marginBottom: 15,
        fontSize: 16,
    },
    switchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '50%',
        marginBottom: 20,
    },
    addButton: {
        backgroundColor: '#28a745',
        borderRadius: 10,
        padding: 15,
        elevation: 2,
        width: '100%',
        alignItems: 'center',
    },
    addButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    closeButton: {
        marginTop: 10,
    },
    closeButtonText: {
        color: '#007bff'
    }
});