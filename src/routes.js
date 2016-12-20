import Dashboard from 'components/Dashboard'

import SuppliersList from 'components/supplier/List'
import SupplierDetail from 'components/supplier/Detail'
import SupplierEdit from 'components/supplier/Edit'

import DocumentsList from 'components/documents/List'

import OrdersList from 'components/orders/List'

export default [
  { path: '', redirect: { name: 'dashboard' } },
  {
    path: '/',
    name: 'dashboard',
    component: Dashboard,
  },
  {
    path: '/suppliers',
    name: 'suppliers:list',
    component: SuppliersList,
  },
  {
    path: '/suppliers/:id',
    name: 'suppliers:detail',
    component: SupplierDetail
  },
  {
    path: '/suppliers/:id/edit',
    name: 'suppliers:edit',
    component: SupplierEdit,
  },
  {
    path: '/documents',
    name: 'documents:list',
    component: DocumentsList,
  },
  {
    path: '/orders',
    name: 'orders:list',
    component: OrdersList,
  }
]
