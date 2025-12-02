// Крок 1. Типи товарів

export type BaseProduct = {
  id: number;
  name: string;
  price: number;
  description?: string;
  inStock: boolean;
};

export type Electronics = BaseProduct & {
  category: "electronics";
  brand: string;
  warrantyMonths: number;
};

export type Clothing = BaseProduct & {
  category: "clothing";
  size: "XS" | "S" | "M" | "L" | "XL";
  color: string;
  material: string;
};

export type Book = BaseProduct & {
  category: "book";
  author: string;
  genre: string;
  pages: number;
};

export type AnyProduct = Electronics | Clothing | Book;

// Крок 2. Функції для пошуку/фільтрації

export const findProduct = <T extends BaseProduct>(
  products: T[],
  id: number
): T | undefined => {
  if (!Array.isArray(products)) {
    return undefined;
  }
  if (typeof id !== "number" || !Number.isFinite(id)) {
    return undefined;
  }
  return products.find((product) => product.id === id);
};

export const filterByPrice = <T extends BaseProduct>(
  products: T[],
  maxPrice: number
): T[] => {
  if (!Array.isArray(products)) {
    return [];
  }
  if (typeof maxPrice !== "number" || maxPrice < 0) {
    return [];
  }
  return products.filter((product) => product.price <= maxPrice);
};

// Крок 3. Кошик

export type CartItem<T> = {
  product: T;
  quantity: number;
};

export const addToCart = <T extends BaseProduct>(
  cart: CartItem<T>[],
  product: T,
  quantity: number
): CartItem<T>[] => {
  if (!product) {
    return cart;
  }
  if (!Number.isFinite(quantity) || quantity <= 0) {
    return cart;
  }

  const existingIndex = cart.findIndex(
    (item) => item.product.id === product.id
  );

  if (existingIndex !== -1) {
    const updatedCart = [...cart];
    const existingItem = updatedCart[existingIndex];
    updatedCart[existingIndex] = {
      ...existingItem,
      quantity: existingItem.quantity + quantity,
    };
    return updatedCart;
  }

  return [...cart, { product, quantity }];
};

export const calculateTotal = <T extends BaseProduct>(
  cart: CartItem<T>[]
): number => {
  if (!Array.isArray(cart)) {
    return 0;
  }
  return cart.reduce((sum, item) => {
    return sum + item.product.price * item.quantity;
  }, 0);
};

// Крок 4. Тестові дані та демонстрація

const electronics: Electronics[] = [
  {
    id: 1,
    name: "Смартфон",
    price: 10000,
    description: "Смартфон з 128GB пам'яті",
    inStock: true,
    category: "electronics",
    brand: "Samsung",
    warrantyMonths: 24,
  },
  {
    id: 2,
    name: "Ноутбук",
    price: 35000,
    description: "Ігровий ноутбук",
    inStock: false,
    category: "electronics",
    brand: "Asus",
    warrantyMonths: 12,
  },
];

const clothing: Clothing[] = [
  {
    id: 3,
    name: "Футболка",
    price: 500,
    description: "Біла базова футболка",
    inStock: true,
    category: "clothing",
    size: "M",
    color: "white",
    material: "cotton",
  },
  {
    id: 4,
    name: "Куртка",
    price: 2500,
    description: "Зимова куртка",
    inStock: true,
    category: "clothing",
    size: "L",
    color: "black",
    material: "polyester",
  },
];

const books: Book[] = [
  {
    id: 5,
    name: "Clean Code",
    price: 800,
    description: "Книга про чистий код",
    inStock: true,
    category: "book",
    author: "Robert C. Martin",
    genre: "Programming",
    pages: 464,
  },
  {
    id: 6,
    name: "The Pragmatic Programmer",
    price: 900,
    description: "Практичні поради для розробників",
    inStock: false,
    category: "book",
    author: "Andrew Hunt, David Thomas",
    genre: "Programming",
    pages: 352,
  },
];

const phone = findProduct(electronics, 1);
console.log("Телефон:", phone);

const cheapClothes = filterByPrice(clothing, 1000);
console.log("Одяг до 1000:", cheapClothes);

const cheapBooks = filterByPrice(books, 850);
console.log("Книги до 850:", cheapBooks);

let electronicsCart: CartItem<Electronics>[] = [];

if (phone) {
  electronicsCart = addToCart(electronicsCart, phone, 1);
}

const laptop = findProduct(electronics, 2);
if (laptop) {
  electronicsCart = addToCart(electronicsCart, laptop, 2);
}

console.log("Кошик електроніки:", electronicsCart);
console.log("Сума:", calculateTotal(electronicsCart));

let bookCart: CartItem<Book>[] = [];

const cleanCode = findProduct(books, 5);
if (cleanCode) {
  bookCart = addToCart(bookCart, cleanCode, 3);
}

console.log("Кошик книг:", bookCart);
console.log("Сума:", calculateTotal(bookCart));

let clothingCart: CartItem<Clothing>[] = [];

const tshirt = findProduct(clothing, 3);
if (tshirt) {
  clothingCart = addToCart(clothingCart, tshirt, 2);
}

console.log("Кошик одягу:", clothingCart);
console.log("Сума:", calculateTotal(clothingCart));
