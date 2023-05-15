import "./App.css";
import {
   Button,
   Col,
   ConfigProvider,
   Form,
   Input,
   Row,
   Typography,
} from "antd";
import { useState } from "react";
import image from "./image.svg";

function App() {
   const [form] = Form.useForm();
   const [inputDisabled, setInputDisabled] = useState(true);
   const rules = [
      {
         pattern: new RegExp(/^[0-9, .]+$/),
         required: true,
         message: "Введите требуемое число!",
      },
   ];

   const getResult = (values) => {
      const { x1, x2, xN, fx1, fx2 } = values;

      return (+fx1 + (+xN - +x1) * ((+fx2 - +fx1) / (+x2 - +x1))).toFixed(2);
   };

   const onFinish = (evt) => {
      console.log(evt);
      setInputDisabled(false);
      form.setFieldsValue({ fN: getResult(evt) });
   };
   const onFinishFailed = (evt) => {
      console.error(evt);
   };

   return (
      <ConfigProvider
         theme={{
            token: {
               fontFamily: "IBM Plex Mono",
               colorPrimary: "#10239e",
               marginLG: 30,
            },
         }}
      >
         <img src={image} alt={"Title image"} />
         <Typography.Title style={{ marginBottom: "2.5rem" }}>
            Линейная интерполяция:
         </Typography.Title>
         <Form
            form={form}
            name="basic"
            size={"large"}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            style={{
               maxWidth: 1000,
            }}
            initialValues={{
               remember: true,
               fN: null,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
         >
            <Row gutter={16} justify="center">
               <Col span={10}>
                  <Form.Item label="x1" name="x1" rules={rules}>
                     <Input placeholder={"1"} />
                  </Form.Item>
               </Col>
               <Col span={10}>
                  <Form.Item label="f(x1)" name="fx1" rules={rules}>
                     <Input placeholder={"5"} />
                  </Form.Item>
               </Col>
               <Col span={10}>
                  <Form.Item label="xN" name="xN" rules={rules}>
                     <Input placeholder={"2"} />
                  </Form.Item>
               </Col>
               <Col span={10}>
                  <ConfigProvider
                     theme={{
                        token: {
                           colorBgContainer: "#95de64",
                        },
                     }}
                  >
                     <Form.Item label="f(N)" name="fN">
                        <Input
                           disabled={inputDisabled}
                           style={{ fontWeight: "700" }}
                        />
                     </Form.Item>
                  </ConfigProvider>
               </Col>
               <Col span={10}>
                  <Form.Item label="x2" name="x2" rules={rules}>
                     <Input placeholder={"3"} />
                  </Form.Item>
               </Col>
               <Col span={10}>
                  <Form.Item label="f(x2)" name="fx2" rules={rules}>
                     <Input placeholder={"6"} />
                  </Form.Item>
               </Col>
            </Row>

            <Form.Item
               wrapperCol={{
                  span: 24,
               }}
            >
               <Button type="primary" htmlType="submit">
                  Рассчитать
               </Button>
            </Form.Item>
         </Form>
         <Typography.Paragraph>
            Сервис интерполяции онлайн (линейная интерполяция) поможет вам
            вычислить значение линейной функции, имея в распоряжении f(x) в двух
            различных точках, а также рассчитает уравнение прямой.
            <Typography.Text strong> Интерполяция</Typography.Text> - (от
            латинского interpolatio изменение, переделка), в математике и
            статике это способ вычислить промежуточное значение функции по
            нескольким уже известным ее значениям.
         </Typography.Paragraph>
      </ConfigProvider>
   );
}

export default App;
