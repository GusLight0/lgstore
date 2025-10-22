import myProfile from '../../assets/img/camisa-1.jpg';
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Camisa Preta Streetwear",
    price: 89.90,
    description: "Camisa de malha premium em algodão, estilo streetwear. Perfeita para ocasiões estilosas e elegantes.",
    image: myProfile,
    category: "Oversized Streetwear"
  }
];
