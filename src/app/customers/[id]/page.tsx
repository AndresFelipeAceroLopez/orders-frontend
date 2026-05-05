'use client';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import DataGrid, { Column, Pager, Paging, Button as GridButton } from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import { getCustomer } from '../../../lib/api';
import { Customer, Order, STATUS_LABELS, OrderStatus } from '../../../types';

export default function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;
  const router = useRouter();
  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    getCustomer(id).then(setCustomer).catch(() => {});
  }, [id]);

  if (!customer) return <div style={{ padding: 40 }}>Cargando...</div>;

  return (
    <div>
      <div className="breadcrumb">
        <Link href="/customers">Clientes</Link>
        <span className="breadcrumb-sep">/</span>
        <span>{customer.firstName} {customer.lastName}</span>
      </div>

      <div className="page-header">
        <h1 className="page-title">{customer.firstName} {customer.lastName}</h1>
        <div className="btn-row">
          <Button text="Editar" icon="edit" onClick={() => router.push(`/customers/${id}/edit`)} />
        </div>
      </div>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Información de contacto</div>
          <ul className="detail-list">
            <li><span className="label">Ciudad</span><span className="value">{customer.city}</span></li>
            <li><span className="label">País</span><span className="value">{customer.country}</span></li>
            <li><span className="label">Teléfono</span><span className="value">{customer.phone}</span></li>
          </ul>
        </div>

        <div className="card" style={{ padding: 0 }}>
          <div className="card-title" style={{ padding: '16px 20px 12px' }}>Historial de pedidos</div>
          <DataGrid dataSource={customer.orders} showBorders={false} showRowLines columnAutoWidth>
            <Paging defaultPageSize={10} />
            <Pager showInfo />
            <Column dataField="orderNumber" caption="Nro Pedido" />
            <Column dataField="orderDate"   caption="Fecha" dataType="date" />
            <Column dataField="totalAmount" caption="Total" format={{ type: 'currency', precision: 2 }} />
            <Column
              dataField="status"
              caption="Estado"
              cellRender={({ data }: { data: Order }) => (
                <span className={`badge badge-${data.status}`}>{STATUS_LABELS[data.status as OrderStatus]}</span>
              )}
            />
            <Column type="buttons">
              <GridButton icon="eyeopen" onClick={(e: any) => router.push(`/orders/${e.row.data.id}`)} />
            </Column>
          </DataGrid>
        </div>
      </div>
    </div>
  );
}
