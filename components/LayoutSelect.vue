<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Select from '@admin/components/ui/Select.vue'
import Label from '@admin/components/ui/Label.vue'
import FieldError from '@admin/components/ui/FieldError.vue'
import { layoutService, type LayoutOption } from '../services/layoutService'

const props = withDefaults(defineProps<{
  modelValue?: string | null
  errors?: string | string[] | null
  label?: string
  placeholder?: string
  id?: string
}>(), {
  label: 'Sablon',
  placeholder: 'Válassz sablont...',
  id: 'layout',
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void
}>()

const options = ref<LayoutOption[]>([])

onMounted(async () => {
  try {
    const { data } = await layoutService.getAll()
    options.value = data.data
    if (!props.modelValue && options.value.length > 0) {
      emit('update:modelValue', options.value[0].value)
    }
  } catch {
    // fallback: empty list
  }
})
</script>

<template>
  <div class="space-y-2">
    <Label :for="id" class="text-sm font-medium">{{ label }}</Label>
    <Select
      :id="id"
      :model-value="modelValue"
      :options="options"
      :placeholder="placeholder"
      @update:model-value="emit('update:modelValue', $event as string | null)"
    />
    <FieldError :errors="errors" />
  </div>
</template>
