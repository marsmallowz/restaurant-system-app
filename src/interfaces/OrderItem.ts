export interface OrderItem {
  id: string;
  tableId: number;
  menus: { id: string; name: string; quantity: number }[];
}
