import { Select, Spin } from 'antd'
import { debounce } from '@/utils/base'
import React, { useMemo, useState, useEffect, useImperativeHandle } from 'react'
const allOption = [{ value: '', label: '全部' }]

const defaultOptions = async (parmas, urlApi) => {
  if (typeof urlApi !== 'function') {
    console.error('没有输入请求接口地址')
    return []
  }
  let res = await urlApi(parmas)

  if (!res) return []

  // console.log('datadata===', res?.data)
  return res?.data ?? res ?? []

}

const LazySelect = React.memo(
  React.forwardRef((props, ref) => {
    const {
      componentRef,
      fetchOptions,
      wait = 800,
      dataMapper,
      urlApi,
      showAll = true,
      searchKey = 'name',
      defaultParams,
      allowFilter,
      value,
      onChange,
      handleChanged,
      valueKey,
      labelKey,
      ..._props
    } = props

    const [fetching, setFetching] = useState(false)
    const [options, setOptions] = useState([])

    //---- 默认加载数据转换函数
    const _dataMapper = (data) => {
      return (
        data?.map((item) => ({
          value: item[valueKey],
          label: item[labelKey],
        })) || []
      )
    }

    const loadOptions = async (value, requestParams = {}) => {
      setFetching(true)
      let data = await defaultOptions(
        { [searchKey]: value, ...defaultParams, ...requestParams },
        urlApi
      )

      let newOptions = (dataMapper && dataMapper(data)) || _dataMapper(data) || []
      if (showAll) {
        newOptions = [...allOption, ...newOptions]
      }
      setOptions(newOptions)
      setFetching(false)
    }

    const handleSearch = useMemo(() => {
      if (allowFilter) return
      return debounce(loadOptions, wait)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [wait])

    const handleonChange = (changedValue, option) => {
      onChange?.(changedValue)
      handleChanged && handleChanged(changedValue, option)
    }

    const filterOptionFn = () => (input, option) => {
      if (allowFilter) {
        return (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
      }
      return allowFilter
    }

    useEffect(() => {
      loadOptions()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props?.key])

    useImperativeHandle(ref, () => ({
      handleChangeOptions: (requestParams) => {
        props.onChange && props.onChange('')
        loadOptions('', requestParams)
      },
    }))

    return (
      <Select
        showSearch
        value={value}
        filterOption={filterOptionFn()}
        onChange={handleonChange}
        onSearch={handleSearch}
        notFoundContent={fetching ? <Spin size="small" /> : <div style={{textAlign: 'center'}}>No data</div>}
        {..._props}
        options={options}
      />
    )
  })
)

LazySelect.defaultProps = {
  placeholder: '请选择', // 默认参数
  searchKey: 'name', // 查询的key值
  urlApi: '', // 请求接口地址
  allowFilter: true, // 是否允许本地搜索
  allowClear: true, // 是否允许清除
  showSearch: true, // 是否允许搜索
  mode: '',//设置多选
  showAll: false, // 是否展示全部
  defaultParams: {}, // 默认参数
  labelKey: 'label', // option value 对应的
  valueKey: 'value', // 查询的key值
}

export default LazySelect
