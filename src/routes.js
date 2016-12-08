import SuppliersList from './components/supplier/List'

export default [
  { path: '', redirect: { name: 'suppliers' } },
  {
    path: '/suppliers',
    name: 'suppliers',
    component: SuppliersList,
  },
]
