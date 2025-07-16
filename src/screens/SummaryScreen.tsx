import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Alert, TextInput } from 'react-native';
import { useList } from '../context/ListContext';
import { ArrowLeft, Store, Trash2 } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

type SummaryScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Summary'>;

export default function SummaryScreen() {
  const navigation = useNavigation<SummaryScreenNavigationProp>();
  const { cartItems, storeName, setStoreName, purchaseDate, finishShopping } = useList();

  const totalCartValue = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

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
  
  const handleSetStoreName = () => {
    Alert.prompt(
        "Nome da Loja",
        "Digite o nome da loja ou mercado:",
        [
            {text: 'Cancelar', style: 'cancel'},
            {text: 'OK', onPress: (name) => name && setStoreName(name)}
        ],
        'plain-text',
        storeName
    )
  }

  return (
    <SafeAreaView style={stylesSummary.container}>
      <View style={stylesSummary.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLeft color="#343a40" size={28} />
        </TouchableOpacity>
        <Text style={stylesSummary.title}>Resumo da Compra</Text>
        <TouchableOpacity onPress={handleFinish}>
          <Trash2 color="red" size={28} />
        </TouchableOpacity>
      </View>

      <View style={stylesSummary.receipt}>
        <View style={stylesSummary.storeSection}>
            <TouchableOpacity style={stylesSummary.storeButton} onPress={handleSetStoreName}>
                <Store color="#007bff" size={24} />
                <Text style={stylesSummary.storeName}>{storeName || 'Clique para nomear a loja'}</Text>
            </TouchableOpacity>
            <Text style={stylesSummary.date}>{purchaseDate.toLocaleDateString('pt-BR')}</Text>
        </View>

        <View style={stylesSummary.divider} />

        <FlatList
          data={cartItems}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={stylesSummary.listItem}>
              <Text style={stylesSummary.itemName}>{item.name} ({item.quantity} {item.unit})</Text>
              <Text style={stylesSummary.itemPrice}>R$ {(item.price * item.quantity).toFixed(2)}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={stylesSummary.emptyText}>Nenhum item finalizado no carrinho.</Text>}
        />

        <View style={stylesSummary.divider} />

        <View style={stylesSummary.totalContainer}>
          <Text style={stylesSummary.totalLabel}>TOTAL</Text>
          <Text style={stylesSummary.totalValue}>R$ {totalCartValue.toFixed(2)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const stylesSummary = StyleSheet.create({
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
  receipt: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 20,
    elevation: 3,
    flex: 1,
  },
  storeSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e7f3ff',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  storeName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
    marginLeft: 8,
  },
  date: {
    fontSize: 14,
    color: '#6c757d',
  },
  divider: {
    height: 1,
    backgroundColor: '#e9ecef',
    marginVertical: 15,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  itemName: {
    fontSize: 16,
    color: '#495057',
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '500',
    color: '#343a40',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#343a40',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#28a745',
  },
  emptyText: {
    textAlign: 'center',
    paddingVertical: 20,
    fontSize: 16,
    color: '#6c757d',
  },
});