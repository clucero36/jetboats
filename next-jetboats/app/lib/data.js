const products = [
  {
    name: 'Tank Top',
    description: '100% Cotton JBC Tank Top. Manufactured in the USA.',
    img: '/jbTank.webp',
    id: '0.0.1',
    price_in_cents: '4000',
    quantity: 1,
    sizes: '{"lg", "xl", "xlg"}',
  },
  {
    name: 'T-Shirt',
    description: '100% Cotton JBC T-Shirt. Manufactured in the USA.',
    img: '/jbTee.webp',
    id: '0.0.2',
    price_in_cents: '3000',
    quantity: 1,
    sizes: '{"sm", "md", "lg"}',
  },
  {
    name: 'Earthen Bottle',
    description: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg',
    id: '0.0.3',
    price_in_cents: '4800',
    quantity: 1,
    sizes: '{"24oz", "32oz"}',
  },
  {
    name: 'Nomad Tumbler',
    description: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    img: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
    id: '0.0.4',
    price_in_cents: '3500',
    quantity: 1,
    sizes: '{"10oz", "20oz"}',
  }
]

const faqs = [
  {
    productId: products[0].id,
    question: 'Does the T-Shirt come in different colors?',
    answer: 'Currently the JBC T-Shirt comes in Black. We are currently working manufacturing more colors.',
  },
  {
    productId: products[0].id,
    question: 'Is the T-Shirt image prone to fading?',
    answer: 'Yes. We reccomend washing the T-Shirt inside out with cold water.',
  },
  {
    productId: products[1].id,
    question: 'Will the Tank-Top be sold in smaller sizes?',
    answer: 'No. The JBC Tank-Tops run small. We reccomend buying a lg if you are under 5"8, an xlg if you are under 6"0, and a 2xl otherwise.',
  },
  {
    productId: products[2].id,
    question: 'Is the Earthen Bottle dishwasher safe?',
    answer: 'Yes. The JBC Earthen Bottle is 100% dishwasher safe.',
  },
  {
    productId: products[2].id,
    question: 'What is the Earthen Bottle made out of?',
    answer: 'The JBC Earthen Bottle is made from 100% recycled materials.',
  },
  {
    productId: products[3].id,
    question: 'Is the Nomad Tumbler insulated?',
    answer: 'Yes, the JBC Nomad Tumbler is made to insulate both hot and cold bevereages',
  }
]

const reviews = [
  {
    productId: products[0].id,
    rating: 5,
    content: 'I am in love with my T-Shirt! Great Quality! GO JBC!',
    date: 'July 16, 2021',
    datetime: '2021-07-16',
    author: 'Emily Selman',
    avatarSrc: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
  },
  {
    productId: products[0].id,
    rating: 5,
    content: 'Love Love Love This T-Shirt!',
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    author: 'Hector Gibbons',
    avatarSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
  },
  {
    productId: products[1].id,
    rating: 5,
    content: 'Bought this as a gift for my father. I feel its the only article of clothing he owns.',
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    author: 'Hector Gibbons',
    avatarSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
  },
  {
    productId: products[1].id,
    rating: 3,
    content: 'The size runs a little small. Or maybe I am just big. I love it nonetheless.',
    date: 'July 12, 2021',
    datetime: '2021-07-12',
    author: 'Hector Gibbons',
    avatarSrc: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
  },
  {
    productId: products[2].id,
    rating: 5,
    content: 'I fill this bottle up with cold lemon water & whenever I host dinners people ask where I got it. Great conversation starter.',
    date: 'July 16, 2021',
    datetime: '2021-07-16',
    author: 'Emily Selman',
    avatarSrc: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
  },
  {
    productId: products[3].id,
    rating: 5,
    content: 'I take this puppy with me everywhere I go. Super cool design.',
    date: 'July 16, 2021',
    datetime: '2021-07-16',
    author: 'Ylime Namles',
    avatarSrc: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80',
  },
]


export { products, faqs, reviews };