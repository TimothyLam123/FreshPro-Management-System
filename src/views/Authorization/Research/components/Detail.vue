<script setup lang="tsx">
import { PropType, ref } from 'vue'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { ElTag } from 'element-plus'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => undefined
  }
})

const renderTag = (cellValue: number) => {
  return (
    <ElTag type={cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'}>
      {cellValue === 1
        ? t('research.strongRecommend')
        : cellValue === 2
          ? t('research.recommend')
          : t('research.notRecommend')}
    </ElTag>
  )
}

const detailSchema = ref<DescriptionsSchema[]>([
  {
    field: 'goodsName',
    label: t('research.goodsName')
  },
  {
    field: 'supplierName',
    label: t('research.supplierName')
  },
  {
    field: 'goodsPrice',
    label: t('research.goodsPrice')
  },
  {
    field: 'goodsQuality',
    label: t('research.goodsQuality'),
    slots: {
      default: (data: any) => {
        return renderTag(data.goodsQuality)
      }
    }
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
