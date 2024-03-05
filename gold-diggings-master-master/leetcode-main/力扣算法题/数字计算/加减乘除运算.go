
// 面试题 16.09. 运算

// 只用加法和逻辑运算符  实现数字的  加减乘除

// 乘法的本质是加法
// 除法的本质是减法  (注这里不能使用log进行计算)
// 减法操作实现:  正数转负数  通过补码实现负数

//todo 补码实现负数操作
// let a = 100
// let b = ~a + 1 // -100

type Operations struct {
}

func Constructor() Operations {
	return Operations{}
}

func (this *Operations) Minus(a int, b int) int {
	return a + (^b + 1)
}

func (this *Operations) Multiply(a int, b int) int {
	isNagtive := false
	if a < 0 {
		a = ^(a - 1)
		isNagtive = !isNagtive
	}

	if b < 0 {
		b = ^(b - 1)
		isNagtive = !isNagtive
	}

	x := 1
	res := 0
	for x <= a {
		//确定2的多少倍，指数级增长
		if x&a != 0 {
			res += b
		}
		b += b
		x += x
	}

	if isNagtive {
		return ^res + 1
	}
	return res
}

// 模拟竖式使用减法模拟除法
func (this *Operations) Divide(a int, b int) int {
	res := 0
	isNegative := false
	if a < 0 {
		a = ^a + 1
		isNegative = !isNegative
	}

	if b < 0 {
		b = ^b + 1
		isNegative = !isNegative
	}

	for a > 0 {
		fx := 0 //记录上一个倍数
		cx := 1 //记录当前倍数
		fb := b //记录上一个b
		cb := b //记录当前倍数的b
		for a >= cb {
			fb = cb
			cb += cb
			fx = cx
			cx += cx
		}
		res += fx
		a -= fb
	}

	if isNegative {
		return ^res + 1
	}
	return res
}
