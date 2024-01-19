import request from '@/axios'

export const getResearchListApi = () => {
  return request.get({ url: '/mock/research/table' })
}
