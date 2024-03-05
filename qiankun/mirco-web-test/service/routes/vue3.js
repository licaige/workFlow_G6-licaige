const router = require('koa-router')()

router.prefix('/vue3')

router.get('/swapper', function (ctx, next) {
  ctx.body = [
    'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3884457102,4018905964&fm=26&gp=0.jpg',
    'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2329770250,1897745847&fm=26&gp=0.jpg',
    'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=395380977,272417941&fm=26&gp=0.jpg',
  ]
})

router.get('/text', function (ctx, next) {
  ctx.body = [
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
    '拆解BBAL：车架生锈、强度不如哈弗豪华品牌还能买吗还能买吗',
  ]
})

module.exports = router
