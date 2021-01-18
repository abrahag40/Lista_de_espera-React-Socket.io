import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  InputNumber,
  Typography,
  Divider,
} from "antd";
import { SaveOutlined } from "@ant-design/icons";
import { Redirect, useHistory } from "react-router-dom";
import { useHideMenu } from "../hooks/useHideMenu";
import { getuUsuarioStorage } from "../helpers/getUsuarioStorage";

const { Title, Text } = Typography;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 4, span: 16 },
};

export const Ingresar = () => {

  const history = useHistory();
  
  useHideMenu(false);

  const [ usuario ] = useState( getuUsuarioStorage() )

  const onFinish = ({ agente, escritorio }) => {
    localStorage.setItem("agente", agente);
    localStorage.setItem("escritorio", escritorio);

    console.log("Success:", agente);
    history.push("/escritorio");
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  if ( usuario.agente && usuario.escritorio  ) {
    return <Redirect to="/escritorio" />
  }

  return (
    <>
      <Title level={2}> Ingresar </Title>
      <Text> Ingrese su nombre y número de escritorio </Text>
      <Divider />
      <Form
        {...layout}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Nombre del agente"
          name="agente"
          rules={[{ required: true, message: "Por favor, ingrese su nombre" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Escritorio"
          name="escritorio"
          rules={[
            { required: true, message: "Ingrese el número de escritorio" },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit" shape="round">
            Ingresar
            <SaveOutlined />
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
