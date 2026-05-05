'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from 'devextreme-react/button';
import { getSupplier } from '../../../lib/api';
import { Supplier } from '../../../types';

export default function SupplierDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  const [supplier, setSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    getSupplier(id).then(setSupplier).catch(() => {});
  }, [id]);

  if (!supplier) return <div style={{ padding: 40 }}>Cargando...</div>;

  return (
    <div>
      <div className="breadcrumb">
        <Link href="/suppliers">Proveedores</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{supplier.companyName}</span>
      </div>

      <div className="page-header">
        <h1 className="page-title">{supplier.companyName}</h1>
        <div className="btn-row">
          <Button text="Editar" icon="edit" onClick={() => router.push(`/suppliers/${id}/edit`)} />
        </div>
      </div>

      <div className="card" style={{ maxWidth: 600 }}>
        <div className="card-title">Información del Proveedor</div>
        <ul className="detail-list">
          <li><span className="label">Contacto</span><span className="value">{supplier.contactName}</span></li>
          <li><span className="label">Ciudad</span><span className="value">{supplier.city}</span></li>
          <li><span className="label">País</span><span className="value">{supplier.country}</span></li>
          <li><span className="label">Teléfono</span><span className="value">{supplier.phone}</span></li>
        </ul>
      </div>
    </div>
  );
}
