<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { AdminLayout } from '@admin'
import { Check, Palette } from 'lucide-vue-next'
import { themeService } from '../services/themeService'

interface Theme {
  id: string
  name: string
  description: string
  thumbnail: string
  active: boolean
}

const themes = ref<Theme[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

const thumbnailUrl = (theme: string, name: string) =>
  theme || `https://placehold.co/400x250?text=${encodeURIComponent(name)}`

const loadThemes = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await themeService.getSetting()
    const { values, data } = response.data
    themes.value = Object.values(data).map((theme) => ({
      id: theme.slug,
      name: theme.name,
      description: theme.description,
      thumbnail: thumbnailUrl(theme.preview, theme.name),
      active: values.theme === theme.slug,
    }))
  } catch (e) {
    error.value = 'Nem sikerült betölteni a témákat.'
  } finally {
    loading.value = false
  }
}

const activateTheme = async (themeId: string) => {
  try {
    await themeService.updateSetting(themeId)
    themes.value = themes.value.map((t) => ({
      ...t,
      active: t.id === themeId,
    }))
  } catch (e) {
    error.value = 'Nem sikerült aktiválni a témát.'
  }
}

onMounted(() => {
  loadThemes()
})
</script>

<template>
  <AdminLayout page-title="Témák">
    <div class="space-y-6">
      <!-- Page Header -->
      <div class="flex items-center gap-3">
        <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Palette class="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 class="text-xl font-semibold text-foreground">Témakezelő</h1>
          <p class="text-sm text-muted-foreground">Válassz témát a weboldal megjelenéséhez</p>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex items-center justify-center py-16 text-muted-foreground">
        <span class="text-sm">Témák betöltése...</span>
      </div>

      <!-- Error -->
      <div
        v-else-if="error"
        class="rounded-lg border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive"
      >
        {{ error }}
      </div>

      <!-- Theme Grid -->
      <div v-else class="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        <div
          v-for="theme in themes"
          :key="theme.id"
          :class="[
            'group relative flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm transition-all duration-200 hover:shadow-md',
            theme.active
              ? 'border-primary ring-2 ring-primary/30'
              : 'border-border hover:border-primary/50',
          ]"
        >
          <!-- Active Badge -->
          <div
            v-if="theme.active"
            class="absolute right-3 top-3 z-10 flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow"
          >
            <Check class="h-3 w-3" />
            Aktív
          </div>

          <!-- Thumbnail -->
          <div class="relative aspect-video w-full overflow-hidden bg-muted">
            <img
              :src="theme.thumbnail"
              :alt="theme.name"
              class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>

          <!-- Content -->
          <div class="flex flex-1 flex-col p-4">
            <h3 class="text-base font-semibold text-foreground">{{ theme.name }}</h3>
            <p class="mt-1 flex-1 text-sm text-muted-foreground">{{ theme.description }}</p>

            <!-- Action -->
            <div class="mt-4">
              <button
                v-if="!theme.active"
                @click="activateTheme(theme.id)"
                class="w-full rounded-lg border border-primary px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Téma aktiválása
              </button>
              <div
                v-else
                class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
              >
                <Check class="h-4 w-4" />
                Jelenleg aktív
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

