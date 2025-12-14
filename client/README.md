Области хранения данных:

- база данных на json-server
- BFF
- store redux-store

Сущности приложения:

- Пользователь: БД ( список пользователей ), BFF ( сессия текущего пользователя ), store ( для отображения в браузере )
- Роль пользователя: БД ( список ролей ), BFF ( сессия пользователя с ролью ), store ( использование на клиенте )
- Товары: БД ( список товаров ), store ( отображение в браузере )
- Категория товара: БД ( список категорий товаров ), store ( отображение в браузере )
- Корзина: БД ( Список заказов ), store ( отображение в браузере текущей корзина покупателя )

Таблицы БД:

- Пользователи - users: [
  {
  "id": "string",
  "email": "string",
  "password": "string",
  "registeredAt": "string (ISO date)",
  "roleId": "number"
  }
  ],

- Товар - products: [
  {
  "id": "string",
  "title": "string",
  "description": "string",
  "price": "number",
  "imageUrl": "string",
  "categoryId": "string",
  "inStock": "boolean",
  "createdAt": "timestamp"
  }
  ]

- Категории товара - categories: [
  {
  "id": "string",
  "name": "string"
  }
  ]

- Заказ - orders: [
  {
  "id": "string",
  "userId": "string",
  "items": [
  {
  "productId": "string",
  "quantity": "number",
  "price": "number"
  }
  ],
  "totalPrice": "number",
  "status": "string",
  <!-- 'pending', 'completed', cancelled -->
  "createdAt": "timestamp"
  }
  ]

Схема состояния на BFF:

- session: {

  UserId: string,
  email: string,
  role: string,
  cart: {
  items: CartItem[],
  totalPrice: number
  }
  }

Схема для redux store ( на клиенте ):
{
user: {
id: string | null,
email: string | null,
role: 'ADMIN' | 'USER" | null,
isLoading: boolean,
error: string
},

products: {
items: Product[],
categories: Category[],
selectedCategory: string | null,
searchQuery: string,
sortBy: 'price_asc' | 'price_desc' | 'name',
isLoading: boolean,
error: string | null
},

productData: {
data: Product
isLoading: boolean,
error: string | null
},

cart: {
items: [
{
productId: string,
quantity: number,
}
],
totalPrice: number,
isLoading: boolean
},

admin: {
products: Product[],
users: User[],
orders: Order[],
editingProduct: Product | null
}
}
