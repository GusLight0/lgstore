import camisa1 from '../../assets/img/camisa-1.jpg';
import camisa2de1 from '../../assets/img/logo-site.jpeg';
export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  images: string[];
  category: string;
  availableSizes?: string[]; // ex: ['P','M'] ou ['M']
}

export const products: Product[] = [
  {
    id: 1,
    name: "Camisa Preta Streetwear",
    price: 89.90,
    description: "Camisa de malha premium em algodão, estilo streetwear. Perfeita para ocasiões estilosas e elegantes.",
    images: [ camisa1, camisa2de1 ],
    category: "Oversized Streetwear",
    availableSizes: ['M']
  }
];
