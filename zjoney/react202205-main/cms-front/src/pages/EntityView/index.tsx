import { ExclamationCircleOutlined, SearchOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer } from '@ant-design/pro-components'
import { Space, Table, Button, Row, Col, Pagination, Card, Modal, List, message } from 'antd';
import { useState } from 'react';
import { useToggle, useSetState } from 'ahooks';
import { request, useRequest, history, useLocation } from 'umi';
import { createForm } from '@formily/core';
import { createSchemaField, } from '@formily/react'
import Qs from 'query-string';
import { Form, FormItem, Input, FormGrid, DatePicker, FormButtonGroup, Submit, Reset } from '@formily/antd';
import moment from 'moment';
import { renderColumns } from '@/utils/render/column';
import { renderOperations } from '@/utils/render/operation';
import { BUTTON_ACTION_TYPES } from '@/constants/enums';
import EditModal from '@/components/EditModal';
import { renderSearchFormFields } from '@/utils/render/field';
const searchForm = createForm({ validateFirst: true });
export default function () {
  const location = useLocation();
  const query = Qs.parse(location.search);
  const [{ current, pageSize }, setPageConfig] = useState({ current: 1, pageSize: 10 });
  const [sorter, setSorter] = useState<any>();
  const [searchVisible, { toggle }] = useToggle();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [modalState, setModalState] = useSetState({ visible: false, title: '', data: [], row: {} });
  const loadQuery = useRequest((params = {}) => request(`/api/${query.name}`, {
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
  const deleteQuery = useRequest((ids) => request(`/api/${query.name}/${ids[0]}`, {
    method: 'DELETE',
    data: ids
  }), {
    manual: true,
    onSuccess(res) {
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
  const onAction = (operation, row) => {
    switch (operation.action) {
      case BUTTON_ACTION_TYPES.add:
      case BUTTON_ACTION_TYPES.update:
        setModalState({ visible: true, title: operation.title, data: operation.data, row });
        break;
      case BUTTON_ACTION_TYPES.delete:
        deleteRecords([row]);
        break;
      case BUTTON_ACTION_TYPES.refresh:
        loadQuery.refresh();
        break;
      default:
        break;
    }
  }
  const columns = renderColumns(loadQuery.data, onAction);
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
              {renderSearchFormFields(loadQuery.data?.fields)}
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
            {renderOperations(loadQuery.data?.page, onAction)}
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
      <EditModal
        title={modalState.title}
        visible={modalState.visible}
        data={modalState.data}
        row={modalState.row}
        fields={loadQuery.data?.fields}
        onOk={() => {
          setModalState({ visible: false });
          loadQuery.refresh();
        }}
        onCancel={() => {
          setModalState({ visible: false });
        }}
      />
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