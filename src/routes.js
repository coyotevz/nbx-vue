import Dashboard from 'components/Dashboard'
import SuppliersList from 'components/supplier/List'
import SuppliersDetail from 'components/supplier/Detail'
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
    component: SuppliersDetail
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
