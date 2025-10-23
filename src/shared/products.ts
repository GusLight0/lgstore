import beje from '../../assets/img/bege (1).jpeg';
import beje2 from '../../assets/img/bege (2).jpeg';
import beje4 from '../../assets/img/bege (4).jpeg';
import beje5 from '../../assets/img/bege (5).jpeg';
import beje6 from '../../assets/img/bege (6).jpeg';

import azul2 from '../../assets/img/azul-escuro (2).jpeg';
import azul3 from '../../assets/img/azul-escuro (3).jpeg';
import azul4 from '../../assets/img/azul-escuro (4).jpeg';
import azul5 from '../../assets/img/azul-escuro (5).jpeg';
import azul6 from '../../assets/img/azul-escuro (6).jpeg';
import azul7 from '../../assets/img/azul-escuro (7).jpeg';

import branca from '../../assets/img/branco.jpeg';
import branca1 from '../../assets/img/branco (5).jpeg';
import branca2 from '../../assets/img/branco (6).jpeg';
import branca3 from '../../assets/img/branco (7).jpeg';

import cinza from '../../assets/img/cinza (1).jpeg';
import cinza2 from '../../assets/img/cinza (2).jpeg';
import cinza3 from '../../assets/img/cinza (3).jpeg';

import verdeEscuro from '../../assets/img/verde-escuro (1).jpeg';
import verdeEscuro2 from '../../assets/img/verde-escuro (2).jpeg';
import verdeEscuro3 from '../../assets/img/verde-escuro (3).jpeg';
import verdeEscuro4 from '../../assets/img/verde-escuro (4).jpeg';
import verdeEscuro5 from '../../assets/img/verde-escuro (5).jpeg';

import preta from '../../assets/img/preto (1).jpeg';
import preta2 from '../../assets/img/preto (2).jpeg';
import preta3 from '../../assets/img/preto (3).jpeg';
import preta4 from '../../assets/img/preto (4).jpeg';
import preta5 from '../../assets/img/preto (5).jpeg';

import brancaIncial from '../../assets/img/brancaInicial.jpeg';
import azulInicial from '../../assets/img/azulInicial.jpeg';
import pretaInicial from '../../assets/img/pretaInicial.jpeg';
import verdeInicial from '../../assets/img/verdeInicial.jpeg';
import cinzaInicial from '../../assets/img/cinzaInicial.jpeg';
import begeInicial from '../../assets/img/bejeInicial.jpeg';

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
    name: "Camisa Branca Streetwear",
    price: 69.90,
    description: "Camisa de malhão premium em algodão, estilo streetwear. Perfeita para ocasiões estilosas e elegantes.",
    images: [ brancaIncial, branca3, branca1, branca2, branca ],
    category: "Streetwear",
    availableSizes: ['M']
  },
  {
    id: 2,
    name: "Camisa Verde-Escuro Streetwear",
    price: 69.90,
    description: "Camisa de malhão premium em algodão, estilo streetwear. Perfeita para ocasiões estilosas e elegantes.",
    images: [ verdeInicial ,verdeEscuro5, verdeEscuro3, verdeEscuro2, verdeEscuro4, verdeEscuro ],
    category: "Streetwear",
    availableSizes: ['GG']
  },
  {
    id: 3,
    name: "Camisa Preta Streetwear",
    price: 69.90,
    description: "Camisa Preta de malhão premium em algodão, estilo streetwear. Perfeita para ocasiões estilosas e elegantes.",
    images: [ pretaInicial, preta, preta3, preta2, preta4, preta5 ],
    category: "Streetwear",
    availableSizes: ['G']
  },
  {
    id: 4,
    name: "Camisa Azul Streetwear",
    price: 69.90,
    description: "Camisa Azul de malhão premium em algodão, estilo streetwear. Perfeita para ocasiões estilosas e elegantes.",
    images: [ azulInicial , azul6, azul3, azul2, azul5, azul4, azul7 ],
    category: "Streetwear",
    availableSizes: ['M']
  },
  {
    id: 5,
    name: "Camisa Cinza Streetwear",
    price: 69.90,
    description: "Camisa Cinza de malhão premium em algodão, estilo streetwear. Perfeita para ocasiões estilosas e elegantes.",
    images: [  cinzaInicial, cinza, cinza2, cinza3 ],
    category: "Streetwear",
    availableSizes: ['M']
  },
  {
    id: 6,
    name: "Camisa Bege Streetwear",
    price: 69.90,
    description: "Camisa Bege de malhão premium em algodão, estilo streetwear. Perfeita para ocasiões estilosas e elegantes.",
    images: [  begeInicial, beje5, beje2, beje4, beje, beje6 ],
    category: "Streetwear",
    availableSizes: ['G']
  }
];
