<script setup lang="tsx">
import { PropType, ref } from 'vue'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => undefined
  }
})

const detailSchema = ref<DescriptionsSchema[]>([
  {
    field: 'goodsName',
    label: t('warehouse.goodsName')
  },
  {
    field: 'goodsPrice',
    label: t('warehouse.goodsPrice')
  },
  {
    field: 'goodsNumber',
    label: t('warehouse.goodsNumber')
  },
  {
    field: 'goodsType',
    label: t('warehouse.goodsType')
  },
  {
    field: 'remark',
    label: t('userDemo.remark'),
    span: 24
  }
])
</script>

<template>
  <Descriptions :schema="detailSchema" :data="currentRow || {}" />
</template>
