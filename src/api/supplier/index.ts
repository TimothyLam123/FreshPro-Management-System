import request from '@/axios'

export const getSupplierListApi = () => {
  return request.get({ url: '/mock/supplier/table' })
}
