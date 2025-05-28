import React, { useEffect } from 'react'
import { Form, Select, Input, Modal, DatePicker } from 'antd'
import moment from 'moment';

export default function AuditModal(props) {

  console.log('props===', props)

  // const {modalTitle, selectList, initialValues} = props

  const { TextArea } = Input;

  const {modalTitle, showModal, initialValues, selectList,  statusField, descField, type, updateIdField} = props
  const {updateApi, setShowModal, getList} = props
  const [editForm] =  Form.useForm()

  useEffect(() => {
    editForm.setFieldsValue(initialValues)
  }, [initialValues])

  // console.log('tabList==', tabList, initialValues)

  const handleConfirm = () => {
    editForm.submit()
  }

  const handleCancel = () => {
    setShowModal(false)
    editForm.resetFields()
  }

  const handleFinish = (value) => {
    let params = {
      id: updateIdField ? initialValues[updateIdField] : initialValues.id,
      // auditStatus: value[statusField],
      // auditRemarks: value[descField]
    }
    params[statusField] = value[statusField]
    params[descField] = value[descField]
    updateApi(params).then((res) => {
      setShowModal(false)
      editForm.resetFields()
      getList({page: 1})
    }).catch(() => {
      setShowModal(false)
      editForm.resetFields()
    })
  }

  const onChange = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
  };
  
  const onOk = (value) => {
    console.log('onOk: ', value);
  };



  return   <Modal open={showModal} onOk={handleConfirm} onCancel={handleCancel} title={modalTitle} cancelText={"取消"} okText={"确认"}>
     <Form
      layout="horizontal"
      labelCol={ {span: 6} }
      wrapperCol={{span: 14,}}
      onFinish={handleFinish}
      form={editForm}
     >
      {type === 'time' && (
        <>
         <Form.Item
         label="申请类型"
         name='publishType'
       >
        <Input disabled />
       </Form.Item>
          <Form.Item
          label="上架时间"
          name={'onlineTime'}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
        <DatePicker showTime onChange={onChange} onOk={onOk} format="YYYY-MM-DD HH:mm:ss"/>
         </Form.Item>
         <Form.Item
          label="下架时间"
          name={'offlineTime'}
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
         <DatePicker showTime onChange={onChange} onOk={onOk} format="YYYY-MM-DD HH:mm:ss" />
         </Form.Item>
        </>
      )}
      <Form.Item
        label="审核状态"
        name={statusField}
      >
      <Select>
        {selectList?.map((e) => {
          return <Select.Option value={e.key}>{e.value}</Select.Option>
        })}
      </Select>
      </Form.Item>
      <Form.Item
        label="审核原因"
        name={descField}
      >
        <TextArea showCount maxLength={100} onChange={() => {}} placeholder='100个中字'/>
      </Form.Item>


      
     </Form>
     </Modal>
}