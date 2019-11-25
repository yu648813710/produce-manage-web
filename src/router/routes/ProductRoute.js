/**
 * 使用sort对路由模块进行排序
 * icon需使用ant-design内置的icon
 */
export default {
  sort: 2,
  routes: [
    {
      path: '/Home',
      name: 'Home',
      hidden: true,
      component: () => import('@/views/Home.vue'),
      meta: { name: '首页' }
    },
    {
      path: '/GrowthMonitoringList',
      name: 'GrowthMonitoringList',
      hidden: true,
      component: () => import('@/views/Production/growthMonitoring/earlyWarning/growthMonitoringList.vue'),
      meta: {
        name: '地块监控列表',
        icon: '',
        nodeNo: 'RuleMonitoringList'
      }
    },
    {
      path: '/RuleMonitoringList',
      name: 'RuleMonitoringList',
      component: () => import('@/views/ruleEarlyWarning/ruleList.vue'),
      meta: {
        name: '地块预警规则列表',
        icon: '',
        nodeNo: 'RuleMonitoringList'
      }
    },
    {
      path: '/taskManage',
      name: 'taskManage',
      component: () => import('@/views/taskManageList/taskManageList.vue'),
      meta: {
        name: '任务管理',
        icon: '',
        nodeNo: 'taskManage'
      }
    },
    {
      path: 'growth',
      name: 'growth',
      component: () => import('@/views/Production/index.vue'),
      meta: {
        name: '生长监控',
        icon: '',
        nodeNo: 'production'
      },
      children: [
        {
          path: 'growthMonitore',
          name: 'growthMonitore',
          component: () => import('@/views/Production/growthMonitore/growthMonitore.vue'),
          meta: { name: '生长监控大屏', icon: '' }
        },
        {
          path: 'growthWarringList',
          name: 'growthWarringList',
          component: () => import('@/views/Production/growthMonitore/warringList.vue'),
          meta: { name: '生长监控预警汇总列表', icon: '', parentMenuName: 'growthMonitore' }
        },
        {
          path: 'growthWarringnewlist',
          name: 'growthWarringnewlist',
          component: () => import('@/views/Production/growthMonitore/warringNewList.vue'),
          meta: { name: '生长监控预警列表', icon: '', parentMenuName: 'growthMonitore' }
        },
        {
          path: 'RuleMonitoringList',
          name: 'RuleMonitoringList',
          hidden: false,
          component: () => import('@/views/Production/RuleList/index.vue'),
          meta: { name: '加工车间预警规则列表', icon: '' }
        }
      ]
    },
    {
      path: 'production',
      name: 'production',
      component: () => import('@/views/Production/index.vue'),
      meta: { name: '生产监控', icon: '' },
      children: [
        {
          path: 'produceMonitore',
          name: 'produceMonitore',
          component: () => import('@/views/Production/produceMonitore/growthMonitore.vue'),
          meta: { name: '生产监控大屏', icon: '' }
        },
        {
          path: 'warringList',
          name: 'warringList',
          component: () => import('@/views/Production/produceMonitore/warringList.vue'),
          meta: { name: '生产监控预警汇总列表', icon: '', parentMenuName: 'growthMonitore' }
        },
        {
          path: 'warringnewlist',
          name: 'warringnewlist',
          component: () => import('@/views/Production/produceMonitore/warringNewList.vue'),
          meta: { name: '生产监控预警列表', icon: '', parentMenuName: 'growthMonitore' }
        },
        {
          path: 'rulelist',
          name: 'rulelist',
          hidden: false,
          component: () => import('@/views/Production/RuleList/index.vue'),
          meta: { name: '加工车间预警规则列表', icon: '' }
        }
      ]
    },
    {
      path: '/marketStatic',
      name: 'marketStatic',
      component: () => import('@/views/marketStatic/marketStatic/marketStatic.vue'),
      meta: {
        name: '销售市场分析',
        icon: '',
        nodeNo: 'marketStatic'
      }
    },
    {
      path: '/farmPlan',
      name: 'farmPlan',
      component: () => import('@/views/farmPlan/farmPlan.vue'),
      meta: {
        name: '农事计划',
        icon: '',
        nodeNo: 'farmPlan'
      }
    },
    {
      path: '/farmPlanDetail',
      name: 'farmPlanDetail',
      hidden: true,
      component: () => import('@/views/farmPlan/farmPlanDetail.vue'),
      meta: {
        name: '农事计划详情',
        icon: '',
        parentMenuName: 'farmPlan',
        nodeNo: 'farmPlan'
      }
    },
    {
      path: '/addNewFarmPlan',
      name: 'addNewFarmPlan',
      hidden: true,
      component: () => import('@/views/farmPlan/addNewFarmPlan.vue'),
      meta: {
        name: '新增农事计划',
        icon: '',
        nodeNo: 'farmPlan'
      }
    },
    {
      path: '/addOtherFarmPlan',
      name: 'addOtherFarmPlan',
      hidden: true,
      component: () => import('@/views/farmPlan/addOtherFarmPlan.vue'),
      meta: {
        name: '新增临时任务',
        icon: '',
        nodeNo: 'farmPlan'
      }
    },
    {
      path: '/outgoingmanagement',
      name: 'outgoingmanagement',
      component: () => import('@/views/outgoingManagement/OutgoingManagement.vue'),
      meta: {
        name: '出库管理',
        icon: '',
        nodeNo: 'outgoingmanagement'
      }
    },
    {
      path: '/productionbatchmanagement',
      name: 'ProductionBatchManagement',
      component: () => import('@/views/productionBatchManagement/ProductionBatchManagement.vue'),
      meta: {
        name: '生产批次管理',
        icon: '',
        nodeNo: 'ProductionBatchManagement'
      }
    },
    {
      path: '/tobepurchased',
      name: 'tobepurchased',
      component: () => import('@/views/tobepurchased/TobePurchased.vue'),
      meta: {
        name: '待采购管理',
        icon: '',
        nodeNo: 'tobepurchased'
      }
    },
    {
      path: '/tobepurchaseddateil',
      name: 'TobePurchasedDateil',
      hidden: true,
      component: () => import('@/views/tobepurchased/TobePurchasedDateil.vue'),
      meta: {
        name: '待采购管理详情',
        icon: '',
        parentMenuName: 'tobepurchased',
        nodeNo: 'tobepurchased'
      }
    },
    {
      path: '/purchaseManagement',
      name: 'purchaseManagement',
      hidden: false,
      component: () => import('@/views/purchaseManagement'),
      meta: {
        name: '采购管理',
        icon: '',
        nodeNo: 'purchaseManagement'
      }
    },
    {
      path: '/purchaseMngDetail',
      name: 'purchaseMngDetail',
      hidden: true,
      component: () => import('@/views/purchaseManagement/detail'),
      meta: {
        name: '采购管理详情',
        icon: '',
        nodeNo: 'purchaseManagement'
      }
    },
    {
      path: '/bacteriabagtaskmanagement',
      name: 'BacteriaBagTaskManagement',
      component: () => import('@/views/bacteriaBagTaskManagement/BacteriaBagTaskManagement.vue'),
      meta: {
        name: '菌包任务管理',
        icon: '',
        nodeNo: 'BacteriaBagTaskManagement'
      }
    },
    {
      path: '/addbacteriabagtask',
      name: 'AddBacteriaBagTask',
      hidden: true,
      component: () => import('@/views/bacteriaBagTaskManagement/AddBacteriaBagTask.vue'),
      meta: {
        name: '新增菌包任务',
        icon: '',
        nodeNo: 'BacteriaBagTaskManagement'
      }
    },
    {
      path: '/bacteriabagtaskdateil',
      name: 'BacteriaBagTaskDateil',
      hidden: true,
      component: () => import('@/views/bacteriaBagTaskManagement/BacteriaBagTaskDateil.vue'),
      meta: {
        name: '菌包任务详情',
        icon: '',
        nodeNo: 'BacteriaBagTaskManagement'
      }
    },
    {
      path: '/traceabilityofcultivation',
      name: 'TraceabilityOfCultivation',
      component: () => import('@/views/traceabilityOfCultivation/TraceabilityOfCultivation.vue'),
      meta: {
        name: '木耳栽培过程溯源',
        icon: '',
        nodeNo: 'TraceabilityOfCultivation'
      }
    },
    {
      path: '/detailtraceabilityofcultivation',
      name: 'DetailTraceabilityOfCultivation',
      hidden: true,
      component: () => import('@/views/traceabilityOfCultivation/DetailTraceabilityOfCultivation.vue'),
      meta: {
        name: '木耳溯源信息维护',
        icon: '',
        nodeNo: 'TraceabilityOfCultivation'
      }
    },
    {
      path: '/tempWorkerManage',
      name: 'TempWorkerManage',
      component: () => import('@/views/tempWorkerManage/TempWorkerManage.vue'),
      meta: {
        name: '临时工管理',
        icon: '',
        nodeNo: 'TempWorkerManage'
      }
    },
    {
      path: '/tempWorkerDetail',
      name: 'TempWorkerDetail',
      hidden: true,
      component: () => import('@/views/tempWorkerManage/TempWorkerDetail.vue'),
      meta: {
        name: '临时工详情',
        icon: '',
        nodeNo: 'TempWorkerManage'
      }
    },
    {
      path: '/productionMeans',
      name: 'productionMeans',
      hidden: false,
      component: () => import('@/views/productionMeans'),
      meta: {
        name: '生产资料',
        icon: '',
        nodeNo: 'productionMeans'
      }
    },
    {
      path: '/addMeans',
      name: 'addMeans',
      hidden: true,
      component: () => import('@/views/productionMeans/addMeans'),
      meta: {
        name: '新增生产资料',
        icon: '',
        nodeNo: 'productionMeans'
      }
    },
    {
      path: '/productionMeansDetail',
      name: 'producitonMeansDetail',
      hidden: true,
      component: () => import('@/views/productionMeans/detail'),
      meta: {
        name: '生产资料详情',
        icon: '',
        nodeNo: 'productionMeans'
      }
    }
  ]
}
