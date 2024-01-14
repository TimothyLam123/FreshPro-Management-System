<script setup lang="tsx">
import { reactive, ref, unref } from 'vue'
import { getWarehouseListApi } from '@/api/warehouse'
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

const { t } = useI18n()

// const { tableRegister, tableState, tableMethods } = useTable({
const { tableRegister, tableState } = useTable({
  fetchDataApi: async () => {
    const res = await getWarehouseListApi()
    return {
      list: res.data.list || [],
      total: res.data.total
    }
  }
})

const { dataList, loading, total } = tableState
// const { getList } = tableMethods

const tableColumns = reactive<TableColumn[]>([
  {
    field: 'index',
    label: t('userDemo.index'),
    type: 'index'
  },
  {
    field: 'goodsName',
    label: t('warehouse.goodsName')
  },
  {
    field: 'goodsNumber',
    label: t('warehouse.goodsNumber')
  },
  {
    field: 'status',
    label: t('menu.status'),
    slots: {
      default: (data: any) => {
        return (
          <>
            <ElTag type={data.row.status === 0 ? 'danger' : 'success'}>
              {data.row.status === 1 ? t('warehouse.enable') : t('warehouse.disable')}
            </ElTag>
          </>
        )
      }
    }
  },
  {
    field: 'createTime',
    label: t('tableDemo.displayTime')
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
    label: t('warehouse.goodsName'),
    component: 'Input'
  }
])

// const handler = {}
const searchParams = ref({})
const setSearchParams = (data: any) => {
  console.log('data from search params', data.goodsName)
  searchParams.value = data
  // console.log('searchParams', searchParams.value.goodsName)
  const tempList = dataList.value.filter((item) => {
    console.log('item', item.goodsName)
    return item.goodsName.indexOf(data.goodsName) !== -1
  })
  console.log('tempList', tempList)
  console.log('dataList', dataList.value)
  // getList()
  if (tempList.length > 0) {
    // dataList.value = tempList
    dataList.value = []
    dataList.value.push(tempList)
    // dataList.value = new Proxy([tempList], handler)
    console.log('dataList123', dataList.value)
  } else {
    dataList.value = []
  }
  console.log('dataList', dataList)
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

const AddAction = () => {
  dialogTitle.value = t('exampleDemo.add')
  currentRow.value = undefined
  dialogVisible.value = true
  actionType.value = ''
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
    currentRow.value.goodsNumber = formData.goodsNumber
    if (currentRow.value.goodsNumber == 0) {
      currentRow.value.status = 0
    } else {
      currentRow.value.status = 1
    }
  }
}
</script>

<template>
  <ContentWrap>
    <Search :schema="searchSchema" @reset="setSearchParams" @search="setSearchParams" />
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
