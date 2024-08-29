import { db } from '@vercel/postgres';
import { products, reviews, faqs } from '../lib/data';

const client = await db.connect();


async function seedProducts() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS products (
      id PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT NOT NULL,
      img TEXT NOT NULL,
      price_in_cents INT NOT NULL,
      quantity INT NOT NULL,
      sizes TEXT[] NOT NULL,
    );
  `;

  const insertedProducts = await Promise.all(
    products.map(async (product) => {
      return client.sql`
        INSERT INTO users (id, name, description, img, price_in_cents, quantity, sizes)
        VALUES (${product.id}, ${product.name}, ${product.description},
                ${product.img}, ${product.price_in_cents}, ${product.quantity},
                ${product.sizes})
        ON CONFLICT (id) DO NOTHING;
      `;
    }),
  );

  return insertedProducts;
}


async function seedReviews() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS reviews (
      productId VARCHAR(255) references products(id) NOT NULL,
      rating INT NOT NULL,
      content TEXT NOT NULL,
      date TEXT NOT NULL,
      dateTime TEXT NOT NULL,
      author VARCHAR(255) NOT NULL,
      avatarSrc TEXT NOT NULL,
    );
  `;

  const insertedReviews = await Promise.all(
    reviews.map(async (review) => {
      return client.sql`
        INSERT INTO users (productId, rating, content, date, dateTime, author, avatarSrc)
        VALUES (${review.productId}, ${review.rating}, ${review.content},
                ${review.date}, ${review.datetime}, ${review.author},
                ${review.avatarSrc})
      `;
    }),
  );

  return insertedReviews;
}


async function seedFaqs() {
  await client.sql`
    CREATE TABLE IF NOT EXISTS faqs (
      productId VARCHAR(255) references products(id) NOT NULL,
      question TEXT NOT NULL,
      answer TEXT NOT NULL
    );
  `;

  const insertedFaqs = await Promise.all(
    faqs.map(async (faq) => {
      return client.sql`
        INSERT INTO users (productId, question, answer)
        VALUES (${faq.productId}, ${faq.question}, ${faq.answer})
      `;
    }),
  );

  return insertedFaqs;
}


export async function GET() {
  try {
    await client.sql`BEGIN`;
    await seedProducts();
    await seedReviews();
    await seedFaqs();
    await client.sql`COMMIT`;

    return Response.json({ message: 'Database seeded successfully' });
  } catch (error) {
    await client.sql`ROLLBACK`;
    return Response.json({ error }, { status: 500 });
  }
}