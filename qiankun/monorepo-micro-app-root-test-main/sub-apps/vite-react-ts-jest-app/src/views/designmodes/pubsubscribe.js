import React, { Suspense, useState, useEffect, useRef } from 'react';
// import ReactDOM from 'react-dom';
import { renderRoutes, matchRoutes } from 'react-router-config';
import { useImmer } from 'use-immer';
import { Row, Col, message, notification, Image, Button, Checkbox } from 'antd';
// import { RocketOutlined } from "@ant-design/icons";
import Loading from '@/components/Loading';
// import { $Api } from "@@api";
export default function PubSubscribe(props) {
	// const refForm = useRef(null);
	// const [visible, setVisible] = useState(false);

	const Event = (function () {
		let global = this,
			Event,
			_default = 'default';
		Event = (function () {
			let _listen,
				_trigger,
				_remove,
				_slice = Array.prototype.slice,
				_shift = Array.prototype.shift,
				_unshift = Array.prototype.unshift,
				namesapceCache = {},
				_create,
				find,
				each = function (ary, fn) {
					let ret;
					for (let i = 0, l = ary.length; i < l; i++) {
						let n = ary[i];
						ret = fn.call(n, i, n);
					}
					return ret;
				};

			_listen = function (key, fn, cache) {
				if (!cache[key]) {
					cache[key] = [];
				}
				cache[key].push(fn);
			};
			_remove = function (key, cache, fn) {
				if (cache[key]) {
					if (fn) {
						for (let i = cache[key].length; i >= 0; i--) {
							if (cache[key][i] === fn) {
								cache[key].splice(i, 1);
							}
						}
					} else {
						cache[key] = [];
					}
				}
			};
			_trigger = function () {
				let cache = _shift.call(arguments),
					key = _shift.call(arguments),
					args = arguments,
					_self = this,
					ret,
					stack = cache[key];
				if (!stack || !stack.length) {
					return;
				}
				return each(stack, function () {
					return this.apply(_self, args);
				});
			};
			_create = function (nspace) {
				let namespace = nspace || _default;
				let cache = {},
					offlineStack = [], // 离线事件
					ret = {
						listen: function (key, fn, last) {
							_listen(key, fn, cache);
							if (offlineStack === null) {
								return;
							}
							if (last === 'last') {
								offlineStack.length && offlineStack.pop()();
							} else {
								each(offlineStack, function () {
									this();
								});
							}
							offlineStack = null;
						},
						one: function (key, fn, last) {
							_remove(key, cache);
							this.listen(key, fn, last);
						},
						remove: function (key, fn) {
							_remove(key, cache, fn);
						},
						trigger: function () {
							let fn,
								args,
								_self = this;
							_unshift.call(arguments, cache);
							args = arguments;
							fn = function () {
								return _trigger.apply(_self, args);
							};
							if (offlineStack) {
								return offlineStack.push(fn);
							}
							return fn();
						},
					};
				return namespace
					? namesapceCache[namespace]
						? namesapceCache[namespace]
						: (namesapceCache[namespace] = ret)
					: ret;
			};

			return {
				create: _create,
				one: function (key, fn, last) {
					const event = this.create();
					event.one(key, fn, last);
				},
				remove: function (key, fn) {
					const event = this.create();
					event.remove(key, fn);
				},
				listen: function (key, fn, last) {
					const event = this.create();
					event.listen(key, fn, last);
				},
				trigger: function () {
					const event = this.create();
					event.trigger.apply(this, arguments);
				},
			};
		})();

		return Event;
	})();

	useEffect(() => {
		/** 先发布后订阅 */
		Event.trigger('click', 1);
		Event.listen('click', function (a) {
			console.log('Event.listen:', a);
		});

		/** 使用命名空间 */
		Event.create('namespace1').listen('click', function (a) {
			console.log('Event.create-namespace1:', a);
		});
		Event.create('namespace1').trigger('click', 1);

		Event.create('namespace2').listen('click', function (a) {
			console.log('Event.create-namespace2:', a);
		});
		Event.create('namespace2').trigger('click', 2);

		return () => {
			//  cleanup
		};
	}, []);

	return (
		<dl className="page-box">
			<dt>
				<h3 className="page-title">发布订阅模式</h3>
			</dt>
			<dd>
				<p>
					发布订阅模式定义：定义对象间的一种一对多的依赖关系，
					当一个对象的状态发生改变时，所有依赖它的对象都将得到通知。
				</p>
				<p>在js开发中，我们一般用事件模型来替代传统的发布订阅模式。</p>
				<h5>全局事件的命名冲突</h5>
				<p>
					全局的发布-订阅对象里只有一个clientList来存放消息名和回调函数。通过它来订阅和发布各种消息，久而久之，难免会出现事件名冲突的情况，所以需要给Event对象提供创建命名空间的功能
				</p>
				<p>
					在js中，用注册回调函数的形式来代替传统的发布订阅模式，显得更加优雅简单。另外，在js中无需选择使用推模型还是拉模型，arguments可以很方便的表示参数列表，所以我们一般选择推模型，
					使用Function.prototype.apply方法把所有参数都推送给订阅者。
				</p>
			</dd>
		</dl>
	);
}
