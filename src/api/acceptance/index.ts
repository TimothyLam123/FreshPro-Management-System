import request from '@/axios'

export const getAcceptanceListApi = () => {
  return request.get({ url: '/mock/acceptance/table' })
}
