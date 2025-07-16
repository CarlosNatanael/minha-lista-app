import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useList } from '../context/ListContext';
import { ListItem } from '../components/ListItem';
import { AddItemModal } from '../components/AddItemModal';
import { AddPriceModal } from '../components/AddPriceModal';
import { Plus, ShoppingCart, ListChecks } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList, Item as ItemType } from '../types';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export default function HomeScreen() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const { mainListItems, totalValue, moveItemToCart, updateItemPrice, addItem, cartItems } = useList();
  
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [priceModalVisible, setPriceModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ItemType | null>(null);

  const handleOpenPriceModal = (item: ItemType) => {
    setSelectedItem(item);
    setPriceModalVisible(true);
  };

  return (
    <SafeAreaView style={stylesHome.container}>
      <View style={stylesHome.header}>
        <Text style={stylesHome.title}>Minha Lista de Compras</Text>
      </View>

      <FlatList
        data={mainListItems}
        renderItem={({ item }) => (
          <ListItem 
            item={item} 
            onCheck={moveItemToCart} 
            onAddPrice={handleOpenPriceModal} 
          />
        )}
        keyExtractor={item => item.id}
        contentContainerStyle={stylesHome.list}
        ListEmptyComponent={<Text style={stylesHome.emptyText}>Nenhum item na lista. Adicione um!</Text>}
      />

      <View style={stylesHome.footer}>
        <TouchableOpacity style={stylesHome.footerButton} onPress={() => navigation.navigate('Summary')}>
          <ListChecks color="#343a40" size={24} />
          <Text style={stylesHome.footerButtonText}>Total</Text>
          <Text style={stylesHome.totalValue}>R$ {totalValue.toFixed(2)}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.addButton} onPress={() => setAddModalVisible(true)}>
          <Plus color="#fff" size={32} />
        </TouchableOpacity>

        <TouchableOpacity style={stylesHome.footerButton} onPress={() => navigation.navigate('Cart')}>
          <ShoppingCart color="#343a40" size={24} />
          <Text style={stylesHome.footerButtonText}>Carrinho</Text>
          <View style={stylesHome.cartBadge}>
            <Text style={stylesHome.cartBadgeText}>{cartItems.length}</Text>
          </View>
        </TouchableOpacity>
      </View>

      <AddItemModal 
        visible={addModalVisible}
        onClose={() => setAddModalVisible(false)}
        onAddItem={addItem}
      />
      <AddPriceModal 
        visible={priceModalVisible}
        onClose={() => setPriceModalVisible(false)}
        onUpdatePrice={updateItemPrice}
        item={selectedItem}
      />
    </SafeAreaView>
  );
}

const stylesHome = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#343a40',
  },
  list: {
    padding: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6c757d',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#dee2e6',
    backgroundColor: '#fff',
  },
  footerButton: {
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 12,
    color: '#495057',
  },
  totalValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#28a745',
  },
  addButton: {
    backgroundColor: '#007bff',
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    bottom: 20, // Elevate the button
  },
  cartBadge: {
    position: 'absolute',
    right: -10,
    top: -5,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartBadgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});