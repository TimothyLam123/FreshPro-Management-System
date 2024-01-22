<script setup lang="tsx">
import { PropType, ref, nextTick } from 'vue'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { getMenuListApi } from '@/api/menu'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => undefined
  }
})

const treeData = ref<any[]>([])
const getMenuList = async () => {
  const res = await getMenuListApi()
  if (res) {
    treeData.value = res.data.list
    await nextTick()
  }
}
getMenuList()

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
    label: t('research.goodsQuality')
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
