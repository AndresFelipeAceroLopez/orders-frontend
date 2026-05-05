'use client';
import { use } from 'react';
import SupplierForm from '../../../../components/forms/SupplierForm';

export default function EditSupplierPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <SupplierForm id={resolvedParams.id} />;
}
