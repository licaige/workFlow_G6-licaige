const fs = require('fs-extra');
const path = require('path');
const babel = require('@babel/core');
const moment = require('moment');
const types = require('@babel/types');
const BaseService = require('./base');
module.exports = class extends BaseService {
  entity = 'entity'
  async create(body) {
    const { app } = this;
    const fields = body.fields;
    delete body.id;//新增加的时候不需要传ID，因为ID可以自动生成
    //1.转换字段类型，把fields,page,record对象转成JSON字符串进行保存
    body.fields = JSON.stringify(body.fields)
    body.page = JSON.stringify(body.page)
    body.record = JSON.stringify(body.record)
    body.created = app.mysql.literals.now;// mysql NOW()
    body.updated = app.mysql.literals.now;
    const conn = await app.mysql.beginTransaction();
    let routerSource;
    try {
      //2.插入entity表
      const insertedResult = await conn.insert(this.entity, body);
      //3.动态创建实体表 比如说book表
      let existTables = await conn.select('information_schema.tables', {
        where: {
          TABLE_SCHEMA: app.config.mysql.client.database,
          TABLE_NAME: body.name
        }
      });
      if (existTables.length == 0) {
        const columns = fields.map(toColumn);
        const createTableSQL = `
      CREATE TABLE ${body.name} (
        id int(11) NOT NULL AUTO_INCREMENT,
        ${columns.length > 0 ? columns.join(',') + ',' : ''}
        created datetime DEFAULT NULL,
        updated datetime DEFAULT NULL,
        PRIMARY KEY (id)
      ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4;
      `;
        await conn.query(createTableSQL);
      }
      //4.向menu表中添加菜单
      await conn.insert('menu', {
        name: body.title,//实体的名称 
        path: `/entity/view?id=${insertedResult.insertId}&name=${body.name}`
      });
      //5.生成或修改代码
      const controllerTemplate = await fs.readFile(path.join(__dirname, '../view/controller.js'), 'utf8');
      const controllerContent = await this.ctx.renderString(controllerTemplate, { name: body.name });
      await fs.writeFile(path.join(__dirname, `../controller/${body.name}.js`), controllerContent, 'utf8');

      const serviceTemplate = await fs.readFile(path.join(__dirname, '../view/service.js'), 'utf8');
      const serviceContent = await this.ctx.renderString(serviceTemplate, { name: body.name });
      await fs.writeFile(path.join(__dirname, `../service/${body.name}.js`), serviceContent, 'utf8');

      routerSource = await fs.readFile(path.join(__dirname, '../router.js'), 'utf8');
      const { code } = await babel.transformAsync(routerSource, {
        plugins: [routerPlugin(body.name)]
      });
      await fs.writeFile(path.join(__dirname, '../router.js'), code, 'utf8');
      await conn.commit();
    } catch (err) {
      await conn.rollback(); // rollback call won't throw err
      //只有记录的操作是可以回滚的，文件操作，像创建表或者更改表的操作是不能回滚的
      await conn.query(`DROP TABLE  ${body.name}`);
      await fs.unlink(path.join(__dirname, `../controller/${body.name}.js`));
      await fs.unlink(path.join(__dirname, `../service/${body.name}.js`));
      await fs.unlink(path.join(__dirname, `../controller/${body.name}.js`));
      await fs.writeFile(path.join(__dirname, '../router.js'), routerSource, 'utf8');
      throw err;
    }
  }
  async show(id) {
    const { app } = this;
    const entity = await app.mysql.get(this.entity, { id });
    entity.fields = JSON.parse(entity.fields)
    entity.page = JSON.parse(entity.page)
    entity.record = JSON.parse(entity.record)
    return entity;
  }
  async update(entity) {
    const { app } = this;
    const { fields } = entity;
    //转换类型
    entity.fields = JSON.stringify(entity.fields)
    entity.page = JSON.stringify(entity.page)
    entity.record = JSON.stringify(entity.record)
    delete entity.created;
    //entity.created = moment(entity.created).format();
    //entity.updated = app.mysql.literals.now;
    //修改实体记录
    await app.mysql.update(this.entity, entity);
    //修改列
    const columns = await app.mysql.select(`information_schema.COLUMNS`, {
      where: {
        TABLE_SCHEMA: app.config.mysql.client.database,
        TABLE_NAME: entity.name
      }
    });
    const newFields = fields.filter(field => !columns.find(column => column.COLUMN_NAME === field.name));
    if (newFields.length > 0) {
      const newColumns = newFields.map(toColumn);
      const alterSQL = `ALTER TABLE ${entity.name} ADD (${newColumns.join(',')})`;
      await app.mysql.query(alterSQL);
    }
  }
}

function toColumn(field) {
  let dataType = 'varchar(255)';
  switch (field.type) {
    case 'number':
    case 'select':
      dataType = 'int(11)';
      break;
    case 'datetime':
      dataType = 'datetime';
      break;
    case 'switch':
      dataType = 'tinyint(1)';
      break;
    default:
      break;
  }
  return `${field.name} ${dataType}`;
}

function routerPlugin(name) {
  return {
    visitor: {
      BlockStatement(path) {
        let { node } = path;
        node.body = [
          ...node.body,
          types.expressionStatement(
            types.callExpression(
              types.memberExpression(
                types.identifier('router'),
                types.identifier('resources')
              ),
              [
                types.stringLiteral(name),
                types.stringLiteral(`/${name}`),
                types.memberExpression(
                  types.identifier('controller'),
                  types.identifier(name)
                )
              ]
            )
          )
        ]
      }
    }
  }
}