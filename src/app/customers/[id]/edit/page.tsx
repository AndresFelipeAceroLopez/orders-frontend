'use client';
import { use } from 'react';
import CustomerForm from '../../../../components/forms/CustomerForm';

export default function EditCustomerPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  return <CustomerForm id={resolvedParams.id} />;
}
