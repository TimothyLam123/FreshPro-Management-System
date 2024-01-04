import request from '@/axios'

export const getWarehouseListApi = () => {
  return request.get({ url: '/mock/warehouse/table' })
}
