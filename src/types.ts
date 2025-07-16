export interface Item {
  id: string;
  name: string;
  quantity: number;
  unit: 'un' | 'kg';
  price: number;
  inCart: boolean;
}

export type RootStackParamList = {
  Home: undefined;
  Cart: undefined;
  Summary: undefined;
};