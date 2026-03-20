import { invoices, customers, revenue, products } from './placeholder-data';
import { CustomerField, InvoiceForm, ProductForm } from './definitions';

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// We make mutable copies of the placeholder data so we can perform CRUD operations in memory.
// Note: In Next.js dev server, this state might reset on hot reloads, but it's enough for a prototype.

export const db = {
  invoices: invoices.map(i => ({ 
    ...i, 
    id: uuidv4() 
  })),
  customers: [...customers],
  revenue: [...revenue],
  products: products.map(p => ({ 
    ...p, 
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  })),
};
