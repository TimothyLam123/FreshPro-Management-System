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
    field: 'orderID',
    label: t('planning.orderID'),
    component: 'Input'
  },
  {
    field: 'goodsName',
    label: t('planning.goodsName'),
    component: 'Input'
  },
  {
    field: 'orderQuantity',
    label: t('planning.orderQuantity'),
    component: 'Input'
  },
  {
    field: 'orderBudget',
    label: t('planning.orderBudget'),
    component: 'Input'
  },
  {
    field: 'supplierName',
    label: t('planning.supplierName'),
    component: 'Input'
  }
])

const rules = reactive({
  orderID: [required()],
  goodsName: [required()],
  orderQuantity: [required()],
  orderBudget: [required()],
  supplierName: [required()]
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
