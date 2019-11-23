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
      path: '/Check',
      name: 'Check',
      hidden: true,
      component: () => import('@/views/Production/Check.vue'),
      meta: { name: '菌包详情', icon: '', parentMenuName: 'BaseList' }
    },

    {
      path: '/BaseList',
      name: 'BaseList',
      hidden: true,
      component: () => import('@/views/Production/BaseList.vue'),
      meta: { name: '基地列表', icon: '' }
    },
    {
      path: '/GreenHouseList',
      name: 'GreenHouseList',
      hidden: true,
      component: () => import('@/views/Production/GreenHouseList.vue'),
      meta: { name: '大棚列表', icon: '' }
    },
    {
      path: '/ProductMaintainList',
      name: 'ProductMaintainList',
      hidden: true,
      component: () => import('@/views/Production/ProductMaintainList.vue'),
      meta: { name: '产品维护列表', icon: '' }
    },
    {
      path: '/Fungusbag',
      name: 'Fungusbag',
      hidden: true,
      component: () => import('@/views/Production/Fungusbag.vue'),
      meta: { name: '菌包列表', icon: '' }
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
    // {
    //   path: '/RuleMonitoringList',
    //   name: 'RuleMonitoringList',
    //   component: () => import('@/views/ruleEarlyWarning/ruleList.vue'),
    //   meta: { name: '地块预警规则列表', icon: '' }
    // },
    {
      path: '/taskManage',
      name: 'taskManage',
      component: () => import('@/views/taskManageList/taskManageList.vue'),
      meta: { name: '任务管理', icon: '' }
    },
    {
      path: 'growth',
      name: 'growth',
      component: () => import('@/views/Production/index.vue'),
      meta: { name: '生长监控', icon: '' },
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
          path: '/RuleMonitoringList',
          name: 'RuleMonitoringList',
          component: () => import('@/views/ruleEarlyWarning/ruleList.vue'),
          meta: { name: '地块预警规则列表', icon: '' }
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
      meta: { name: '销售市场分析', icon: '' }
    },
    {
      path: '/farmPlan',
      name: 'farmPlan',
      component: () => import('@/views/farmPlan/farmPlan.vue'),
      meta: { name: '农事计划', icon: '' }
    },
    {
      path: '/farmPlanDetail',
      name: 'farmPlanDetail',
      hidden: true,
      component: () => import('@/views/farmPlan/farmPlanDetail.vue'),
      meta: { name: '农事计划详情', icon: '', parentMenuName: 'farmPlan' }
    },
    {
      path: '/addNewFarmPlan',
      name: 'addNewFarmPlan',
      hidden: true,
      component: () => import('@/views/farmPlan/addNewFarmPlan.vue'),
      meta: { name: '新增农事计划', icon: '' }
    },
    {
      path: '/addOtherFarmPlan',
      name: 'addOtherFarmPlan',
      hidden: true,
      component: () => import('@/views/farmPlan/addOtherFarmPlan.vue'),
      meta: { name: '新增临时任务', icon: '' }
    },
    // {
    //   path: '/projectCenter',
    //   name: 'projectCenter',
    //   hidden: true,
    //   component: () => import('@/views/project/projectCenter/project.vue'),
    //   meta: { name: '方案中心', icon: '' }
    // },
    // {
    //   path: '/projectDetail',
    //   name: 'projectDetail',
    //   hidden: true,
    //   component: () => import('@/views/project/projectCenter/projectDetail.vue'),
    //   meta: { name: '方案详情', icon: '', parentMenuName: 'projectCenter' }
    // },
    // {
    //   path: '/addNewProject',
    //   name: 'addNewProject',
    //   hidden: true,
    //   component: () => import('@/views/project/projectCenter/addNewProject.vue'),
    //   meta: { name: '新增方案', icon: '' }
    // },
    // {
    //   path: '/planMarket',
    //   name: 'planMarket',
    //   hidden: true,
    //   component: () => import('@/views/planMarket'),
    //   meta: { name: '方案市场', icon: '' }
    // },
    // {
    //   path: '/planMarketDetail', // :solutionId
    //   name: 'planMarketDetail',
    //   hidden: true,
    //   component: () => import('@/views/planMarket/detail.vue'),
    //   meta: { name: '方案市场详情', icon: '', parentMenuName: 'planMarketDetail' }
    // },
    // {
    //   path: '/editProject',
    //   name: 'editProject',
    //   hidden: true,
    //   component: () => import('@/views/project/projectCenter/editProject.vue'),
    //   meta: { name: '修改方案', icon: '' }
    // },
    // {
    //   path: '/knowledgeQuiz',
    //   name: 'knowledgeQuiz',
    //   hidden: true,
    //   component: () => import('@/views/knowledgeQuiz'),
    //   meta: { name: '知识问答', icon: '' }
    // },
    // {
    //   path: '/knowledgeQuizDetail',
    //   name: 'knowledgeQuizDetail',
    //   hidden: true,
    //   component: () => import('@/views/knowledgeQuiz/detail.vue'),
    //   meta: { name: '知识问答详情', icon: '', parentMenuName: 'knowledgeQuiz' }
    // },
    {
      path: '/outgoingmanagement',
      name: 'outgoingmanagement',
      component: () => import('@/views/outgoingManagement/OutgoingManagement.vue'),
      meta: { name: '出库管理', icon: '' }
    },
    {
      path: '/productionbatchmanagement',
      name: 'ProductionBatchManagement',
      component: () => import('@/views/productionBatchManagement/ProductionBatchManagement.vue'),
      meta: { name: '生产批次管理', icon: '' }
    },
    {
      path: '/tobepurchased',
      name: 'tobepurchased',
      component: () => import('@/views/tobepurchased/TobePurchased.vue'),
      meta: { name: '待采购管理', icon: '' }
    },
    {
      path: '/tobepurchaseddateil',
      name: 'TobePurchasedDateil',
      hidden: true,
      component: () => import('@/views/tobepurchased/TobePurchasedDateil.vue'),
      meta: { name: '待采购管理详情', icon: '', parentMenuName: 'tobepurchased' }
    },
    {
      path: '/purchaseManagement',
      name: 'purchaseManagement',
      hidden: false,
      component: () => import('@/views/purchaseManagement'),
      meta: { name: '采购管理', icon: '' }
    },
    {
      path: '/purchaseMngDetail',
      name: 'purchaseMngDetail',
      hidden: true,
      component: () => import('@/views/purchaseManagement/detail'),
      meta: { name: '采购管理详情', icon: '' }
    },
    {
      path: '/bacteriabagtaskmanagement',
      name: 'BacteriaBagTaskManagement',
      component: () => import('@/views/bacteriaBagTaskManagement/BacteriaBagTaskManagement.vue'),
      meta: { name: '菌包任务管理', icon: '' }
    },
    {
      path: '/addbacteriabagtask',
      name: 'AddBacteriaBagTask',
      hidden: true,
      component: () => import('@/views/bacteriaBagTaskManagement/AddBacteriaBagTask.vue'),
      meta: { name: '新增菌包任务', icon: '' }
    },
    {
      path: '/bacteriabagtaskdateil',
      name: 'BacteriaBagTaskDateil',
      hidden: true,
      component: () => import('@/views/bacteriaBagTaskManagement/BacteriaBagTaskDateil.vue'),
      meta: { name: '菌包任务详情', icon: '' }
    },
    {
      path: '/traceabilityofcultivation',
      name: 'TraceabilityOfCultivation',
      component: () => import('@/views/traceabilityOfCultivation/TraceabilityOfCultivation.vue'),
      meta: { name: '木耳栽培过程溯源', icon: '' }
    },
    {
      path: '/detailtraceabilityofcultivation',
      name: 'DetailTraceabilityOfCultivation',
      hidden: true,
      component: () => import('@/views/traceabilityOfCultivation/DetailTraceabilityOfCultivation.vue'),
      meta: { name: '木耳溯源信息维护', icon: '' }
    },
    {
      path: '/tempWorkerManage',
      name: 'TempWorkerManage',
      component: () => import('@/views/tempWorkerManage/TempWorkerManage.vue'),
      meta: { name: '临时工管理', icon: '' }
    },
    {
      path: '/tempWorkerDetail',
      name: 'TempWorkerDetail',
      hidden: true,
      component: () => import('@/views/tempWorkerManage/TempWorkerDetail.vue'),
      meta: { name: '临时工详情', icon: '' }
    }
  ]
}
