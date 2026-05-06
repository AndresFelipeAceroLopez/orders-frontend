const envUrl = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.NEXT_PUBLIC_API_URL;
const BASE_URL = envUrl ? `${envUrl.replace(/\/$/, '')}/api/v1` : '/api';
const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`
  : '';

async function secureFetch(path: string, init?: RequestInit) {
  const url = `${API_URL}${path}`;

  const res = await fetch(url, init);

  if (!res.ok) {
    let detail = '';
    try {
      const json = await res.json();
      detail = json.message || json.detail || JSON.stringify(json);
    } catch {
      detail = await res.text();
    }

    console.error(`API Error on ${url} (${res.status}):`, detail);
    throw new Error(detail || `Error del servidor (${res.status})`);
  }

  return res.json();
}

// ── Orders ──────────────────────────────────────────────────────────────────
export async function listOrders(params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return secureFetch(`/orders${qs ? '?' + qs : ''}`);
}

export async function getOrder(id: number | string) {
  return secureFetch(`/orders/${id}`);
}

export async function createOrder(data: object) {
  return secureFetch('/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function patchOrder(id: number | string, data: object) {
  return secureFetch(`/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteOrder(id: number | string) {
  await secureFetch(`/orders/${id}`, { method: 'DELETE' });
}

// ── Order Items ─────────────────────────────────────────────────────────────
export async function listItems(orderId: number | string) {
  return secureFetch(`/orders/${orderId}/items`);
}

export async function addItem(orderId: number | string, data: object) {
  return secureFetch(`/api/orders/${orderId}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function patchItem(orderId: number | string, itemId: number | string, data: object) {
  return secureFetch(`/orders/${orderId}/items/${itemId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteItem(orderId: number | string, itemId: number | string) {
  await secureFetch(`/orders/${orderId}/items/${itemId}`, { method: 'DELETE' });
}

// ── Customers ───────────────────────────────────────────────────────────────
export async function listCustomers(params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return secureFetch(`/customers${qs ? '?' + qs : ''}`);
}

export async function getCustomer(id: number | string) {
  return secureFetch(`/customers/${id}`);
}

export async function createCustomer(data: object) {
  return secureFetch('/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function patchCustomer(id: number | string, data: object) {
  return secureFetch(`/customers/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

// ── Products ─────────────────────────────────────────────────────────────────
export async function listProducts(params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return secureFetch(`/products${qs ? '?' + qs : ''}`);
}

export async function getProduct(id: number | string) {
  return secureFetch(`/products/${id}`);
}

export async function createProduct(data: object) {
  return secureFetch('/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function patchProduct(id: number | string, data: object) {
  return secureFetch(`/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

// ── Suppliers ────────────────────────────────────────────────────────────────
export async function listSuppliers(params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return secureFetch(`/suppliers${qs ? '?' + qs : ''}`);
}

export async function getSupplier(id: number | string) {
  return secureFetch(`/suppliers/${id}`);
}

export async function createSupplier(data: object) {
  return secureFetch('/suppliers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function patchSupplier(id: number | string, data: object) {
  return secureFetch(`/suppliers/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

