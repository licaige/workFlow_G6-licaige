import { ExclamationCircleOutlined, ExclamationOutlined, SearchOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer } from '@ant-design/pro-components'
import { Space, Table, Button, Row, Col, Pagination, Card, Modal, List, message } from 'antd';
import { useState } from 'react';
import { useToggle } from 'ahooks';
import { request, useRequest, history } from 'umi';
import { createForm } from '@formily/core';
import { createSchemaField, } from '@formily/react'
import Qs from 'query-string';
import { Form, FormItem, Input, FormGrid, DatePicker, FormButtonGroup, Submit, Reset } from '@formily/antd';
import moment from 'moment';
const searchForm = createForm({ validateFirst: true });
const SchemeField = createSchemaField({
  components: {
    FormItem, Input, FormGrid, DatePicker, FormButtonGroup
  }
});
export default function () {
  const [{ current, pageSize }, setPageConfig] = useState({ current: 1, pageSize: 10 });
  const [sorter, setSorter] = useState<any>();
  const [searchVisible, { toggle }] = useToggle();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const loadQuery = useRequest((params = {}) => request('/api/entity', {
    params: {
      current,
      pageSize,
      sort: sorter?.field,
      order: sorter?.order?.slice(0, -3),//order ascend=asc  descend =desc
      ...params
    },
    paramsSerializer(params) {
      return Qs.stringify(params, {
        arrayFormat: 'comma',//created [val1,val2]
        skipEmptyString: true,
        skipNull: true
      });
    },
  }), {
    onSuccess(data) {
      //console.log('onSuccess', data);
    },
    refreshDeps: [current, pageSize, sorter]
  });
  const deleteQuery = useRequest((ids) => request(`/api/entity/${ids[0]}`, {
    method: 'DELETE',
    data: ids
  }), {
    manual: true,
    onSuccess(res) {
      console.log(res);//其实是响应体的data属性
      message.success(res.message);
      loadQuery.refresh();
    },
    formatResult(res) {
      return res;
    }
  });
  const deleteRecords = (records) => {
    Modal.confirm({
      title: '请确定是否要删除以下的记录?',
      icon: <ExclamationCircleOutlined />,
      content: (
        <List
          bordered
          dataSource={records.map(record => record.name)}
          renderItem={
            (item: string) => <List.Item>{item}</List.Item>
          }
        />
      ),
      okText: '是',
      cancelText: '否',
      okType: 'danger',
      onOk() {
        return deleteQuery.run(records.map(record => record.id)).then(() => {
          setSelectedRowKeys([]);
          setSelectedRows([]);
        });
      }
    });
  }
  const columns = [
    { title: 'ID', dataIndex: 'id', key: 'id', sorter: true },
    { title: '名称', dataIndex: 'name', key: 'name', },
    { title: '标题', dataIndex: 'title', key: 'title' },
    {
      title: '操作', dataIndex: 'operation', key: 'operation', render(_, row) {
        return (
          <Space>
            <Button
              type="default"
              onClick={() => history.push(`/entity/edit?id=${row.id}`)}
            >更新</Button>
            <Button
              type="primary"
              onClick={() => deleteRecords([row])}
            >删除</Button>
          </Space>
        )
      }
    }
  ]
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRows);
      setSelectedRowKeys(selectedRowKeys);
    }
  }
  const handleSubmit = (values) => {
    loadQuery.run(values);
  }
  return (
    <PageContainer>
      {
        searchVisible && (
          <Card key="search">
            <Form layout="inline" form={searchForm} onAutoSubmit={handleSubmit}>
              <SchemeField>
                <SchemeField.Void
                  x-component="FormGrid"
                  x-component-props={{ maxColumns: 4 }}
                >
                  <SchemeField.String
                    name="title"
                    title="标题"
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                  <SchemeField.String
                    name="name"
                    title="名称"
                    x-decorator="FormItem"
                    x-component="Input"
                  />
                  <SchemeField.String
                    name="created"
                    title="创建时间"
                    x-decorator="FormItem"
                    x-decorator-props={{ gridSpan: 2 }}
                    x-component="DatePicker.RangePicker"
                    x-component-props={{
                      showTime: true,
                      ranges: {
                        '今天': [moment().startOf('day'), moment()],
                        "本月": [moment().startOf('month'), moment().endOf('month')],
                        '上周': [moment().subtract(7, 'days'), moment()]
                      }
                    }}
                  />
                </SchemeField.Void>
              </SchemeField>
              <FormButtonGroup>
                <Submit>查询</Submit>
                <Reset>重置</Reset>
              </FormButtonGroup>
            </Form>
          </Card>
        )
      }
      <Row>
        <Col xs={24} style={{ textAlign: 'right', padding: '10px' }}>
          <Space>
            <Button shape='circle' icon={<SearchOutlined />} onClick={toggle} type={searchVisible ? 'primary' : 'dashed'} />
            <Button type="primary" onClick={() => history.push('/entity/edit')} >添加</Button>
          </Space>
        </Col>
      </Row>
      <Table
        dataSource={loadQuery.data?.list}
        columns={columns}
        pagination={false}
        rowKey={row => row.id}
        loading={loadQuery.loading}
        onChange={(_, __, sorter) => setSorter(sorter)}
        rowSelection={rowSelection}
      />
      <Row>
        <Col xs={24} style={{ textAlign: 'right', padding: '10px' }}>
          <Pagination
            total={loadQuery.data?.total || 0}
            current={loadQuery.data?.current || 1}
            pageSize={loadQuery.data?.pageSize || 10}
            showSizeChanger
            showQuickJumper
            showTotal={total => `总计${total}条`}
            onChange={(current, pageSize) => setPageConfig({ current, pageSize })}
          />
        </Col>
      </Row>
      {
        selectedRowKeys.length > 0 && (
          <FooterToolbar extra={
            <Space>
              <Button type="primary" onClick={() => deleteRecords(selectedRows)}>
                全部删除
              </Button>
            </Space>
          } ></FooterToolbar>
        )
      }
    </PageContainer>
  )
}