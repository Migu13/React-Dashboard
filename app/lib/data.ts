import {
  CustomerField,
  CustomerForm,
  CustomersTableType,
  InvoiceForm,
  InvoicesTable,
  LatestInvoiceRaw,
  ProductForm,
  ProductsTable,
  Revenue,
} from './definitions';
import { formatCurrency } from './utils';
import { db } from './mock-db';

export async function fetchRevenue() {
  return db.revenue;
}

export async function fetchLatestInvoices() {
  // Sort by date DESC and take 5
  const latestInvoicesRaw = [...db.invoices].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
  
  const latestInvoices = latestInvoicesRaw.map((invoice) => {
    const customer = db.customers.find((c) => c.id === invoice.customer_id);
    return {
      ...invoice,
      name: customer?.name || 'Unknown',
      image_url: customer?.image_url || '',
      email: customer?.email || '',
      amount: formatCurrency(invoice.amount),
    };
  });
  
  return latestInvoices;
}

export async function fetchCardData() {
  const numberOfInvoices = db.invoices.length;
  const numberOfCustomers = db.customers.length;
  
  const totalPaidInvoices = formatCurrency(db.invoices.filter(i => i.status === 'paid').reduce((sum, invoice) => sum + invoice.amount, 0));
  const totalPendingInvoices = formatCurrency(db.invoices.filter(i => i.status === 'pending').reduce((sum, invoice) => sum + invoice.amount, 0));

  return {
    numberOfCustomers,
    numberOfInvoices,
    totalPaidInvoices,
    totalPendingInvoices,
  };
}

const ITEMS_PER_PAGE = 6;

// ===== INVOICES =====

export async function fetchFilteredInvoices(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const lowerQuery = query.toLowerCase();

  const filtered = db.invoices.map(invoice => {
    const customer = db.customers.find(c => c.id === invoice.customer_id);
    return {
      id: invoice.id,
      amount: invoice.amount,
      date: invoice.date,
      status: invoice.status,
      name: customer?.name || '',
      email: customer?.email || '',
      image_url: customer?.image_url || '',
    };
  }).filter(invoice => 
    invoice.name.toLowerCase().includes(lowerQuery) ||
    invoice.email.toLowerCase().includes(lowerQuery) ||
    invoice.amount.toString().includes(lowerQuery) ||
    invoice.date.includes(lowerQuery) ||
    invoice.status.toLowerCase().includes(lowerQuery)
  ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return filtered.slice(offset, offset + ITEMS_PER_PAGE);
}

export async function fetchInvoicesPages(query: string) {
  const lowerQuery = query.toLowerCase();
  const count = db.invoices.filter(invoice => {
    const customer = db.customers.find(c => c.id === invoice.customer_id);
    return customer?.name.toLowerCase().includes(lowerQuery) ||
      customer?.email.toLowerCase().includes(lowerQuery) ||
      invoice.amount.toString().includes(lowerQuery) ||
      invoice.date.includes(lowerQuery) ||
      invoice.status.toLowerCase().includes(lowerQuery);
  }).length;

  return Math.ceil(count / ITEMS_PER_PAGE);
}

export async function fetchInvoiceById(id: string) {
  const invoice = db.invoices.find((i) => i.id === id);
  if (!invoice) return undefined;
  
  return {
    id: invoice.id,
    customer_id: invoice.customer_id,
    amount: invoice.amount / 100, // Convert to dollars for form
    status: invoice.status as 'pending' | 'paid',
  };
}

// ===== CUSTOMERS =====

export async function fetchCustomers() {
  return [...db.customers].sort((a, b) => a.name.localeCompare(b.name));
}

export async function fetchFilteredCustomers(query: string) {
  const lowerQuery = query.toLowerCase();
  
  const filtered = db.customers.filter(c => 
    c.name.toLowerCase().includes(lowerQuery) || 
    c.email.toLowerCase().includes(lowerQuery)
  ).map(customer => {
    const customerInvoices = db.invoices.filter(i => i.customer_id === customer.id);
    const total_invoices = customerInvoices.length;
    const pendingAmount = customerInvoices.filter(i => i.status === 'pending').reduce((sum, i) => sum + i.amount, 0);
    const paidAmount = customerInvoices.filter(i => i.status === 'paid').reduce((sum, i) => sum + i.amount, 0);
    
    return {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      image_url: customer.image_url,
      total_invoices,
      total_pending: formatCurrency(pendingAmount),
      total_paid: formatCurrency(paidAmount),
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
  
  return filtered;
}

export async function fetchCustomerById(id: string) {
  return db.customers.find((c) => c.id === id);
}

// ===== PRODUCTS =====

export async function fetchFilteredProducts(query: string, currentPage: number) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const lowerQuery = query.toLowerCase();

  const filtered = db.products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.price.toString().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  ).sort((a, b) => new Date(b.created_at || new Date()).getTime() - new Date(a.created_at || new Date()).getTime());

  return filtered.slice(offset, offset + ITEMS_PER_PAGE);
}

export async function fetchProductsPages(query: string) {
  const lowerQuery = query.toLowerCase();
  const count = db.products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.price.toString().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery)
  ).length;

  return Math.ceil(count / ITEMS_PER_PAGE);
}

export async function fetchProductById(id: string) {
  const product = db.products.find((p) => p.id === id);
  if (!product) return undefined;
  
  return {
    ...product,
    price: product.price / 100, // Convert to dollars for form
  };
}
