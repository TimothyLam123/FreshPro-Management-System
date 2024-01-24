<script setup lang="tsx">
import { reactive, ref, unref } from 'vue'
import { getPlanningListApi } from '@/api/planning'
import { useTable } from '@/hooks/web/useTable'
import { useI18n } from '@/hooks/web/useI18n'
import { Table, TableColumn } from '@/components/Table'
import { Search } from '@/components/Search'
import { FormSchema } from '@/components/Form'
import { ContentWrap } from '@/components/ContentWrap'
import Write from './components/Write.vue'
import Acceptance from './components/Acceptance.vue'
import { Dialog } from '@/components/Dialog'
import { BaseButton } from '@/components/Button'
import { template } from 'lodash-es'
import Mock from 'mockjs'

const { t } = useI18n()

const { tableRegister, tableState, tableMethods } = useTable({
  fetchDataApi: async () => {
    const res = await getPlanningListApi()
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
            <BaseButton type="primary" onClick={() => actionEdit(row, 'edit')}>
              {t('exampleDemo.edit')}
            </BaseButton>
            <BaseButton type="success" onClick={() => actionAcceptance(row, index, 'acceptance')}>
              {t('planning.acceptance')}
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
    label: t('planning.goodsName'),
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
const currentIndex = ref()

const writeRef = ref<ComponentRef<typeof Write>>()

const saveLoading = ref(false)

const actionEdit = (row: any, type: string) => {
  dialogTitle.value = t('exampleDemo.edit')
  actionType.value = type
  currentRow.value = row
  dialogVisible.value = true
}

const actionAcceptance = (row: any, index: any, type: string) => {
  dialogTitle.value = t('planning.acceptance')
  actionType.value = type
  currentRow.value = row
  currentIndex.value = index
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
    currentRow.value.orderID = formData.orderID
    currentRow.value.goodsName = formData.goodsName
    currentRow.value.orderQuantity = formData.orderQuantity
    currentRow.value.orderBudget = formData.orderBudget
    currentRow.value.supplierName = formData.supplierName
    if (currentRow.value.goodsNumber == 0) {
      currentRow.value.status = 0
    } else {
      currentRow.value.status = 1
    }
  }
  if (actionType.value == 'add') {
    currentRow.value.remark = Mock.mock('@cword(10,15)')
    currentRow.value.orderTime = Mock.Random.now()
    dataList.value.push(currentRow.value)
  }
}

const acceptance = async () => {
  saveLoading.value = true
  setTimeout(() => {
    saveLoading.value = false
    dialogVisible.value = false
  }, 1000)
  console.log('currentRow value', currentRow.value)
  dataList.value.splice(currentIndex.value, 1)
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
    <Write v-if="actionType !== 'acceptance'" ref="writeRef" :current-row="currentRow" />
    <Acceptance v-else :current-row="currentRow" />

    <template #footer>
      <BaseButton v-if="actionType == 'edit'" type="primary" :loading="saveLoading" @click="save">
        {{ t('exampleDemo.save') }}
      </BaseButton>

      <BaseButton
        v-if="actionType == 'acceptance'"
        type="primary"
        :loading="saveLoading"
        @click="acceptance"
      >
        {{ t('planning.acceptance') }}
      </BaseButton>
      <BaseButton @click="dialogVisible = false">{{ t('dialogDemo.close') }}</BaseButton>
    </template>
  </Dialog>
</template>
