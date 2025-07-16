import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Item as ItemType } from '../types';

interface AddPriceModalProps {
  visible: boolean;
  onClose: () => void;
  onUpdatePrice: (itemId: string, price: number) => void;
  item: ItemType | null;
}

export const AddPriceModal = ({ visible, onClose, onUpdatePrice, item }: AddPriceModalProps) => {
  const [price, setPrice] = useState('');

  useEffect(() => {
    if (item) {
      setPrice(item.price > 0 ? item.price.toString() : '');
    }
  }, [item]);

  const handleUpdatePrice = () => {
    if (item && price) {
      onUpdatePrice(item.id, parseFloat(price.replace(',', '.')));
      setPrice('');
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
      <View style={priceModalStyles.centeredView}>
        <View style={priceModalStyles.modalView}>
          <Text style={priceModalStyles.modalTitle}>Adicionar Preço</Text>
          <Text style={priceModalStyles.itemName}>{item?.name}</Text>
          
          <TextInput
            style={priceModalStyles.input}
            placeholder="Preço (ex: 12.99)"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
          
          <TouchableOpacity style={priceModalStyles.addButton} onPress={handleUpdatePrice}>
            <Text style={priceModalStyles.addButtonText}>Confirmar Preço</Text>
          </TouchableOpacity>
           <TouchableOpacity style={priceModalStyles.closeButton} onPress={onClose}>
            <Text style={priceModalStyles.closeButtonText}>Fechar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const priceModalStyles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    itemName: {
        fontSize: 16,
        color: '#555',
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
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#f5b301',
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