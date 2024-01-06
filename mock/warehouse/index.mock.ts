import Mock from 'mockjs'
import { SUCCESS_CODE } from '@/constants'
import { toAnyString } from '@/utils'
// import { status } from 'nprogress'

const timeout = 1000

const adminList = [
  {
    path: '/dashboard',
    component: '#',
    redirect: '/dashboard/analysis',
    name: 'Dashboard',
    meta: {
      title: 'router.dashboard',
      icon: 'ant-design:dashboard-filled',
      alwaysShow: true
    },
    children: [
      {
        path: 'analysis',
        component: 'views/Dashboard/Analysis',
        name: 'Analysis',
        meta: {
          title: 'router.analysis',
          noCache: true,
          affix: true
        }
      },
      {
        path: 'workplace',
        component: 'views/Dashboard/Workplace',
        name: 'Workplace',
        meta: {
          title: 'router.workplace',
          noCache: true,
          affix: true
        }
      }
    ]
  },
  {
    path: '/authorization',
    component: '#',
    redirect: '/authorization/user',
    name: 'Authorization',
    meta: {
      title: 'router.authorization',
      icon: 'eos-icons:role-binding',
      alwaysShow: true
    },
    children: [
      {
        path: 'department',
        component: 'views/Authorization/Department/Department',
        name: 'Department',
        meta: {
          title: 'router.department'
        }
      },
      {
        path: 'user',
        component: 'views/Authorization/User/User',
        name: 'User',
        meta: {
          title: 'router.user'
        }
      },
      {
        path: 'menu',
        component: 'views/Authorization/Menu/Menu',
        name: 'Menu',
        meta: {
          title: 'router.menuManagement'
        }
      },
      {
        path: 'role',
        component: 'views/Authorization/Role/Role',
        name: 'Role',
        meta: {
          title: 'router.role'
        }
      },
      {
        path: 'warehouse',
        component: 'views/Authorization/Warehouse/Warehouse',
        name: 'Warehouse',
        meta: {
          title: 'router.warehouse'
        }
      }
    ]
  }
]

const testList: string[] = [
  '/dashboard',
  '/dashboard/analysis',
  '/dashboard/workplace',
  '/authorization',
  '/authorization/department',
  '/authorization/user',
  '/authorization/role',
  '/authorization/menu',
  '/authorization/warehouse'
]

const List: any[] = []

const goodsNames = ['商品1', '商品2', '商品3', '商品4']
const menus = [
  [
    {
      path: '/dashboard',
      component: '#',
      redirect: '/dashboard/analysis',
      name: 'Dashboard',
      status: Mock.Random.integer(0, 1),
      id: 1,
      meta: {
        title: '首页',
        icon: 'ant-design:dashboard-filled',
        alwaysShow: true
      },
      children: [
        {
          path: 'analysis',
          component: 'views/Dashboard/Analysis',
          name: 'Analysis',
          status: Mock.Random.integer(0, 1),
          id: 2,
          meta: {
            title: '分析页',
            noCache: true
          }
        },
        {
          path: 'workplace',
          component: 'views/Dashboard/Workplace',
          name: 'Workplace',
          status: Mock.Random.integer(0, 1),
          id: 3,
          meta: {
            title: '工作台',
            noCache: true
          }
        }
      ]
    }
  ],
  [
    {
      path: '/dashboard',
      component: '#',
      redirect: '/dashboard/analysis',
      name: 'Dashboard',
      status: Mock.Random.integer(0, 1),
      id: 1,
      meta: {
        title: '首页',
        icon: 'ant-design:dashboard-filled',
        alwaysShow: true
      },
      children: [
        {
          path: 'analysis',
          component: 'views/Dashboard/Analysis',
          name: 'Analysis',
          status: Mock.Random.integer(0, 1),
          id: 2,
          meta: {
            title: '分析页',
            noCache: true
          }
        },
        {
          path: 'workplace',
          component: 'views/Dashboard/Workplace',
          name: 'Workplace',
          status: Mock.Random.integer(0, 1),
          id: 3,
          meta: {
            title: '工作台',
            noCache: true
          }
        }
      ]
    }
  ]
]

for (let i = 0; i < 4; i++) {
  List.push(
    Mock.mock({
      id: toAnyString(),
      // timestamp: +Mock.Random.date('T'),
      goodsName: goodsNames[i],
      role: '@first',
      goodsNumber: Mock.Random.integer(0, 99),
      status: function () {
        console.log('goodsNumber in function', this.goodsNumber)
        return this.goodsNumber === 0 ? 0 : 1
      },
      createTime: '@datetime',
      remark: '@cword(10, 15)',
      menu: menus[i]
    })
  )
}

export default [
  // 列表接口
  {
    url: '/mock/warehouse/list',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: adminList
      }
    }
  },
  {
    url: '/mock/warehouse/table',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          list: List,
          total: 4
        }
      }
    }
  },
  // 列表接口
  {
    url: '/mock/warehosue/list2',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: testList
      }
    }
  },
  {
    url: '/mock/warehosue/table',
    method: 'get',
    timeout,
    response: () => {
      return {
        code: SUCCESS_CODE,
        data: {
          list: List,
          total: 4
        }
      }
    }
  }
]
