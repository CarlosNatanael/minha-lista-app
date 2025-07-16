import React, { createContext, useState, useContext, useMemo, ReactNode, useCallback } from 'react';
import { Item } from '../types';

interface ListContextType {
  items: Item[];
  storeName: string;
  purchaseDate: Date;
  addItem: (name: string, quantity: number, unit: 'un' | 'kg') => void;
  updateItemPrice: (itemId: string, price: number) => void;
  moveItemToCart: (itemId: string) => void;
  setStoreName: (name: string) => void;
  finishShopping: () => void;
  mainListItems: Item[];
  cartItems: Item[];
  totalValue: number;
}

const ListContext = createContext<ListContextType | undefined>(undefined);

export const ListProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [storeName, setStoreName] = useState<string>('');
  const [purchaseDate, setPurchaseDate] = useState<Date>(new Date());

  const addItem = useCallback((name: string, quantity: number, unit: 'un' | 'kg') => {
    const newItem: Item = {
      id: new Date().getTime().toString(), // ID único baseado no tempo
      name,
      quantity,
      unit,
      price: 0,
      inCart: false,
    };
    setItems(prevItems => [...prevItems, newItem]);
  }, []);

  const updateItemPrice = useCallback((itemId: string, price: number) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, price } : item
      )
    );
  }, []);

  const moveItemToCart = useCallback((itemId: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId ? { ...item, inCart: true } : item
      )
    );
  }, []);

  const finishShopping = useCallback(() => {
    setItems([]);
    setStoreName('');
    setPurchaseDate(new Date());
  }, []);

  // Itens para a lista principal (não estão no carrinho)
  const mainListItems = useMemo(() => items.filter(item => !item.inCart), [items]);

  // Itens que estão no carrinho
  const cartItems = useMemo(() => items.filter(item => item.inCart), [items]);

  // Calcula o valor total dos itens na lista principal
  const totalValue = useMemo(() =>
    mainListItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
    [mainListItems]
  );

  const value = {
    items,
    storeName,
    purchaseDate,
    addItem,
    updateItemPrice,
    moveItemToCart,
    setStoreName,
    finishShopping,
    mainListItems,
    cartItems,
    totalValue,
  };

  return <ListContext.Provider value={value}>{children}</ListContext.Provider>;
};

export const useList = () => {
  const context = useContext(ListContext);
  if (context === undefined) {
    throw new Error('useList must be used within a ListProvider');
  }
  return context;
};