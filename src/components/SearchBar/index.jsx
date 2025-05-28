import React, { useState, useImperativeHandle, useEffect } from "react"
import { Form, Button, DatePicker, Input, Select, Cascader, Radio, Switch } from "antd"
import { transformDateRange } from "@/utils/base"
import "moment/locale/zh-cn"
import moment from "moment"
import "./index.less"

const { RangePicker } = DatePicker
const { Item: FormItem } = Form
const dateFormat = "YYYY-MM-DD"
moment.locale("zhCN")

const handleFilterData = (values, searchItems) => {
  if (typeof values === "object" && values !== null) {
    let data = {}
    for (const key in values) {
      const item = values[key]
      // 处理时间函数--format
      if (Array.isArray(item) && item.length === 2) {
        // 获取查询的时间过滤类型
        let _dateFormat = searchItems.find((_) => _.name === key)?.props?.dataFormat || dateFormat
        if (item.every((ele) => moment.isMoment(ele))) {
          let rangeRes = transformDateRange(
            [moment(item[0]).format(_dateFormat), moment(item[1]).format(_dateFormat)],
            key,
            4
          )
          Object.assign(data, rangeRes)
        }

        continue
      }
      if (![null, undefined, ""].includes(item)) {
        data[key] = values[key]
      }
    }
    return data
  } else {
    console.log("数据类型错误")
    return {}
  }
}

// 捕获promise错误的方法
const awaitWrap = (promise) => {
  return promise.then((data) => [null, data]).catch((err) => [err, null])
}

// ---防抖的操作----
const debounce = (() => {
  let timeout
  return function (func, wait = 300) {
    const args = [...arguments]
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => {
      if (func) func.apply(null, args)
    }, wait)
  }
})()

