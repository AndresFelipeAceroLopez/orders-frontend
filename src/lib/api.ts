const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

// Helper for robust fetch
async function secureFetch(path: string, init?: RequestInit) {
  // Remove trailing slash from BASE_URL and leading slash from path
  const normalizedBase = BASE_URL.replace(/\/$/, '');
  const normalizedPath = path.startsWith('/api/') ? path.replace('/api', '') : path;
  const url = normalizedPath.startsWith('http') ? normalizedPath : `${normalizedBase}${normalizedPath}`;

  const res = await fetch(url, init);
  if (!res.ok) {
    let detail = '';
    try {
      const json = await res.json();
      detail = json.message || json.detail || JSON.stringify(json);
      if (json.errors) {
        console.group('Detailed Validation Error');
        console.error('URL:', url);
        console.error('Errors:', JSON.stringify(json.errors, null, 2));
        console.groupEnd();
      }
    } catch {
      try {
        detail = await res.text();
      } catch {
        detail = res.statusText;
      }
    }
    console.error(`API Error on ${url} (${res.status}):`, detail);
    throw new Error(detail || `Error del servidor (${res.status})`);
  }
  return res.json();
}

// ── Orders ──────────────────────────────────────────────────────────────────
export async function listOrders(params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return secureFetch(`/api/orders${qs ? '?' + qs : ''}`);
}

export async function getOrder(id: number | string) {
  return secureFetch(`/api/orders/${id}`);
}

export async function createOrder(data: object) {
  return secureFetch('/api/orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function patchOrder(id: number | string, data: object) {
  return secureFetch(`/api/orders/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteOrder(id: number | string) {
  const res = await fetch(`/api/orders/${id}`, { method: 'DELETE' });
  if (!res.ok && res.status !== 204) throw new Error('Error al eliminar pedido');
}

// ── Order Items ─────────────────────────────────────────────────────────────
export async function listItems(orderId: number | string) {
  return secureFetch(`/api/orders/${orderId}/items`);
}

export async function addItem(orderId: number | string, data: object) {
  return secureFetch(`/api/orders/${orderId}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function patchItem(orderId: number | string, itemId: number | string, data: object) {
  return secureFetch(`/api/orders/${orderId}/items/${itemId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function deleteItem(orderId: number | string, itemId: number | string) {
  const res = await fetch(`/api/orders/${orderId}/items/${itemId}`, { method: 'DELETE' });
  if (!res.ok && res.status !== 204) throw new Error('Error al eliminar ítem');
}

// ── Customers ───────────────────────────────────────────────────────────────
export async function listCustomers(params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return secureFetch(`/api/customers${qs ? '?' + qs : ''}`);
}

export async function getCustomer(id: number | string) {
  return secureFetch(`/api/customers/${id}`);
}

export async function createCustomer(data: object) {
  return secureFetch('/api/customers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function patchCustomer(id: number | string, data: object) {
  return secureFetch(`/api/customers/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

// ── Products ─────────────────────────────────────────────────────────────────
export async function listProducts(params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return secureFetch(`/api/products${qs ? '?' + qs : ''}`);
}

export async function getProduct(id: number | string) {
  return secureFetch(`/api/products/${id}`);
}

export async function createProduct(data: object) {
  return secureFetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function patchProduct(id: number | string, data: object) {
  return secureFetch(`/api/products/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

// ── Suppliers ────────────────────────────────────────────────────────────────
export async function listSuppliers(params: Record<string, string | number> = {}) {
  const qs = new URLSearchParams(params as Record<string, string>).toString();
  return secureFetch(`/api/suppliers${qs ? '?' + qs : ''}`);
}

export async function getSupplier(id: number | string) {
  return secureFetch(`/api/suppliers/${id}`);
}

export async function createSupplier(data: object) {
  return secureFetch('/api/suppliers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

export async function patchSupplier(id: number | string, data: object) {
  return secureFetch(`/api/suppliers/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}

