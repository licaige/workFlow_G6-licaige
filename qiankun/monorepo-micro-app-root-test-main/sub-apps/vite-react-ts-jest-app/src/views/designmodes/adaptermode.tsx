import React, { Suspense, useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom';
import { useImmer } from 'use-immer';
import { Row, Col, message, notification, Image, Button, Checkbox } from 'antd';
// import { RocketOutlined } from "@ant-design/icons";
import Loading from '@/components/Loading';
// import { $Api } from "@@api";
export default function PubSubscribe(props: any, context?: any): React.ReactElement<any, any> {
	// const refForm = useRef(null);
	// const [visible, setVisible] = useState(false);
	const googleMap = {
		show: () => {
			console.log('开始渲染谷歌地图');
		},
	};
	const baiduMap = {
		display: () => {
			console.log('开始渲染百度地图');
		},
	};
	const baiduMapAdapter = {
		show: () => {
			return baiduMap.display();
		},
	};

	const renderMap = map => {
		if (map.show instanceof Function) {
			map.show();
		}
	};

	const getGdongCity = () => {
		let gdongCity = [
			{
				name: 'shenzhen',
				id: 11,
			},
			{
				name: 'guangzhou',
				id: 12,
			},
		];
		return gdongCity;
	};

	const renderCity = fn => {
		console.log('开始渲染广东地图');
		// document.write(JSON.stringify(fn()));
		console.log('渲染新数据格式：', JSON.stringify(fn()));
	};
	/** 转换成新的数据结构 */
	let newGdongCity = {
		shenzhen: 11,
		guangzhou: 12,
	};

	/** 转换成新的数据结构 */
	const addressAdapter = oldAddressfn => {
		let address = {},
			oldAddress = oldAddressfn();
		for (let i = 0, c; (c = oldAddress[i++]); ) {
			address[c.name] = c.id;
		}
		return () => address;
	};

	useEffect(() => {
		/** 增加baiduMapAdapter解决百度和谷歌地图渲染接口的兼容性问题 */
		renderMap(googleMap);
		renderMap(baiduMapAdapter);
		renderCity(addressAdapter(getGdongCity));
		return () => {
			//  cleanup
		};
	}, []);

	return (
		<dl className="page-box">
			<dt>
				<h3 className="page-title">适配器模式</h3>
			</dt>
			<dd>
				<p>适配器模式定义：适配器别名包装器(wrapper)，解决两个软件实体间的接口不兼容的问题。</p>
				<p>
					适配器模式主要用来解决两个已有接口之间不匹配问题。适配器模式不需要改变已有接口，就能够使它们协同作用。
				</p>
				<p>
					装饰者模式和代理模式也不会改变原有对象的接口，但装饰者模式为了给对象增加功能，常常形成一条长的装饰链，而适配器模式和代理模式通常只包装一次。
				</p>
				<p>
					在js中，用注册回调函数的形式来代替传统的发布订阅模式，显得更加优雅简单。另外，在js中无需选择使用推模型还是拉模型，arguments可以很方便的表示参数列表，所以我们一般选择推模型，
					使用Function.prototype.apply方法把所有参数都推送给订阅者。
				</p>
				<h3>单一职责原则(SRP)</h3>
				<p>SRP原则体现为：一个对象（方法）只做一件事。</p>
				<p>SRP原则在设计模式中广泛应用，例如代理模式、迭代器模式、单例模式和装饰者模式。</p>
				<h5>SRP原则何时应该分离职责</h5>
				<p>SRP原则是所有原则中最简单也是最难正确运用的原则之一。</p>
				<p>要明确的是，并不是所有职责都应该一一分离</p>
				<p>
					一方面，如果随着需求的变化，有两个职责总是同时变化，那就不必分离。比如ajax请求时，创建xhr对象和发送xhr请求几乎总是在一起，那么这两个职责就没有必要分开。
				</p>
				<p>
					另一方面，职责的变化轴线仅当它们确定会发生变化时才具有意义，即使两个职责被耦合在一起，但它们还没有发生改变的征兆，那么也许没必要主动分离它们，等需要重构再分离也不迟。
				</p>
				<h5>SRP原则的优缺点</h5>
				<p>
					SRP原则的优点是降低了单个类或者对象的复杂度，按照职责把对象分解成更小的粒度，这有助于代码的复用，也有利于单元测试。当一个职责需要变更的时候不会影响到其他职责。
				</p>
				<p>
					SRP原则的缺点最明显的是会增加编写代码的复杂度，当我们按照职责把对象分解成更小的粒度之后，实际也增加了对象间相互联系的难度。
				</p>
				<h3>最少知识原则(LKP)</h3>
				<p>
					LKP原则体现为：一个软件实体应当尽可能少地与其他实体发生相互作用。软件实体是一个广义概念，不仅包括对象，还包括系统、类、模块、函数、变量等。
				</p>
				<p>LKP原则应用的最多的是中介者模式和外观模式</p>
				<h5>封装在LKP原则中的体现</h5>
				<p>封装也用来限制变量的作用域，在js中对变量作用域的规定是：</p>
				<p>变量在全局声明，或者代码任何位置隐式声明，该变量在全局可见。</p>
				<p>变量在函数内显式声明，则函数内可见。</p>
				<p>
					把变量的可见性限制在一个尽可能小的范围内，这个变量对其他不相关的模块的影响就越小，变量被改写发生冲突的机会就越小。
				</p>
				<h3>开放-封闭原则(OCP)</h3>
				<p>
					OCP原则体现为：软件实体（类、模块、函数）等应该是可以扩展的，但是不可修改。
					当需要改变一个程序的功能或者增加新功能的时候，可以使用增加代码的方式，但不允许改动程序的源代码。
				</p>
				<h5>设计模式中的OCP原则</h5>
				<p>1. 发布订阅模式</p>
				<p>2. 模板方法模式</p>
				<p>3. 策略模式</p>
				<p>4. 代理模式</p>
				<p>5. 职责链模式</p>
			</dd>
		</dl>
	);
}
