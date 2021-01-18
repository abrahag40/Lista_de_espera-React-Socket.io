import { Button, Col, Divider, Row, Typography } from "antd";
import { CloseCircleOutlined, RightOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import { useHideMenu } from "../hooks/useHideMenu";
import { getuUsuarioStorage } from "../helpers/getUsuarioStorage";
import { Redirect, useHistory } from "react-router-dom";
import { SocketContext } from "../context/SocketContext";

const { Title, Text } = Typography;

export const Escritorio = () => {
  useHideMenu(false);
  const [usuario] = useState(getuUsuarioStorage());
  const { socket } = useContext(SocketContext);
  const [ticket, setTicket] = useState(null);
  const history = useHistory();

  const salir = () => {
    localStorage.clear();
    history.replace("/ingresar");
  };

  const siguienteTicket = () => {
    socket.emit("siguiente-ticket-trabajar", usuario, (ticket) => {
      setTicket(ticket);
    });
  };

  if (!usuario.agente || !usuario.escritorio) {
    localStorage.clear();
    return <Redirect to="/ingresar" />;
  }

  return (
    <>
      <Row>
        <Col span={20}>
          <Title level={2}> Fernando </Title>
          <Text> Usted está trabajando en el escritorio: </Text>
          <Text type="success"> 5 </Text>
        </Col>
        <Col span={4} align="rigth">
          <Button shape="round" type="danger" onClick={salir}>
            Salir
            <CloseCircleOutlined />
          </Button>
        </Col>
      </Row>

      <Divider />

      <Row>
        <Col>
          {ticket ? (
            <>
              <Text> Está atendiendo el ticket número: </Text>
              <Text style={{ fontSize: 30 }} type="danger">
                {ticket.numero}
              </Text>
            </>
          ) : (
            <>
              <Text style={{ fontSize: 30 }} type="success">
                No hay tickets pendientes
              </Text>
            </>
          )}
        </Col>
      </Row>

      <Row>
        <Col offset={18} span={6} align="right">
          <Button onClick={siguienteTicket} shape="round" type="primary">
            Siguiente
            <RightOutlined />
          </Button>
        </Col>
      </Row>
    </>
  );
};
