const { Service } = require('egg');
module.exports = class extends Service {
  async index(query) {
    const { app } = this;
    let { current, pageSize, sort, order, created, ...where } = query;
    current = isNaN(current) ? 1 : Number(current);
    pageSize = isNaN(pageSize) ? 10 : Number(pageSize);
    const offset = (current - 1) * pageSize;
    //除了表的数据之外，还需要返回一些实体信息
    let entityResult = await app.mysql.get('entity', { name: this.entity });
    console.log(entityResult);
    let fields = [], page = [], record = [];
    if (entityResult) {
      fields = entityResult.fields ? JSON.parse(entityResult.fields) : [];
      page = entityResult.page ? JSON.parse(entityResult.page) : [];
      record = entityResult.record ? JSON.parse(entityResult.record) : [];
    }
    if (created) {//如果有值，说明要按创建时间时间进行查询 egg-mysql不支持，需要自己拼SQL了
      //拼查询条件
      const filterFields = Object.entries(where).map(([key, value]) => `${key}='${value}'`);
      const [startCreated, endCreated] = created.split(',');
      filterFields.push(`created between '${startCreated}' and '${endCreated}'`);
      let filterSQL = '';
      if (filterFields.length > 0) {
        filterSQL += `where ${filterFields.join('  and ')}`;
      }
      const [{ total }] = await app.mysql.query(`SELECT COUNT(*) as total FROM ${this.entity} ${filterSQL}`);
      if (sort && order) {
        filterSQL += ` ORDER BY ${sort} ${order} `;
      }
      filterSQL += `LIMIT ${offset},${pageSize}`;
      const list = await app.mysql.query(`SELECT *  FROM ${this.entity} ${filterSQL}`);
      return {
        list,
        total,
        current,
        pageSize,
        fields,
        page,
        record
      }
    } else {
      let options = { where };
      options.offset = offset;
      options.limit = pageSize;
      if (sort && order) {
        options.orders = [[sort, order]];
      }
      const list = await app.mysql.select(this.entity, options);
      const total = await app.mysql.count(this.entity, where);
      return {
        list,
        total,
        current,
        pageSize,
        fields,
        page,
        record
      }
    }
  }
  async create(body) {
    const { app } = this;
    delete body.id;//新增加的时候不需要传ID，因为ID可以自动生成
    body.created = app.mysql.literals.now;// mysql NOW()
    body.updated = app.mysql.literals.now;
    return await app.mysql.insert(this.entity, body);
  }
  async update(body) {
    const { app } = this;
    return await app.mysql.update(this.entity, body);
  }
  async destroy(ids) {
    const { app } = this;
    return await app.mysql.delete(this.entity, { id: ids });
  }
  async show(id) {
    const { app } = this;
    return await app.mysql.get(this.entity, { id });
  }
}