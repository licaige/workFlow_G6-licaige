/**
 * 1 严格模式
 * @param {*} name 
 * @param {*} age 
 */
function Acme(name, age) {
	'use strict';
	this._name = name;
	this._age = age;
}


/**
 * 2 内部判断
 * @param {*} name 
 * @param {*} age 
 * @returns 
 */
function Acme1(name, age) {
	if (!(this instanceof Acme1)) {
		// return new Acme1(name, age);	// 直接返回实例对象
		throw new Error('请使用 new 命令调用！');	// 或者报错提示
	}
	this._name = name;
	this._age = age;
}

/**
 * new target
 * @param {*} name 
 * @param {*} age 
 * @returns 
 */
function Person(name, age) {
	if (!new.target) {
		return new Person(name, age);	// 或直接返回实例对象
		// throw new Error('请使用 new 命令调用！');	// 报错提示
	}
	this._name = name;
	this._age = age;
}

var p = Person('zz', 16)