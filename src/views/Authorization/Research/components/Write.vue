<script setup lang="tsx">
import { Form, FormSchema } from '@/components/Form'
import { useForm } from '@/hooks/web/useForm'
import { PropType, reactive, watch, ref } from 'vue'
import { useValidator } from '@/hooks/web/useValidator'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

const { required } = useValidator()

const props = defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => null
  }
})

const formSchema = ref<FormSchema[]>([
  {
    field: 'goodsName',
    label: t('research.goodsName'),
    component: 'Input'
  },
  {
    field: 'supplierName',
    label: t('research.supplierName'),
    component: 'Input'
  },
  {
    field: 'goodsPrice',
    label: t('research.goodsPrice'),
    component: 'Input'
  },
  {
    field: 'goodsQuality',
    label: t('research.goodsQuality'),
    component: 'Select',
    componentProps: {
      options: [
        {
          label: t('acceptance.disable'),
          value: 0
        },
        {
          label: t('acceptance.enable'),
          value: 1
        }
      ]
    }
  }
])

const rules = reactive({
  goodsName: [required()],
  supplierName: [required()],
  goodsQuality: [required()]
})

const { formRegister, formMethods } = useForm()
const { setValues, getFormData, getElFormExpose } = formMethods

const submit = async () => {
  const elForm = await getElFormExpose()
  const valid = await elForm?.validate().catch((err) => {
    console.log(err)
  })
  if (valid) {
    const formData = await getFormData()
    console.log('formData2', formData)
    return formData
  }
}

watch(
  () => props.currentRow,
  (currentRow) => {
    if (!currentRow) return
    setValues(currentRow)
  },
  {
    deep: true,
    immediate: true
  }
)

defineExpose({
  submit
})
</script>

<template>
  <Form :rules="rules" @register="formRegister" :schema="formSchema" />
</template>
