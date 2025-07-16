import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { useList } from '../context/ListContext';
import { ArrowLeft, Search, Trash2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type CartScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Cart'>;

export default function CartScreen() {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const { cartItems, finishShopping } = useList();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredItems = useMemo(() => 
    cartItems.filter(item => 
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), 
  [cartItems, searchQuery]);

  const handleFinish = () => {
    Alert.alert(
      "Finalizar Compra",
      "Tem certeza que deseja finalizar a compra? Todos os itens serão apagados.",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Sim, finalizar", onPress: () => {
            finishShopping();
            navigation.navigate('Home');
        }, style: 'destructive' }
      ]
    );
  };

  return (
    <SafeAreaView style={stylesCart.container}>
      <View style={stylesCart.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#343a40" size={28} />
        </TouchableOpacity>
        <Text style={stylesCart.title}>Carrinho</Text>
        <TouchableOpacity onPress={handleFinish}>
          <Trash2 color="red" size={28} />
        </TouchableOpacity>
      </View>

      <View style={stylesCart.searchContainer}>
        <Search color="#6c757d" size={20} style={stylesCart.searchIcon} />
        <TextInput
          style={stylesCart.searchInput}
          placeholder="Pesquisar no carrinho..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={stylesCart.cartItem}>
            <Text style={stylesCart.itemName}>{item.name}</Text>
            <Text style={stylesCart.itemDetails}>{item.quantity} {item.unit} - R$ {item.price.toFixed(2)}</Text>
          </View>
        )}
        contentContainerStyle={stylesCart.list}
        ListEmptyComponent={<Text style={stylesCart.emptyText}>Seu carrinho está vazio.</Text>}
      />
    </SafeAreaView>
  );
}

const stylesCart = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#dee2e6',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#343a40',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 20,
    paddingHorizontal: 10,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  list: {
    paddingHorizontal: 20,
  },
  cartItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemDetails: {
    fontSize: 14,
    color: '#6c757d',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#6c757d',
  },
});