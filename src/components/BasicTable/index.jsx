import React, { useState, useEffect, useRef } from "react";
import { Table, Empty, Spin } from "antd";
import { debounce } from "@/utils/base";
import "./index.less";

const BasicTable = (props) => {
  const {
    dataList,
    pagination,
    handleChange,
    columns,
    keyId,
    showTopTableScroll = false,
    onRowClick,
    ..._props
  } = props;
  const wrapper = useRef(null);
  const [tableWidth, setableWidth] = useState(null);
  const _columns = columns.map((ele) => ({ ...ele, align: ele.align || "center" }));

  const rowSelection = props?.rowSelection?.type
    ? {
        columnWidth: 40,
        ...props.rowSelection,
      }
    : null;

  const renderEmptyText = () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ margin: "1.4rem 0" }} />;

  useEffect(() => {
    setTimeout(() => {
      handleListenerScroll();
    }, 600);

    return () => {
      document.removeEventListener("scroll", scrollTable);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleListenerScroll = () => {
    const tableTbody = document.querySelector(".ant-table-tbody");
    const tableWidth = tableTbody?.clientWidth-10;
    tableWidth && setableWidth(tableWidth);
    const tableBody = document.querySelector(".ant-table-content");
    tableBody?.addEventListener("scroll", scrollTable);
  };

  const tabScrollFn = (e) => {
    const tableBody = document.querySelector(".ant-table-content");
    tableBody.scrollLeft = e?.currentTarget?.scrollLeft;
  };

  const scrollTable = (e) => {
    const basicTableBody = document.querySelector(".basic-table-scroll");
    const tableBody = document.querySelector(".ant-table-content");
    if (basicTableBody) basicTableBody.scrollLeft = tableBody?.scrollLeft;
  };
  return (
    <div ref={wrapper} className="table-wrapper">
      {!!dataList?.length && tableWidth && showTopTableScroll && (
        <div className="basic-table-scroll" onScroll={tabScrollFn}>
          <div style={{ width: tableWidth ? `${tableWidth}px` : "100%" }}></div>
        </div>
      )}

      <Table
        {..._props}
        dataSource={dataList}
        rowClassName="table-title"
        className="table-title"
        rowKey={keyId}
        columns={_columns}
        locale={{
          emptyText: _props.emptyText || renderEmptyText(),
        }}
        pagination={pagination}
        rowSelection={rowSelection}
        onChange={handleChange}
        size="small"
        onRow={(record, index) => ({
          onClick: () => onRowClick && onRowClick(record, index),
        })}
        onScroll={tableWidth && scrollTable}
        scroll={{
          ...props.scroll,
          x: "max-content",
        }}
      />
    </div>
  );
};

BasicTable.defaultProps = {
  rowKey: "id", // 表格唯一键定义
};

export default BasicTable;
