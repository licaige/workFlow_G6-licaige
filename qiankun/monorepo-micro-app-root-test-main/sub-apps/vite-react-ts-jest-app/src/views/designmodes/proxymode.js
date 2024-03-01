import React, { Suspense, useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { useImmer } from 'use-immer';
import { Row, Col, message, notification, Image, Button, Checkbox } from 'antd';
// import { RocketOutlined } from "@ant-design/icons";
import Loading from '@/components/Loading';
// import { $Api } from "@@api";
export default function ProxyMode(props) {
	const refForm = useRef(null);
	const [visible, setVisible] = useState(false);
	const [src, setSrc] = useState('');
	const [loading, setLoading] = useState(null);
	const myImage = (function () {
		return function (src) {
			if (!src) {
				return setLoading('Loading...');
			}
			return setSrc(src);
		};
	})();

	const proxyImage = (function () {
		// let img = new Image();
		// img.onload = function() {
		//   myImage(this.src);
		// }
		return function (src) {
			myImage(null);
			// img.src = src;
			setTimeout(function () {
				myImage(src);
			}, 3000);
		};
	})();

	function showImage() {
		setVisible(true);
		proxyImage('https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png');
	}

	const checkboxs = [1, 2, 3, 4, 5];
	const syncUploadFile = id => {
		console.log(`开始同步文件ID为： ${id}`);
	};
	const proxySyncUploadFile = (function () {
		let cache = [], // 保存一段时间内需要同步的ID
			timer;
		return function (id) {
			cache.push(id);
			if (timer) {
				// 保证不会覆盖
				return;
			}
			timer = setTimeout(function () {
				syncUploadFile(cache.join(','));
				clearTimeout(timer);
				timer = null;
				cache.length = 0; // 清空id集合
			}, 2000);
		};
	})();
	function onChangeFn(e) {
		console.log('checked = ', e.target);
		if (e.target.checked) {
			proxySyncUploadFile(e.target.id);
		}
	}

	const miniConsole = (function () {
		let cache = [];
		const handler = ev => {
			if (ev.keyCode === 113) {
				// 按下F2时， 加载console-polyfill
				let script = document.createElement('script');
				script.onload = function () {
					for (let i = 0, fn; (fn = cache[i++]); ) {
						fn();
					}
				};
				script.src = 'https://cdn.bootcdn.net/ajax/libs/console-polyfill/0.3.0/index.min.js'; //容易崩溃
				document.getElementsByTagName('head')[0].appendChild(script);
				document.body.removeEventListener('keydown', handler); // 只加载一次miniConsole.js
			}
		};

		document.body.addEventListener('keydown', handler, false);

		return {
			log: function () {
				let args = arguments;
				cache.push(function () {
					return miniConsole.log.apply(miniConsole, args);
				});
			},
		};
	})();

	// miniConsole.js代码  miniConsole
	// miniConsole = {
	//   log: function() {
	//     // 真正代码略
	//     console.log(Array.prototype.join.call(arguments));
	//   }
	// };

	useEffect(() => {
		miniConsole.log(11); //开始打印log

		let s1 = proxyMult(1, 2, 3, 5);
		let s2 = proxyMult(1, 2, 3, 5);
		let s3 = proxyMultSum(1, 2, 3, 5);
		let s4 = proxyPlusSum(1, 2, 3, 5);
		let s5 = proxyPlusSum(1, 2, 3, 5);
		console.log('proxyMult:', s1, s2, s3, s4, s5);

		return () => {
			//  cleanup
		};
	}, []);

	/** 计算乘积 */
	const mult = function () {
		let a = 1;
		for (let i = 0, l = arguments.length; i < l; i++) {
			a = a * arguments[i];
		}
		return a;
	};
	/** 计算加和 */
	const plus = function () {
		let a = 1;
		for (let i = 0, l = arguments.length; i < l; i++) {
			a = a + arguments[i];
		}
		return a;
	};

	const proxyMult = (function () {
		let cache = {};
		return function () {
			let args = Array.prototype.join.call(arguments, ',');
			if (args in cache) {
				return cache[args];
			}
			return (cache[args] = mult.apply(this, arguments));
		};
	})();

	/** 创建缓存代理工厂 */
	const createProxyFactory = function (fn) {
		let cache = {};
		return function () {
			let args = Array.prototype.join.call(arguments, ',');
			if (args in cache) {
				return cache[args];
			}
			return (cache[args] = fn.apply(this, arguments));
		};
	};

	const proxyMultSum = createProxyFactory(mult);
	const proxyPlusSum = createProxyFactory(plus);

	return (
		<dl className="page-box">
			<dt>
				<h3 className="page-title">代理模式</h3>
			</dt>
			<dd>
				<p>代理模式定义：为一个对象提供一个代用品或占位符，以便控制对它的访问。</p>
				<p>
					代理模式的关键是，当客户不方便直接访问一个对象或者不满足需要的时候，提供一个替身对象来控制对这个对象的访问，客户实际上访问的是替身对象。替身对象对请求做一些处理之后，
					再把请求转交给本体对象。
				</p>
				<h5>保护代理</h5>
				<p>代理B为代理A直接过滤拒绝掉一些不需要的请求。</p>
				<h5>虚拟代理</h5>
				<p>虚拟代理把一些开销很大的对象，延迟到真正需要它的时候才去创建。</p>
				<h5>代理和本体接口的一致性</h5>
				<p>用户可以放心地请求代理，只关心是否能得到想要的结果。</p>
				<p>在任何使用本体的地方都可替换成使用代理。</p>
				<p>
					在java等语言中，代理和本体都需要显式地实现同一个接口，一方面接口保证了它们会拥有同样的方法，另一方面，面向接口编程迎合依赖倒置原则，
					通过接口进行向上转型，从而避开编译器的类型检查，代理和本体将来可以被替换使用。
				</p>
				<p>
					在js这种动态类型语言中，有时通过鸭子类型来检测代理和本体是否都实现了setSrc方法，另外大多数时候甚至干脆不做检测，全部依赖程序员自觉性，这对程序的健壮性是有影响的。
					不过对于一门快速开发的脚本语言，这些影响还是在可以接受的范围内。
				</p>
				<p>
					如果代理对象和本体对象都为一个函数（函数也是对象），函数必然都能被执行，则可认为它们也具有一致的接口。
				</p>
				<Button type="primary" onClick={showImage}>
					show image preview
				</Button>
				<Suspense fallback={<Loading isLoad={loading} />}>
					<Image
						width={200}
						style={{ display: 'none' }}
						src={src}
						preview={{
							visible,
							src: src,
							onVisibleChange: value => {
								setVisible(value);
							},
						}}
					/>
				</Suspense>
				<h5>虚拟代理合并Http请求</h5>
				<p>
					通过一个代理函数proxySyncUploadFile来收集一段时间之内的请求，最后一次性发送给服务器。比如等待2秒，把2秒内的需要同步的文件ID打包发给服务器，
					如果不是对实时性要求非常高的系统，2秒的延迟不会带来太大的副作用，却能大大减轻服务器的压力。
				</p>
				{checkboxs.map(number => (
					<Checkbox key={number.toString()} id={number} onChange={onChangeFn}>
						{number.toString()}
					</Checkbox>
				))}
				{/* <Button onClick={submitFn} size={"small"}>提交</Button> */}
				<h5>虚拟代理在惰性加载中的应用</h5>
				<h5>缓存代理</h5>
				<p>
					缓存代理可以为一些开销大的运算结果提供暂时的存储，在下次运算时，如果传递进来的参数跟之前一致，则可直接返回前面存储的运算结果。
				</p>
				<h5>缓存代理用于ajax异步请求数据</h5>
				<p>
					项目中分页需求，同一页的数据理论上只需要去后台拉取一次，这些已经拉取到的数据在某个地方被缓存之后，下次再请求同一页的时候，便可以直接使用之前的数据。实现和计算乘积的例子差不多，唯一不同是请求数据是个异步操作，要通过回调实现。
				</p>
				<h5>高阶函数动态创建代理</h5>
				<p>通过传入高阶函数这种更加灵活的方式，可以为各种计算方法创建缓存代理。</p>
				<p>
					<strong>防火墙代理：</strong>控制网络资源的访问，保护主机不让“坏人”接近
				</p>
				<p>
					<strong>远程代理：</strong>
					为一个对象在不同的空间提供局部代表，在java中，远程代理可以是另一个虚拟机中的对象。
				</p>
				<p>
					<strong>保护代理：</strong>用于对象应该有不同的访问权限的情况。
				</p>
				<p>
					<strong>智能引用代理：</strong>
					取代了简单的指针，它在访问对象时执行一些附加，比如计算一个对象被引用的次数。
				</p>
				<p>
					<strong>写时复制代理：</strong>
					通常用于复制一个庞大的对象的情况。写时复制代理延迟了复制过程，当对象被真正修改时，才对它进行复制操作。写时复制代理是虚拟代理的一种变体，DLL是其典型应用场景。
				</p>
				<p>
					js中最常用的代理是虚拟代理和缓存代理。在编写业务代码时，往往不预先考虑是否使用代理模式，当真正发现不方便直接访问某个对象时，再编写代理不迟。
				</p>
			</dd>
		</dl>
	);
}
