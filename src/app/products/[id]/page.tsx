'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from 'devextreme-react/button';
import { getProduct } from '../../../lib/api';
import { Product } from '../../../types';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    getProduct(id).then(setProduct).catch(() => {});
  }, [id]);

  if (!product) return <div style={{ padding: 40 }}>Cargando...</div>;

  return (
    <div>
      <div className="breadcrumb">
        <Link href="/products">Productos</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{product.productName}</span>
      </div>

      <div className="page-header">
        <h1 className="page-title">{product.productName}</h1>
        <div className="btn-row">
          <Button text="Editar" icon="edit" onClick={() => router.push(`/products/${id}/edit`)} />
        </div>
      </div>

      <div className="card" style={{ maxWidth: 600 }}>
        <div className="card-title">Detalles del Producto</div>
        <ul className="detail-list">
          <li>
            <span className="label">Estado</span>
            <span className={`badge ${product.isDiscontinued ? 'badge-disc' : 'badge-active'}`}>
              {product.isDiscontinued ? 'Discontinuado' : 'Activo'}
            </span>
          </li>
          <li>
            <span className="label">Proveedor</span>
            <span className="value">
              {product.supplier ? (
                <Link href={`/suppliers/${product.supplier.id}`}>{product.supplier.companyName}</Link>
              ) : 'N/A'}
            </span>
          </li>
          <li>
            <span className="label">Precio Unitario</span>
            <span className="value fw-bold">${product.unitPrice.toFixed(2)}</span>
          </li>
          <li>
            <span className="label">Envase / Empaque</span>
            <span className="value">{product.package}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
