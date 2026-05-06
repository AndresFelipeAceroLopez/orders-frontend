'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useRef } from 'react';
import DataGrid, {
  Column, Pager, Paging, FilterRow, SearchPanel, Button as GridButton,
} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import CustomStore from 'devextreme/data/custom_store';
import { Order, STATUS_LABELS, OrderStatus } from '../../types';


const statusBadge = (status: OrderStatus) => {
  const label = STATUS_LABELS[status] ?? status;
  return `<span class="badge badge-${status}">${label}</span>`;
};

const store = new CustomStore({
  key: 'id',
  load(opts) {
    const page  = Math.floor((opts.skip ?? 0) / (opts.take ?? 20)) + 1;
    const limit = opts.take ?? 20;
    const params = new URLSearchParams({ page: String(page), limit: String(limit) });
    
    return fetch(`/api/orders?${params}`)
      .then(async (r) => {
        if (!r.ok) {
          const text = await r.text();
          console.error(`API Error (${r.status}):`, text);
          throw new Error(`Server returned ${r.status}`);
        }
        return r.json();
      })
      .then((d) => {
        if (d.items === undefined || d.total === undefined) {
          console.error('Unexpected API response structure:', d);
          // Fallback to avoid E4021 if total is missing, but log it
          return {
            data: d.items ?? [],
            totalCount: d.total ?? (Array.isArray(d) ? d.length : 0),
          };
        }
        return { data: d.items, totalCount: d.total };
      })
      .catch((err) => {
        console.error('CustomStore Load Error:', err);
        throw err;
      });
  },
});

export default function OrdersPage() {
  const router = useRouter();

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Pedidos</h1>
        <Button text="Nuevo Pedido" type="default" icon="plus" onClick={() => router.push('/orders/new')} />
      </div>

      <div className="card" style={{ padding: 0 }}>
        <DataGrid
          dataSource={store}
          remoteOperations={{ paging: true }}
          showBorders={false}
          showRowLines
          columnAutoWidth
        >
          <FilterRow visible />
          <SearchPanel visible placeholder="Buscar..." />
          <Paging defaultPageSize={20} />
          <Pager showPageSizeSelector allowedPageSizes={[10, 20, 50]} showInfo />

          <Column dataField="id"          caption="#"         width={60} allowFiltering={false} />
          <Column dataField="orderNumber" caption="N° Pedido" width={140} />
          <Column
            caption="Cliente"
            calculateCellValue={(row: Order) =>
              row.customer ? `${row.customer.firstName} ${row.customer.lastName}` : ''
            }
          />
          <Column dataField="orderDate"   caption="Fecha"  dataType="date" format="dd/MM/yyyy" width={110} />
          <Column dataField="totalAmount" caption="Total"  format={{ type: 'currency', precision: 2 }} width={120} />
          <Column
            dataField="status"
            caption="Estado"
            width={130}
            cellRender={({ data }: { data: Order }) => (
              <span
                className={`badge badge-${data.status}`}
                dangerouslySetInnerHTML={{ __html: STATUS_LABELS[data.status] ?? data.status }}
              />
            )}
          />
          <Column type="buttons" width={60}>
            <GridButton icon="eyeopen" hint="Ver" onClick={(e: any) => router.push(`/orders/${e.row.data.id}`)} />
          </Column>
        </DataGrid>
      </div>
    </div>
  );
}
