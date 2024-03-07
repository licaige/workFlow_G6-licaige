const { Controller } = require('egg');

module.exports = class extends Controller {
  async index() {
    const { ctx, service } = this;
    const result = await service[this.entity].index(ctx.query);
    this.ctx.body = {
      success: true,
      message: '查询成功',
      data: result
    }
  }
  async create() {
    const { ctx, service } = this;
    const body = ctx.request.body;//请求体
    await service[this.entity].create(body);
    this.ctx.body = {
      success: true,
      message: '创建成功'
    }
  }
  async update() {
    const { ctx, service } = this;
    const body = ctx.request.body;//请求体
    body.id = ctx.params.id;
    await service[this.entity].update(body);
    this.ctx.body = {
      success: true,
      message: '更新成功'
    }
  }
  async destroy() {
    const { ctx, service } = this;
    const id = ctx.params.id;//如果是单个删除，只有params.id
    let ids = ctx.request.body;//如果是批量删除，会把要删除的ID数组批量的从请求体接收过来
    if (!ids) ids = [id]
    await service[this.entity].destroy(ids);
    this.ctx.body = {
      success: true,
      message: '删除成功'
    }
  }
  async show() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const entity = await service[this.entity].show(id);
    this.ctx.body = {
      success: true,
      message: '查询成功',
      data: entity
    }
  }
}
