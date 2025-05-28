import React from "react";
import { Typography } from "antd";
const { Text } = Typography;

const ColoredText = (text, props) => {
  const { color = "#000", prefix = "", suffix = "" } = props || {};
  let _color = color;
  if (color === "auto") {
    _color = text >= 0 ? "red" : "green";
  }
  return (
    <span style={{ color: _color }}>
      {prefix}
      {text || 0}
      {suffix}
    </span>
  );
};

const DataItemCard = (props) => {
  const {
    dataList = {},
    name,
    desc = "昨日订单输入",
    textColor = "#000",
    textPrefix = "",
    textSuffix = "",
    val = "value",
    val1 = "increase1",
    val2 = "increase7",
    showRate = true,
    textAlign = "left",
    footerExtraContent,
  } = props;
  let item;

  if (Object.prototype.toString.call(dataList?.[name]) === "[object Object]") {
    item = dataList?.[name] || {
      [val]: 0,
      [val1]: 0,
      [val2]: 0,
    };
  } else {
    item = { [val]: dataList?.[name] };
  }

  return (
    <div className="card-data-item" style={{ textAlign: textAlign }}>
      <Text>{desc}</Text>
      <div style={{ fontSize: "32px", fontWeight: "bold", margin: "2px 0" }}>
        {ColoredText(item?.[val], { color: textColor, prefix: textPrefix, suffix: textSuffix })}
      </div>
      {showRate && (
        <Text type="secondary">
          <span>较前日&nbsp;</span>
          {ColoredText(item?.[val1], { color: "auto", suffix: "%" })}
          <span style={{ marginLeft: "14px" }}>7日前&nbsp;</span>
          {ColoredText(item?.[val2], { color: "auto", suffix: "%" })}
        </Text>
      )}
      {footerExtraContent && <Text type="secondary">{footerExtraContent}</Text>}
    </div>
  );
};

export default DataItemCard;
