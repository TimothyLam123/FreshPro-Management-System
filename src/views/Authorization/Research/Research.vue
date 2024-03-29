<script setup lang="tsx">
import { reactive, ref, unref, h } from 'vue'
import { getResearchListApi } from '@/api/research'
import { useTable } from '@/hooks/web/useTable'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { ElTag } from 'element-plus'
import { Search } from '@/components/Search'
import { FormSchema } from '@/components/Form'
import { ContentWrap } from '@/components/ContentWrap'
import Write from './components/Write.vue'
import Detail from './components/Detail.vue'
import { Dialog } from '@/components/Dialog'
import { BaseButton } from '@/components/Button'
import { template } from 'lodash-es'
import Mock from 'mockjs'

const { t } = useI18n()

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const res = await getResearchListApi()
    return {
      list: res.data.list || [],
      total: res.data.total
    }
  }
})

const { dataList, loading, total } = tableState
const { getList } = tableMethods

const tableColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('userDemo.index'),
    type: 'index'
  },
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
    formatter: (_: Recordable, __: TableColumn, cellValue: number) => {
      return h(
        ElTag,
        {
          type: cellValue === 1 ? 'success' : cellValue === 2 ? 'warning' : 'danger'
        },
        () =>
          cellValue === 1
            ? t('research.strongRecommend')
            : cellValue === 2
              ? t('research.recommend')
              : t('research.notRecommend')
      )
    }
  },
  {
    field: 'remark',
    label: t('userDemo.remark')
  },
  {
    field: 'action',
    label: t('userDemo.action'),
    width: 240,
    slots: {
      default: (data: any) => {
        const row = data.row
        const index = data.$index
        return (
          <>
            <BaseButton type="primary" onClick={() => action(row, 'edit')}>
              {t('exampleDemo.edit')}
            </BaseButton>
            <BaseButton type="success" onClick={() => action(row, 'detail')}>
              {t('exampleDemo.detail')}
            </BaseButton>
            <BaseButton type="danger" onClick={() => handleDelete(index)}>
              {t('exampleDemo.del')}
            </BaseButton>
          </>
        )
      }
    }
  }
])

const searchSchema = reactive<FormSchema[]>([
  {
    field: 'goodsName',
    label: t('research.goodsName'),
    component: 'Input'
  }
])

const searchParams = ref({})
const setSearchParams = (data: any) => {
  searchParams.value = data
  const tempList = dataList.value.filter((item) => {
    return item.goodsName.indexOf(data.goodsName) !== -1
  })
  if (tempList.length > 0) {
    dataList.value = []
    dataList.value.push(...tempList)
  } else {
    dataList.value = []
  }
}

const reset = () => {
  getList()
}

const dialogVisible = ref(false)
const dialogTitle = ref('')

const currentRow = ref()
const actionType = ref('')

const writeRef = ref<ComponentRef<typeof Write>>()

const saveLoading = ref(false)

const action = (row: any, type: string) => {
  dialogTitle.value = t(type === 'edit' ? 'exampleDemo.edit' : 'exampleDemo.detail')
  actionType.value = type
  currentRow.value = row
  dialogVisible.value = true
}

const handleDelete = (index: any) => {
  dataList.value.splice(index, 1)
}

const AddAction = async () => {
  dialogTitle.value = t('exampleDemo.add')
  currentRow.value = {}
  dialogVisible.value = true
  actionType.value = 'add'
}

const save = async () => {
  const write = unref(writeRef)
  const formData = await write?.submit()
  if (formData) {
    saveLoading.value = true
    setTimeout(() => {
      saveLoading.value = false
      dialogVisible.value = false
    }, 1000)
    currentRow.value.goodsName = formData.goodsName
    currentRow.value.supplierName = formData.supplierName
    currentRow.value.goodsPrice = formData.goodsPrice
    currentRow.value.goodsQuality = formData.goodsQuality
  }
  if (actionType.value == 'add') {
    currentRow.value.remark = Mock.mock('@cword(10,15)')
    dataList.value.push(currentRow.value)
  }
}
</script>

<template>
  <ContentWrap>
    <Search :schema="searchSchema" @reset="reset" @search="setSearchParams" />
    <div class="mb-10px">
      <BaseButton type="primary" @click="AddAction">{{ t('exampleDemo.add') }}</BaseButton>
    </div>
    <Table
      :columns="tableColumns"
      default-expand-all
      node-key="id"
      :data="dataList"
      :loading="loading"
      :pagination="{
        total
      }"
      @register="tableRegister"
    />
  </ContentWrap>

  <Dialog v-model="dialogVisible" :title="dialogTitle">
    <Write v-if="actionType !== 'detail'" ref="writeRef" :current-row="currentRow" />
    <Detail v-else :current-row="currentRow" />

    <template #footer>
      <BaseButton
        v-if="actionType !== 'detail'"
        type="primary"
        :loading="saveLoading"
        @click="save"
      >
        {{ t('exampleDemo.save') }}
      </BaseButton>
      <BaseButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</BaseButton>
    </template>
  </Dialog>
</template>
