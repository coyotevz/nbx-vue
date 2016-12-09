import SuppliersList from './components/supplier/List'
import SuppliersDetail from './components/supplier/Detail'

export default [
  { path: '', redirect: { name: 'suppliers:list' } },
  {
    path: '/suppliers',
    name: 'suppliers:list',
    component: SuppliersList,
  },
  {
    path: '/suppliers/:id',
    name: 'suppliers:detail',
    component: SuppliersDetail
  }
]
