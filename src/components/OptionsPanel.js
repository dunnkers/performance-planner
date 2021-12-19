import { Form, Button, Checkbox, DatePicker } from 'antd';

const { RangePicker } = DatePicker;

const Demo = ({ initialValues, onSubmit, isGenerating }) => {
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  return (
    <Form
      name="basic"
      initialValues={initialValues}
      onFinish={onSubmit}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout="vertical"
      size="large"
      style={{padding:'40px 40px'}}
    >
      <Form.Item
        label="For which weeks would you like to bundle a journal for?"
        name="date_range"
        rules={[{ required: true, message: 'Don\'t forget to set a date range 😊' }]}
      >
        <RangePicker
            picker="month" />
      </Form.Item>

      <Form.Item name="insert_affirmations" valuePropName="checked" >
        <Checkbox>Affirmations</Checkbox>
      </Form.Item>

      <Form.Item name="insert_day" valuePropName="checked" >
        <Checkbox>Daily pages</Checkbox>
      </Form.Item>

      <Form.Item name="insert_week" valuePropName="checked" >
        <Checkbox>Weekly overviews</Checkbox>
      </Form.Item>

      {/* <Form.Item name="insert_month" valuePropName="checked" >
        <Checkbox>Insert monthly overviews</Checkbox>
      </Form.Item> */}

      <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
        <Button type="primary" htmlType="submit" loading={isGenerating} >
          Generate journal 🚀
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Demo;

