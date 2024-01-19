<script setup lang="tsx">
import { PropType, ref, nextTick } from 'vue'
import { Descriptions, DescriptionsSchema } from '@/components/Descriptions'
import { ElTag } from 'element-plus'
import { getMenuListApi } from '@/api/menu'
import { useI18n } from '@/hooks/web/useI18n'

const { t } = useI18n()

defineProps({
  currentRow: {
    type: Object as PropType<any>,
    default: () => undefined
  }
})

const renderTag = (enable?: boolean) => {
  return (
    <ElTag type={!enable ? 'danger' : 'success'}>
      {enable ? t('research.enable') : t('research.disable')}
    </ElTag>
  )
}

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
    field: 'status',
    label: t('research.status'),
    slots: {
      default: (data: any) => {
        return renderTag(data.status)
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
