import React from "react";
import { Typography, Row, Col, Divider, Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
const { Title, Text } = Typography;

const RowCard = (props) => {
  const { title = "观看数据概览", children, items, justify = "left", showDivider, showTips, tipsProps = {} } = props;
  const _tipsProps = { placement: "top", title: "消息提示", ...tipsProps };
  const { Icon = QuestionCircleOutlined } = tipsProps;

  return (
    <div className="row-card-container">
      <header className="row-card-header">
        <div className="header-left">
          <Title level={5}>{title}</Title>
          {showTips && (
            <Tooltip {..._tipsProps}>
              <Icon className="icon" />
            </Tooltip>
          )}
          {props?.headerLeftExtraContent && (
            <Text type="secondary" className="content">
              {props?.headerLeftExtraContent}
            </Text>
          )}
        </div>
        <div className="header-right">
          {props.headerRightExtraContent}
          {props?.linkUrl && <Link to={props?.linkUrl}>查看详情</Link>}
        </div>
      </header>
      {items?.length > 0 ? (
        <Row>
          {items.map((item, i) => (
            <Col
              style={{ display: "flex", justifyContent: justify }}
              span={Number.parseInt(24 / items?.length) || 3}
              key={item.name}
            >
              {React.cloneElement(children, {
                ...item,
              })}
              {showDivider && items.length - 1 !== i && (
                <Divider type="vertical" style={{ borderLeftColor: "grey", height: "90%" }} />
              )}
            </Col>
          ))}
        </Row>
      ) : (
        children && React.cloneElement(children, {})
      )}
    </div>
  );
};

export default RowCard;
