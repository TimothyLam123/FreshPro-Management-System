<script setup lang="tsx">
import { PropType, ref } from 'vue'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'
import { useForm } from '@/hooks/web/useForm'

const { t } = useI18n()

const { formMethods } = useForm()
const { getFormData, getElFormExpose } = formMethods

defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => undefined
  }
})

const acceptanceSchema = ref<DescriptionsSchema[]>([
  {
    field: 'orderID',
    label: t('planning.orderID')
  },
  {
    field: 'goodsName',
    label: t('planning.goodsName')
  },
  {
    field: 'orderQuantity',
    label: t('planning.orderQuantity')
  },
  {
    field: 'orderBudget',
    label: t('planning.orderBudget')
  },
  {
    field: 'supplierName',
    label: t('planning.supplierName')
  },
  {
    field: 'orderTime',
    label: t('planning.orderTime')
  },
  {
    field: 'remark',
    label: t('userDemo.remark'),
    span: 24
  }
])

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

defineExpose({
  submit
})
</script>

<template>
  <Descriptions :schema="acceptanceSchema" :data="currentRow || {}" />
</template>
