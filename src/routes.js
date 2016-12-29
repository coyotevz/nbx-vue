import Dashboard from 'components/Dashboard'

import SuppliersList from 'components/supplier/List'
import SupplierDetail from 'components/supplier/Detail'
import SupplierEdit from 'components/supplier/Edit'
import SupplierProfile from 'components/supplier/Profile'
import SupplierDocuments from 'components/supplier/Documents'
import SupplierOrders from 'components/supplier/Orders'
import SupplierData from 'components/supplier/Data'
import SupplierContacts from 'components/supplier/Contacts'

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
    component: SupplierDetail,
    children: [
      {
        path: '',
        name: 'suppliers:detail',
        component: SupplierProfile,
      },
      {
        path: 'documents',
        name: 'suppliers:detail:documents',
        component: SupplierDocuments,
      },
      {
        path: 'orders',
        name: 'suppliers:detail:orders',
        component: SupplierOrders
      },
      {
        path: 'data',
        name: 'suppliers:detail:data',
        component: SupplierData,
      },
      {
        path: 'contacts',
        name: 'suppliers:detail:contacts',
        component: SupplierContacts,
      },
    ],
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
