// 算法组件表单对象
export const initformData = {
  pipeline: {
    name: '算法组件', // 算法标题
    description: '算法组件', // 算法描述
    units: [], // 算法执行单元
    type: null, // 算法类型
    strategy: null, // 算法/方式
    params: {
      targetType: null, //  攻击> 任务目标
      targetUnit: null, // 攻击> 固定目标
      distance: null, // 距离
      angle: null, // 角度
      duration: null, // 守卫 时长
      range: null, // 侦察、守卫 范围
      locations: null, // 新建地点
      paths: null, // 路径
      area: null, // 区域
    },
  },
  fork: {
    name: '判断节点',
    description: '判断节点',
    triggerType: null, // 触发条件
    targetUnit: null, // 目标单位
    statusUnit: null, // 单位状态
    targetArea: null, // 区域
    situationTime: null, // 态势时间
    countdown: null, // 倒计时
    selectTime: null, // 指定时间点
  },
};