const SearchBar = React.memo(
  React.forwardRef((props, ref) => {
    const {
      className,
      items,
      getItems,
      showSearchButton,
      showResetButton,
      showExportButton,
      collapsible,
      searchButtonText,
      resetButtonText,
      exportButtonText,
      expandButtonText,
      collapseButtonText,
      tailAlign,
      tailSpan,
      formSize,
      onValuesChange,
    } = props

    const [form] = Form.useForm()
    const [expand, setExpand] = useState(false)
    const handleSubmit = async (isSearching = true) => {
      let [err, values] = await awaitWrap(form.validateFields())
      if (!err && props.onConfirmSearch) {
        let params = handleFilterData(values, items)
        isSearching && props.onConfirmSearch && props.onConfirmSearch({ page: 1, ...params })
        return params
      } else {
        return false
      }
    }
    const onChangeValues = async (isSearching = true) => {
      let [err, values] = await awaitWrap(form.validateFields())
      if (!err && props.onValuesChange) {
        let params = handleFilterData(values, items)
        isSearching && props.onValuesChange && props.onValuesChange(params)
        return params
      } else {
        return false
      }
    }
    // 导出数据
    const handleExport = async (isSearching = true) => {
      let [err, values] = await awaitWrap(form.validateFields())
      if (!err && props.onExport) {
        let params = handleFilterData(values, items)
        isSearching && props.onExport && props.onExport(params)
        return params
      } else {
        return false
      }
    }

    const resetFields = (fieldNames = []) => {
      if (Array.isArray(fieldNames) && fieldNames.length) form.resetFields(fieldNames)
      form.resetFields()
    }

    useImperativeHandle(ref, () => ({
      resetFields,
      handleSubmit,
    }))

    const handleReset = () => {
      if (props.onReset && props.onReset() === false) {
        return false
      }
      resetFields()
    }

    const handleSubmitClick = () => {
      const { debounceWait } = props
      debounce.apply(null, [handleSubmit, debounceWait || 300])
    }

    const handleExportClick = () => {
      const { debounceWait } = props
      debounce.apply(null, [handleExport, debounceWait || 300])
    }

    const handlePressEnter = () => {}

    const toggleExpand = () => {
      setExpand(!expand)
    }

    const createFormField = (fieldData) => {
      let withoutForm = false
      let fieldComponent = null

      const labelSelectable = fieldData.label && Array.isArray(fieldData.label.options)
      const fieldLabel = labelSelectable ? fieldData.label : fieldData.label
      if (typeof fieldData.type === "string") {
        const fieldType = fieldData.type.toLowerCase()

        if (fieldType === "input") {
          fieldComponent = (
            <Input
              style={{ borderRadius: "5px" }}
              data-prevent-submit={fieldData.preventSubmit}
              onPressEnter={handlePressEnter}
              {...fieldData.props}
            />
          )
        }

        if (fieldType === "textarea") {
          fieldComponent = <Input.TextArea data-prevent-submit={fieldData.preventSubmit} {...fieldData.props} />
        }

        if (fieldType === "select") {
          const { valueKey = "value", labelKey = "label", options = [], allowClear = true, defaultValue } = fieldData
          fieldComponent = (
            <Select
              showSearch
              allowClear={allowClear}
              defaultValue={defaultValue ? defaultValue : "全部"}
              filterOption={(input, { children }) => children.includes(input)}
              {...fieldData.props}
            >
              {options.map((item) => (
                <Select.Option key={item[valueKey]} title={item[labelKey]} value={item[valueKey]} {...item.optionProps}>
                  {item[labelKey]}
                </Select.Option>
              ))}
            </Select>
          )
        }

        if (fieldType === "radio") {
          const { options = [], optionType = "button", buttonStyle = "outline ", initialValue } = fieldData
          fieldComponent = (
            <Radio.Group options={options} value={initialValue} optionType={optionType} buttonStyle={buttonStyle} />
          )
        }
        if (fieldType === "date") {
          fieldComponent = <DatePicker className="lz-date-picker" {...fieldData.props} />
        }

        if (fieldType === "range") {
          withoutForm = true
          fieldComponent = (
            <FormItem
              className={`label-size-${fieldData.labelSize || "medium"} ${labelSelectable ? "label-selectable" : ""}`}
              initialValue={fieldData.initialValue}
              name={fieldData.name}
              label={fieldLabel}
            >
              <RangePicker
                defaultValue={fieldData.rangeDefault}
                dataFormat={fieldData?.props?.dataFormat || "YYYY-MM-DD"}
                {...fieldData.props}
                placeholder={["开始日期", "结束日期"]}
              />
            </FormItem>
          )
        }

        // if (fieldType === 'month') {
        //   fieldComponent = <MonthPicker className="lz-month-picker" {...fieldData.props} />
        // }

        // if (fieldType === 'week') {
        //   fieldComponent = <WeekPicker className="lz-week-picker" {...fieldData.props} />
        // }

        if (fieldType === "button") {
          fieldComponent = <Button {...fieldData.props} />
        }
        if (fieldType === "switch") {
          fieldComponent = <Switch {...fieldData.props} />
        }

        if (fieldType === "cascader") {
          fieldComponent = <Cascader className="lz-cascader" {...fieldData.props} options={fieldData.options} />
        }
      }

      if (fieldData.component) {
        fieldComponent = fieldData.component
      }

      if (fieldData.render) {
        fieldComponent = fieldData.render(this)
      }

      if (typeof fieldData.withoutForm !== "undefined") {
        withoutForm = fieldData.withoutForm
      }

      if (!withoutForm && fieldComponent) {
        return (
          <FormItem
            className={`label-size-${fieldData.labelSize || "medium"} ${labelSelectable ? "label-selectable" : ""}`}
            initialValue={fieldData.initialValue}
            rules={fieldData.rules}
            label={fieldLabel}
            name={fieldData.name}
          >
            {fieldComponent}
          </FormItem>
        )
      }

      return fieldComponent
    }

    let expandedTailAlign = tailAlign
    let collapsedTailAlign = tailAlign
    let expandedTailSpan = tailSpan
    let collapsedTailSpan = tailSpan

    if (Array.isArray(tailSpan)) {
      ;[expandedTailSpan, collapsedTailSpan] = tailSpan
    }

    const tailAlignToApply = expand ? expandedTailAlign : collapsedTailAlign
    const tailSpanToApply = expand ? expandedTailSpan : collapsedTailSpan
    const formItems = items && items.length ? items : []
    return (
      <div className="search-wrapper">
        <Form
          form={form}
          size={formSize}
          onValuesChange={onChangeValues}
          className={`lz-component-search-bar ${className} ${false ? "expanded" : "collapsed"}`}
        >
          <div className="search-bar-inner-content">
            {formItems.map((item) => {
              if (item.isHidden) return
              if (item.excluded) {
                return null
              }
              const fieldName = Array.isArray(item.name) ? item.name.join("-") : item.name
              return (
                <div
                  key={fieldName}
                  className={`item item-${fieldName} ${item.hidden ? "hidden" : ""} ${
                    item.collapsible ? "collapsible" : ""
                  } span-${item.span || 1}`}
                >
                  {createFormField(item)}
                </div>
              )
            })}
            {showSearchButton || showResetButton || showExportButton ? (
              <div className={`item form-buttons align-${tailAlignToApply} span-${tailSpanToApply}`}>
                {showSearchButton ? (
                  <Button type="primary" onClick={handleSubmitClick}>
                    {searchButtonText}
                  </Button>
                ) : null}
                {showResetButton ? (
                  <Button className="button-reset" onClick={handleReset}>
                    {resetButtonText}
                  </Button>
                ) : null}
                {showExportButton ? (
                  <Button className="button-search" type="primary" onClick={handleExportClick}>
                    {exportButtonText}
                  </Button>
                ) : null}
                {props.children}
                {/* {collapsible ? (
                <a className="button button-toggle-expand" onClick={toggleExpand}>
                  <span>{expand ? collapseButtonText : expandButtonText}</span>
                  <Icon
                    type={expand ? 'caret-up' : 'caret-down'}
                    component={expand ? UpOutlined : DownOutlined}
                  />
                </a>
              ) : null} */}
              </div>
            ) : null}
          </div>
        </Form>
      </div>
    )
  })
)

SearchBar.defaultProps = {
  className: "",
  items: [],
  onChange: null,
  onConfirmSearch: null,
  collapsible: false,
  defaultCollapsed: true,
  expandButtonText: "展开",
  collapseButtonText: "收起",
  showSearchButton: true,
  showResetButton: true,
  searchButtonText: "查询",
  resetButtonText: "重置",
  exportButtonText: "导出数据",
  tailAlign: "left",
  tailSpan: 1,
  formSize: "normal",
}

export default SearchBar
