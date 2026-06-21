import { createApiClient } from '../../vue-user/services/apiClient'

const api = createApiClient()

export interface LayoutOption {
  value: string
  label: string
}

export interface LayoutsResponse {
  data: LayoutOption[]
}

export const layoutService = {
  getAll() {
    return api.get<LayoutsResponse>('/api/theme/layouts')
  }
}
