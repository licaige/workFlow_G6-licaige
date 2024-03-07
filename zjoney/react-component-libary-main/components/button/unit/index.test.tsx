import React, { Component } from 'react';
import { mount } from 'enzyme';
import Button from '..';
describe('测试Button',()=>{
    it('测试是Button是否能够正确挂载',()=>{
        //挂载组件的过程不可抛错误
        expect(()=>mount(<Button>Follow</Button>)).not.toThrow();
    });
});