import request from '@/axios'

export const getPlanningListApi = () => {
  return request.get({ url: '/mock/planning/table' })
}
