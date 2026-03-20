'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { db } from './mock-db';

// Generate UUID for mock entries
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// ===== INVOICE SCHEMAS & ACTIONS =====

const InvoiceFormSchema = z.object({
  id: z.string(),
  customerId: z.string({
    invalid_type_error: 'Please select a customer.',
  }),
  amount: z.coerce
    .number()
    .gt(0, { message: 'Please enter an amount greater than $0.' }),
  status: z.enum(['pending', 'paid'], {
    invalid_type_error: 'Please select an invoice status.',
  }),
  date: z.string(),
});

const CreateInvoice = InvoiceFormSchema.omit({ id: true, date: true });
const UpdateInvoice = InvoiceFormSchema.omit({ id: true, date: true });

export type InvoiceState = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};

export async function createInvoice(prevState: InvoiceState, formData: FormData) {
  const validatedFields = CreateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  try {
    db.invoices.push({
      id: uuidv4(),
      customer_id: customerId,
      amount: amountInCents,
      status: status,
      date: date,
    });
  } catch (error) {
    return { message: 'Failed to Create Invoice in Mock DB.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(
  id: string,
  prevState: InvoiceState,
  formData: FormData,
) {
  const validatedFields = UpdateInvoice.safeParse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Invoice.',
    };
  }

  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;

  try {
    const invoiceIndex = db.invoices.findIndex(i => i.id === id);
    if (invoiceIndex !== -1) {
      db.invoices[invoiceIndex] = {
        ...db.invoices[invoiceIndex],
        customer_id: customerId,
        amount: amountInCents,
        status: status,
      };
    }
  } catch (error) {
    return { message: 'Failed to Update Invoice in Mock DB.' };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id: string) {
  try {
    db.invoices = db.invoices.filter(i => i.id !== id);
    revalidatePath('/dashboard/invoices');
  } catch (error) {
    console.error('Database Error: Failed to Delete Invoice.', error);
    throw new Error('Failed to Delete Invoice.');
  }
}

// ===== CUSTOMER SCHEMAS & ACTIONS =====

const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Please enter a customer name.' }),
  email: z.string().email({ message: 'Please enter a valid email.' }),
  image_url: z.string(),
});

const CreateCustomer = CustomerFormSchema.omit({ id: true });
const UpdateCustomer = CustomerFormSchema.omit({ id: true });

export type CustomerState = {
  errors?: {
    name?: string[];
    email?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

export async function createCustomer(prevState: CustomerState, formData: FormData) {
  const validatedFields = CreateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Customer.',
    };
  }

  const { name, email, image_url } = validatedFields.data;
  const finalImageUrl = image_url?.trim() || '/customers/evil-rabbit.png';

  try {
    db.customers.push({
      id: uuidv4(),
      name,
      email,
      image_url: finalImageUrl,
    });
  } catch (error) {
    return { message: 'Failed to Create Customer in Mock DB.' };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function updateCustomer(
  id: string,
  prevState: CustomerState,
  formData: FormData,
) {
  const validatedFields = UpdateCustomer.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    image_url: formData.get('image_url'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Customer.',
    };
  }

  const { name, email, image_url } = validatedFields.data;
  const finalImageUrl = image_url?.trim() || '/customers/evil-rabbit.png';

  try {
    const customerIndex = db.customers.findIndex(c => c.id === id);
    if (customerIndex !== -1) {
      db.customers[customerIndex] = {
        ...db.customers[customerIndex],
        name,
        email,
        image_url: finalImageUrl,
      };
    }
  } catch (error) {
    return { message: 'Failed to Update Customer in Mock DB.' };
  }

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  try {
    // First delete related invoices
    db.invoices = db.invoices.filter(i => i.customer_id !== id);
    db.customers = db.customers.filter(c => c.id !== id);
    revalidatePath('/dashboard/customers');
  } catch (error) {
    console.error('Database Error: Failed to Delete Customer.', error);
    throw new Error('Failed to Delete Customer.');
  }
}

// ===== PRODUCT SCHEMAS & ACTIONS =====

const ProductFormSchema = z.object({
  id: z.string(),
  name: z.string().min(1, { message: 'Please enter a product name.' }),
  price: z.coerce
    .number()
    .gt(0, { message: 'Please enter a price greater than $0.' }),
  category: z.string().min(1, { message: 'Please enter a category.' }),
  stock: z.coerce
    .number()
    .gte(0, { message: 'Stock cannot be negative.' }),
  description: z.string().min(1, { message: 'Please enter a description.' }),
  image_url: z.string(),
});

const CreateProduct = ProductFormSchema.omit({ id: true });
const UpdateProduct = ProductFormSchema.omit({ id: true });

export type ProductState = {
  errors?: {
    name?: string[];
    price?: string[];
    category?: string[];
    stock?: string[];
    description?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

export async function createProduct(prevState: ProductState, formData: FormData) {
  const validatedFields = CreateProduct.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    category: formData.get('category'),
    stock: formData.get('stock'),
    description: formData.get('description'),
    image_url: formData.get('image_url'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Product.',
    };
  }

  const { name, price, category, stock, description, image_url } = validatedFields.data;
  const finalImageUrl = image_url?.trim() || '/products/shoes.png';
  const priceInCents = price * 100;
  const dateStr = new Date().toISOString();

  try {
    db.products.push({
      id: uuidv4(),
      name,
      price: priceInCents,
      category,
      stock,
      description,
      image_url: finalImageUrl,
      created_at: dateStr,
      updated_at: dateStr,
    });
  } catch (error) {
    return { message: 'Failed to Create Product in Mock DB.' };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function updateProduct(
  id: string,
  prevState: ProductState,
  formData: FormData,
) {
  const validatedFields = UpdateProduct.safeParse({
    name: formData.get('name'),
    price: formData.get('price'),
    category: formData.get('category'),
    stock: formData.get('stock'),
    description: formData.get('description'),
    image_url: formData.get('image_url'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Product.',
    };
  }

  const { name, price, category, stock, description, image_url } = validatedFields.data;
  const finalImageUrl = image_url?.trim() || '/products/shoes.png';
  const priceInCents = price * 100;

  try {
    const productIndex = db.products.findIndex(p => p.id === id);
    if (productIndex !== -1) {
      db.products[productIndex] = {
        ...db.products[productIndex],
        name,
        price: priceInCents,
        category,
        stock,
        description,
        image_url: finalImageUrl,
        updated_at: new Date().toISOString(),
      };
    }
  } catch (error) {
    return { message: 'Failed to Update Product in Mock DB.' };
  }

  revalidatePath('/dashboard/products');
  redirect('/dashboard/products');
}

export async function deleteProduct(id: string) {
  try {
    db.products = db.products.filter(p => p.id !== id);
    revalidatePath('/dashboard/products');
  } catch (error) {
    console.error('Database Error: Failed to Delete Product.', error);
    throw new Error('Failed to Delete Product.');
  }
}

// ===== AUTHENTICATION =====

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (email === 'user@nextmail.com' && password === '123456') {
    redirect('/dashboard');
  } else {
    return 'Invalid credentials.';
  }
}
