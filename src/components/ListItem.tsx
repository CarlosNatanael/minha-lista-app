import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckCircle, DollarSign } from 'lucide-react-native';
import { Item as ItemType } from '../types';

interface ListItemProps {
  item: ItemType;
  onCheck: (id: string) => void;
  onAddPrice: (item: ItemType) => void;
}

export const ListItem = ({ item, onCheck, onAddPrice }: ListItemProps) => {
  const formattedPrice = `R$ ${item.price.toFixed(2)}`;
  const itemTotal = `Total: R$ ${(item.price * item.quantity).toFixed(2)}`;

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetails}>
          {item.quantity} {item.unit} - {formattedPrice}
        </Text>
         <Text style={styles.itemTotal}>{itemTotal}</Text>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => onAddPrice(item)}>
          <DollarSign color="#f5b301" size={26} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={() => onCheck(item.id)}>
          <CheckCircle color="#28a745" size={26} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  infoContainer: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  itemDetails: {
    fontSize: 14,
    color: '#666',
  },
  itemTotal: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
    marginTop: 4,
  },
  actionsContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    marginLeft: 15,
    padding: 5,
  },
});