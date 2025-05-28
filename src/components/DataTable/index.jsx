import React, { useState, useEffect, useImperativeHandle } from "react";
import { Tabs, Empty } from "antd";
import useTableData from "@/hooks/useTableData";
import BasicTable from "@/components/BasicTable";
import SearchBarWraper from "@/components/SearchBar";
import { downloadFile } from "@/utils/util";

const DataTable = React.forwardRef((props, ref) => {
  const {
    searchItems,
    columns,
    urlApi,
    _key,
    accountId,
    channelType,
    staticParams = {},
    initialValue = {},
    btnColumns = [],
    tableConfig = {},
    tabsConfig = {},
    showSearchBar = true,
  } = props;

  let initTabsData = tabsConfig?.showTabs ? { [tabsConfig?.["searchKey"]]: tabsConfig?.["initValue"] } : {};

  const [searchParams, setSearchParams] = useState({ ...initialValue, ...initTabsData });
  const { pagination, dataList, handleChange, getList } = useTableData(urlApi, {
    accountId,
    channelType,
    ...staticParams,
    ...searchParams,
  });

  useEffect(() => {
    if (dataList) getList({ page: 1, ...searchParams });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accountId, channelType]);

  useEffect(() => {
    if (dataList) getList({ ...searchParams });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  // 初始化数据
  const initData = (data = {}) => {
    // maybe todo
    // let activeTabsData = tabsConfig?.showTabs
    //   ? { [tabsConfig?.["searchKey"]]: searchParams?.[tabsConfig?.["searchKey"]] }
    //   : {};
    setSearchParams({ page: 1, ...initialValue, ...initTabsData });
  };

  // ---查询
  const onConfirmSearch = (params = {}) => {
    let activeTabsData = tabsConfig?.showTabs
      ? { [tabsConfig?.["searchKey"]]: searchParams?.[tabsConfig?.["searchKey"]] }
      : {};
    setSearchParams({ ...params, ...activeTabsData });
  };

  // ---重置
  const onReset = () => {
    initData();
  };

  // --导出
  const onExport = async (params) => {
    if (!props.urlExportApi) return;
    let activeTabsData = tabsConfig?.showTabs
      ? { [tabsConfig?.["searchKey"]]: searchParams?.[tabsConfig?.["searchKey"]] }
      : {};
    let data = await props.urlExportApi({ accountId, channelType, ...staticParams, ...activeTabsData, ...params });
    // console.log(data, 11111111111111, "-onExport");
    downloadFile(data);
  };

  useImperativeHandle(ref, () => ({
    // maybe todo
    reLoadData: (params) => getList({ page: 1, ...initialValue, ...initTabsData, ...params }),
  }));

  const tabsleRender = () => {
    return (
      <BasicTable
        columns={[...columns, ...btnColumns]}
        pagination={props.pagination === undefined ? pagination : props.pagination}
        handleChange={(pages) => handleChange(pages, searchParams)}
        dataList={dataList || []}
        showTopTableScroll={props?.showTopTableScroll}
        emptyText={<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />}
        scroll={{ x: dataList?.lenght ? "max-content" : true, y: props?.scrollHeigt || "400px" }}
        {...tableConfig}
        keyId={_key}
      ></BasicTable>
    );
  };

  return (
    <section>
      {tabsConfig.showTabs && (
        <Tabs
          items={tabsConfig?.items}
          activeKey={searchParams?.[tabsConfig?.["searchKey"]]}
          onTabClick={(key) => {
            setSearchParams({ ...searchParams, [tabsConfig?.["searchKey"]]: key });
          }}
        />
      )}
      {showSearchBar && (
        <SearchBarWraper
          items={searchItems}
          onReset={onReset}
          onConfirmSearch={onConfirmSearch}
          onExport={onExport}
          exportButtonText={props?.exportButtonText || "导出数据"}
          showExportButton={props?.showExportButton || false}
          showSearchButton={props?.showSearchButton}
          showResetButton={props?.showResetButton}
          tailSpan={props?.tailSpan || "4"}
          tailAlign={props?.tailAlign || "center"}
        ></SearchBarWraper>
      )}
      {props?.children &&
        React.Children.map(props?.children, (child) =>
          React.cloneElement(child, {
            datas: dataList ? [...dataList]?.sort((a, b) => (a.statisticsTime > b.statisticsTime ? 1 : -1)) : [],
          })
        )}
      {tabsleRender()}
    </section>
  );
});

export default DataTable;
