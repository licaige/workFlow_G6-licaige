const router = require('koa-router')()

router.prefix('/react16')

router.post('/login', function (ctx, next) {
  ctx.body = {
    msg: 'success'
  }
})

router.get('/new/car', function (ctx, next) {
  ctx.body = [
    {
      image: `/pic-car.png`,
      title: "哈佛H7",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "哈佛H8",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "汉兰达",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "奔驰GLC",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "本田CR-V",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "奕歌",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "途安L",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "别克GL8",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    },
    {
      image: `/pic-car.png`,
      title: "别克GL6",
      date: "2020年4月29日上市"
    }
  ]
})

router.get('/car/type', (ctx, next) => {
  ctx.body = [
    {
      rank: 1,
      image: `/pic-car.png`,
      name: "奔驰GLC",
      price: "5.34-9.65万",
    },
    {
      rank: 2,
      image: `/pic-car.png`,
      name: "别克GL6",
      price: "22.68-32.86万",
    },
    {
      rank: 3,
      image: `/pic-car.png`,
      name: "途安L",
      price: "28.84-38.12万",
    },
    {
      rank: 4,
      image: `/pic-car.png`,
      name: "朗逸",
      price: "6.23-10.92万",
    },
    {
      rank: 5,
      image: `/pic-car.png`,
      name: "奥迪A4L",
      price: "24.67-40.21万",
    },
    {
      rank: 6,
      image: `/pic-car.png`,
      name: "探歌",
      price: "4.15-6.23万",
    },
  ]
})

module.exports = router
