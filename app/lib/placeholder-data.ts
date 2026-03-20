// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const customers = [
  {
    id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
    name: 'Evil Rabbit',
    email: 'evil@rabbit.com',
    image_url: '/customers/evil-rabbit.png',
  },
  {
    id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
    name: 'Delba de Oliveira',
    email: 'delba@oliveira.com',
    image_url: '/customers/delba-de-oliveira.png',
  },
  {
    id: '3958dc9e-742f-4377-85e9-fec4b6a6442a',
    name: 'Lee Robinson',
    email: 'lee@robinson.com',
    image_url: '/customers/lee-robinson.png',
  },
  {
    id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
    name: 'Michael Novotny',
    email: 'michael@novotny.com',
    image_url: '/customers/michael-novotny.png',
  },
  {
    id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
    name: 'Amy Burns',
    email: 'amy@burns.com',
    image_url: '/customers/amy-burns.png',
  },
  {
    id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
    name: 'Balazs Orban',
    email: 'balazs@orban.com',
    image_url: '/customers/balazs-orban.png',
  },
];

const invoices = [
  {
    customer_id: customers[0].id,
    amount: 15795,
    status: 'pending',
    date: '2022-12-06',
  },
  {
    customer_id: customers[1].id,
    amount: 20348,
    status: 'pending',
    date: '2022-11-14',
  },
  {
    customer_id: customers[4].id,
    amount: 3040,
    status: 'paid',
    date: '2022-10-29',
  },
  {
    customer_id: customers[3].id,
    amount: 44800,
    status: 'paid',
    date: '2023-09-10',
  },
  {
    customer_id: customers[5].id,
    amount: 34577,
    status: 'pending',
    date: '2023-08-05',
  },
  {
    customer_id: customers[2].id,
    amount: 54246,
    status: 'pending',
    date: '2023-07-16',
  },
  {
    customer_id: customers[0].id,
    amount: 666,
    status: 'pending',
    date: '2023-06-27',
  },
  {
    customer_id: customers[3].id,
    amount: 32545,
    status: 'paid',
    date: '2023-06-09',
  },
  {
    customer_id: customers[4].id,
    amount: 1250,
    status: 'paid',
    date: '2023-06-17',
  },
  {
    customer_id: customers[5].id,
    amount: 8546,
    status: 'paid',
    date: '2023-06-07',
  },
  {
    customer_id: customers[1].id,
    amount: 500,
    status: 'paid',
    date: '2023-08-19',
  },
  {
    customer_id: customers[5].id,
    amount: 8945,
    status: 'paid',
    date: '2023-06-03',
  },
  {
    customer_id: customers[2].id,
    amount: 1000,
    status: 'paid',
    date: '2022-06-05',
  },
];

const revenue = [
  { month: 'Jan', revenue: 2000 },
  { month: 'Feb', revenue: 1800 },
  { month: 'Mar', revenue: 2200 },
  { month: 'Apr', revenue: 2500 },
  { month: 'May', revenue: 2300 },
  { month: 'Jun', revenue: 3200 },
  { month: 'Jul', revenue: 3500 },
  { month: 'Aug', revenue: 3700 },
  { month: 'Sep', revenue: 2500 },
  { month: 'Oct', revenue: 2800 },
  { month: 'Nov', revenue: 3000 },
  { month: 'Dec', revenue: 4800 },
];

const products = [
  {
    id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
    name: 'Laptop Pro 15',
    price: 129999,
    category: 'Electronics',
    stock: 25,
    description: 'High-performance laptop with 15-inch display',
    image_url: '/products/laptop.png',
  },
  {
    id: 'b2c3d4e5-f6a7-8901-bcde-f12345678901',
    name: 'Wireless Mouse',
    price: 2999,
    category: 'Accessories',
    stock: 150,
    description: 'Ergonomic wireless mouse with Bluetooth',
    image_url: '/products/mouse.png',
  },
  {
    id: 'c3d4e5f6-a7b8-9012-cdef-123456789012',
    name: 'Mechanical Keyboard',
    price: 8999,
    category: 'Accessories',
    stock: 80,
    description: 'RGB mechanical keyboard with Cherry MX switches',
    image_url: '/products/keyboard.png',
  },
  {
    id: 'd4e5f6a7-b8c9-0123-defa-234567890123',
    name: '4K Monitor',
    price: 49999,
    category: 'Electronics',
    stock: 15,
    description: '27-inch 4K UHD monitor with HDR',
    image_url: '/products/monitor.png',
  },
  {
    id: 'e5f6a7b8-c9d0-1234-efab-345678901234',
    name: 'USB-C Hub',
    price: 4599,
    category: 'Accessories',
    stock: 200,
    description: '7-in-1 USB-C hub with HDMI and SD card reader',
    image_url: '/products/hub.png',
  },
  {
    id: 'f6a7b8c9-d0e1-2345-fabc-456789012345',
    name: 'Noise Cancelling Headphones',
    price: 29999,
    category: 'Audio',
    stock: 45,
    description: 'Premium ANC headphones with 30h battery',
    image_url: '/products/headphones.png',
  },
  {
    id: 'a7b8c9d0-e1f2-3456-abcd-567890123456',
    name: 'Webcam HD',
    price: 7999,
    category: 'Electronics',
    stock: 60,
    description: '1080p webcam with built-in microphone',
    image_url: '/products/webcam.png',
  },
  {
    id: 'b8c9d0e1-f2a3-4567-bcde-678901234567',
    name: 'Desk Lamp LED',
    price: 3499,
    category: 'Office',
    stock: 120,
    description: 'Adjustable LED desk lamp with USB charging',
    image_url: '/products/lamp.png',
  },
];

export { users, customers, invoices, revenue, products };
