export type SizeInEm = `${number}em`;
export type Breakpoints = Map<string, SizeInEm>;
export type SliderSteps = "previous" | "next";
export type ProductData = {
  id: number;
  name: string;
  productId: string;
  currency: string;
  currencySymbol: string;
  unitPrice: number;
  quantity: number;
};
export type StorageData = {
  cart: ProductData[];
};
