/* ================================================================
   DATA.JS — Central Mock Data Store
   ================================================================ */
'use strict';
window.DATA = (function () {

  const categories = ['全部','抑郁焦虑','亲子关系','睡眠问题','情绪管理','压力应对'];

  const articles = [
    {
      id:1, category:'抑郁焦虑', status:'已发布',
      title:'如何识别自己是否患有抑郁症',
      author:'张晓医生 · 盛京医院心理科', authorInitial:'张',
      date:'2026-04-15', reads:3421,
      summary:'帮助用户区分短暂情绪低落与持续性抑郁状态，理解何时需要求助专业帮助。',
      coverImg:'https://picsum.photos/seed/mh-depr/600/280',
      cover:'情绪低落的成年女性在窗边沉思，柔和自然光',
      content:[
        '抑郁症并不是简单的「心情不好」，而是一组持续两周以上、深刻影响日常生活功能的症状群。典型症状包括持续低落或空洞感、对曾经感兴趣的事物失去乐趣、疲劳乏力、注意力下降等。',
        '临床上常用 PHQ-9 量表进行初步筛查。若您的得分达到 10 分及以上，建议主动就医评估，不要等到症状严重才寻求帮助。',
        '早期干预的预后通常明显优于拖延处理。心理治疗与药物治疗各有适应人群，医生会根据您的具体情况制定个性化方案。请记住：寻求帮助是勇敢的行动，而不是软弱的表现。'
      ]
    },
    {
      id:2, category:'亲子关系', status:'已发布',
      title:'青少年情绪失控背后的心理信号',
      author:'李芳主任 · 沈阳市精神卫生中心', authorInitial:'李',
      date:'2026-05-02', reads:2180,
      summary:'识别青少年高压、孤立与冲突背后的心理需求，帮助家长提升支持能力。',
      coverImg:'https://picsum.photos/seed/mh-family/600/280',
      cover:'家长与青少年在客厅沙发两端进行对话',
      content:[
        '青少年的突然情绪爆发、长时间把自己关在房间、成绩突然下滑，往往不只是「叛逆期」的正常表现，可能是内心求助信号的外化。',
        '家长在面对孩子情绪时，需要先稳定自己的状态，避免「反射式」批评与说教。非防御性倾听——认可感受而非立即解决问题——是建立信任的第一步。',
        '当情绪问题持续超过两周并影响学业或社交时，应考虑寻求儿童青少年心理专科评估，家庭治疗往往比单独治疗孩子效果更好。'
      ]
    },
    {
      id:3, category:'睡眠问题', status:'已发布',
      title:'失眠不等于睡眠障碍：认识你的睡眠',
      author:'王鹏主任 · 中国医大附属一院', authorInitial:'王',
      date:'2026-03-26', reads:5067,
      summary:'帮助用户理解急性失眠、慢性睡眠障碍和焦虑性睡眠问题的实质区别。',
      coverImg:'https://picsum.photos/seed/mh-sleep/600/280',
      cover:'夜间卧室中辗转反侧的睡眠场景，蓝色月光',
      content:[
        '一过性失眠通常与压力事件、时差或环境改变有关，会在诱因消失后自然恢复。但若每周至少三晚难以入睡或早醒，持续超过三个月，则应考虑慢性失眠障碍。',
        '常见的自我「解决」方法——白天大量补觉、睡前喝酒助眠、长期依赖助眠药——实际上会破坏睡眠稳态，使问题加重。',
        '认知行为疗法-失眠（CBT-I）被国际指南推荐为慢性失眠的一线治疗，其长期效果优于药物。专科评估可帮助排除睡眠呼吸暂停等器质性原因。'
      ]
    },
    {
      id:4, category:'情绪管理', status:'草稿',
      title:'职场焦虑的自我调节方法',
      author:'刘梅副主任 · 辽宁省人民医院', authorInitial:'刘',
      date:'2026-04-28', reads:1893,
      summary:'围绕高压工作场景，提供可操作的压力识别与即时调节建议。',
      coverImg:'https://picsum.photos/seed/mh-office/600/280',
      cover:'办公室环境中进行呼吸放松练习的白领',
      content:[
        '职场焦虑常表现为心慌、反复担心出错、入睡前思维打转、对工作邮件产生回避。第一步是识别焦虑的具体触发情境，而非笼统地认为「我就是焦虑的人」。',
        '4-7-8 呼吸法（吸气4秒、屏息7秒、呼气8秒）可以在10分钟内激活副交感神经系统，有效降低急性焦虑水平。',
        '若焦虑已影响到工作效能和人际关系，建议通过正式评估与专业干预处理，而非单纯依赖「意志力」克服。'
      ]
    },
    {
      id:5, category:'压力应对', status:'已发布',
      title:'压力不是敌人：重新理解心理韧性',
      author:'张晓医生 · 盛京医院心理科', authorInitial:'张',
      date:'2026-05-06', reads:1247,
      summary:'从积极心理学视角介绍压力重构与心理韧性的科学依据和实践方法。',
      coverImg:'https://picsum.photos/seed/mh-hike/600/280',
      cover:'山顶俯瞰远方的徒步者，象征心理韧性',
      content:[
        '压力本身并不有害；研究表明，相信「压力有益」的人在应激后的生理恢复速度和工作表现均优于持消极压力观的对照组。',
        '心理韧性不是天生的固定特质，而是可以通过具体练习培养的能力集合，包括：认知重构、情绪调节、意义感建构和社会支持激活。',
        '定期的自我反思（如写作式情绪日记）、维持核心社交关系，以及保持适度的身体活动，是循证支持的韧性提升路径。'
      ]
    }
  ];

  const tags = ['抑郁症','焦虑障碍','失眠','双相情感','强迫症','亲子冲突',
    '青少年心理','职场压力','情绪调节','压力管理','睡眠卫生','创伤后应激'];

  const doctors = [
    { id:1, name:'张晓', title:'主治医师', initial:'张',
      hospital:'盛京医院心理科', dept:'心理科',
      specialty:['抑郁症','焦虑症'], visits:856, status:'接诊中',
      photo:'https://randomuser.me/api/portraits/women/44.jpg',
      bio:'擅长抑郁、焦虑相关障碍的评估与综合治疗，熟练运用 CBT 方法。',
      slots:['5月14日 周四 10:00','5月14日 周四 14:30','5月16日 周六 09:30'] },
    { id:2, name:'李芳', title:'副主任医师', initial:'李',
      hospital:'沈阳市精神卫生中心', dept:'儿童心理科',
      specialty:['儿童心理','亲子关系'], visits:1432, status:'接诊中',
      photo:'https://randomuser.me/api/portraits/women/68.jpg',
      bio:'长期从事儿童青少年心理障碍评估与家庭治疗，擅长亲子沟通修复。',
      slots:['5月13日 周三 15:00','5月15日 周五 09:00','5月17日 周日 10:30'] },
    { id:3, name:'王鹏', title:'主任医师', initial:'王',
      hospital:'中国医大附属一院', dept:'精神科',
      specialty:['睡眠障碍','双相情感'], visits:2108, status:'暂停接诊',
      photo:'https://randomuser.me/api/portraits/men/32.jpg',
      bio:'专注复杂睡眠障碍与情感障碍诊疗管理，主持多项睡眠研究课题。',
      slots:['5月18日 周一 09:00','5月18日 周一 13:30'] },
    { id:4, name:'刘梅', title:'副主任医师', initial:'刘',
      hospital:'辽宁省人民医院', dept:'心理科',
      specialty:['情绪管理','职场压力'], visits:967, status:'接诊中',
      photo:'https://randomuser.me/api/portraits/women/55.jpg',
      bio:'擅长成年人压力管理、职场心理问题及情绪调节支持治疗。',
      slots:['5月14日 周四 16:00','5月16日 周六 10:00','5月17日 周日 14:00'] }
  ];

  const bookingNotes = [
    '本通道优先服务联盟内医疗机构转诊患者，转诊单有效期三个月。',
    '首次就诊请携带有效身份证件与转诊单原件，医保患者另需医保卡。',
    '预约成功后将以短信通知确认，请在15分钟内完成信息核验，超时号源将自动释放。'
  ];

  const visitNotes = [
    '就诊当日请携带：身份证、医保卡、既往病历及检查资料、有效转诊单。',
    '未成年人就诊须由父母或法定监护人全程陪同，并携带关系证明文件。',
    '首诊完成后，医生将根据病情安排随访计划，请保持手机畅通以接收提醒。'
  ];

  const metrics = [
    { label:'文章总量', value:'128', delta:'↑12 较上月', up:true },
    { label:'总阅读量', value:'89,420', delta:'↑15.3%', up:true },
    { label:'总预约量', value:'248', delta:'↑8.7%', up:true },
    { label:'总就诊量', value:'201', delta:'↑11.2%', up:true },
    { label:'号源利用率', value:'78%', delta:'↑3.2%', up:true },
    { label:'危机热线触达', value:'34', delta:'↓2 较上月', up:false, warn:true }
  ];

  const trend = {
    labels:['5/5','5/6','5/7','5/8','5/9','5/10','5/11'],
    values:[22,26,18,31,27,39,42]
  };

  const catStats = [
    { label:'抑郁焦虑', pct:38, reads:33900 },
    { label:'情绪管理', pct:25, reads:22350 },
    { label:'睡眠问题', pct:20, reads:17890 },
    { label:'亲子关系', pct:12, reads:10730 },
    { label:'其他',     pct:5,  reads:4550  }
  ];

  const schedules = [
    { doctor:'张晓', day:'周四', short:'周\n四', detail:'上午 8号源，已约6', avail:true },
    { doctor:'李芳', day:'周五', short:'周\n五', detail:'上午 10号源，已约7', avail:true },
    { doctor:'刘梅', day:'周六', short:'周\n六', detail:'下午 6号源，已约3', avail:true },
    { doctor:'王鹏', day:'下周一', short:'下\n周一', detail:'上午 8号源，已暂停', avail:false }
  ];

  const orders = [
    { id:'YY2026051401', patient:'王女士', phone:'138****8888', doctor:'李芳', time:'2026-05-14 10:00', status:'待就诊' },
    { id:'YY2026051203', patient:'张先生', phone:'139****1234', doctor:'张晓', time:'2026-05-12 14:30', status:'已完成' },
    { id:'YY2026051105', patient:'李同学', phone:'177****5678', doctor:'王鹏', time:'2026-05-11 09:00', status:'已取消' },
    { id:'YY2026051302', patient:'赵女士', phone:'186****4321', doctor:'李芳', time:'2026-05-16 10:30', status:'改期中' },
    { id:'YY2026051006', patient:'陈先生', phone:'158****9900', doctor:'刘梅', time:'2026-05-10 14:00', status:'已完成' }
  ];

  return { categories, articles, tags, doctors, bookingNotes, visitNotes,
           metrics, trend, catStats, schedules, orders };
})();
