import { createApiClient } from '../../vue-user/services/apiClient'

const api = createApiClient()

export interface ThemeData {
  name: string
  slug: string
  description: string
  preview: string
  config: Record<string, unknown>
}

export interface ThemeSettingResponse {
  slug: string
  label: string
  values: {
    theme: string | null
  }
  data: Record<string, ThemeData>
}

export const themeService = {
  getSetting() {
    return api.get<ThemeSettingResponse>('/api/setting/theme')
  },

  updateSetting(themeSlug: string) {
    return api.post('/api/setting/theme', { theme: themeSlug })
  },
}

