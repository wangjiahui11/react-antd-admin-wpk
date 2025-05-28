## 精简版通用搜索栏组件

根据除传入的配置显示一个包含多个搜索条件的搜索栏

#### 使用示例

```jsx
import React from "react";
import SearchBar from "components/SearchBar";

export default class PageDemo extends React.Component {
  getSearchBarItems = () => {
    return [
      {
        name: "name",
        label: "姓名",
        type: "input",
        props: {
          placeholder: "请填写姓名",
        },
      },
      {
        name: "gender",
        label: "性别",
        type: "select",
        initialValue: "",
        options: [
          {
            value: "",
            label: "全部",
          },
          {
            value: "male",
            label: "男",
          },
          {
            value: "female",
            label: "女",
          },
        ],
      },
      {
        name: "age",
        type: "input",
        label: {
          // 可下拉选择的label
          name: "age_type",
          initialValue: "1",
          options: [
            {
              value: "1",
              label: "周岁",
            },
            {
              value: "2",
              label: "虚岁",
            },
          ],
        },
      },
    ];
  };

  handleChange = (changedSearchOptions) => {};

  handleConfirmSearch = (searchOptions) => {
    // do something with `searchOptions`
  };

  render() {
    return (
      <div className="page-demo">
        <SearchBar
          items={this.getSearchBarItems()}
          tailSpan={2}
          tailAlign="right"
          onChange={this.handleChange}
          onConfirmSearch={this.handleConfirmSearch}
        />
      </div>
    );
  }
}
```

> 注意：此搜索栏组件没有内置 API 接口请求功能，仅提供搜索项的展示和交互功能，搜索的实际操作请通过`onConfirmSearch`属性进行处理

#### 组件属性

| Name               | Type                                                                              | Description                                                                                                        |
| :----------------- | :-------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------- |
| items              | `SearchBarItem[]`                                                                 | 搜索栏搜索项配置数组                                                                                               |
| getItems           | `(form: Antd.WrappedFormUtils) => SearchBarItem[]`                                | 用于返回`搜索栏搜索项配置数组`的函数，可以从参数中拿到搜索栏的`form`实例                                           |
| loading            | `boolean`                                                                         | 加载中状态标志                                                                                                     |
| className          | `string`                                                                          | 自定义样式名                                                                                                       |
| onChange           | `({[key string]: any}) => void`                                                   | 搜索项发生变化时的回调函数                                                                                         |
| onConfirmSearch    | `({[key string]: any}) => void`                                                   | 确认搜索时的回调函数                                                                                               |
| onReset            | `() => void`                                                                      | 重置表单时的回调函数，可以在此函数中 return false 来阻止重置                                                       |
| showSearchButton   | `boolean`                                                                         | 是否展示搜索按钮                                                                                                   |
| showResetButton    | `boolean`                                                                         | 是否展示重置按钮                                                                                                   |
| searchButtonText   | `string`\|`JSX.Element`                                                           | 搜索按钮上的文案，默认为“搜索”                                                                                     |
| resetButtonText    | `string`\|`JSX.Element`                                                           | 重置按钮上的文案，默认为“重置”                                                                                     |
| collapsible        | `boolean`                                                                         | 是否显示"展开\收起"按钮，默认不展示                                                                                |
| defaultCollapsed   | `boolean`                                                                         | 是否默认收起搜索栏                                                                                                 |
| expandButtonText   | `string`\|`JSX.Element`                                                           | 展开按钮上的文案，默认为“展开”                                                                                     |
| collapseButtonText | `string`\|`JSX.Element`                                                           | 收起按钮上的文案，默认为“收起”                                                                                     |
| tailSpan           | `1`\|`2`\|`3` 或 [`1`\|`2`\|`3`, `1`\|`2`\|`3`]                                   | 尾部区域（搜索、重置、展开收起）所占的列数，默认`1`(占 1 列)，若以数组形式传入则分别用于指定展开和收缩时的所占列数 |
| tailAlign          | `left`\|`center`\|`right`或[`left`\|`center`\|`right`, `left`\|`center`\|`right`] | 尾部区域内容对齐方式，默认`left`(居左)，若以数组形式传入则分别用于指定展开和收缩时的对齐方式                       |

> items 和 getItems 二选一即可，如果都传入，则只有 items 会生效

#### SearchBarItem 搜索项

| Name             | Type                                  | Description                                                                                                                                                                                                     |
| :--------------- | :------------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| type             | `string`                              | 搜索项的类型，目前支持`input`,`select`,`date`,`range`,`week`,`month`,`button`,`cascader`,`textarea`                                                                                                             |
| component        | `JSX.Element`                         | 若`type`不满足需求，可以通过 component 传入一个自定义的 React 组件                                                                                                                                              |
| render           | `(SearchBarInstance) => JSX.Ellement` | 指定一个`render`函数，函数返回的`JSX.Element`将会渲染到搜索栏中，可以通过函数的参数获取到搜索栏的实例                                                                                                           |
| withoutForm      | `boolean`                             | 默认情况下，每个搜索项都作为一个 antd 表单项来渲染，并用`getFieldDecorator`包裹，指定`withoutForm`为`true`则只会原封不动地渲染传入的`component`或`render`                                                       |
| name             | `string`\|`[string, string]`          | 搜索项的 name 属性，当`type`为`range`时，需要传入一个数组，其前 2 个成员将分别作为`range`的开始和结束的字段名，如`['beginTime', 'endTime']`                                                                     |
| label            | `string`                              | `SearchBarSelectableLabel`                                                                                                                                                                                      | 搜索项的标签文本，指定为符合`SearchBarSelectableLabel`类型的数据时，可以展示为下拉框 |
| collapsible      | `boolean`                             | 是否在收起搜索栏时隐藏此搜索项，默认为`false`，即需要设定某些搜索项的`collapsible`属性为`ture`后，搜索栏的展开和收起操作才有效果                                                                                |
| hidden           | `boolean`                             | 是否隐藏此搜索项(隐藏后的搜索项，其字段值仍然会保留)                                                                                                                                                            |
| excluded         | `boolean`                             | 是否排除此搜索项                                                                                                                                                                                                |
| labelSize        | `small`\|`medium`\|`large`            | 搜索项文本标签的宽度，分别可展示 4、6、8 个汉字                                                                                                                                                                 |
| span             | `1`\|`2`\|`3`                         | 搜索项占据的列宽，默认为`1`                                                                                                                                                                                     |
| initialVavlue    | `any`                                 | 搜索项的初始值                                                                                                                                                                                                  |
| preventSubmit    | `boolean`                             | 对于 type 为`input`的搜索项，指定为`true`可以阻止该输入框在按下回车后出发提交(confirmSearch)操作                                                                                                                |
| options          | `{value: string, label: string}[]`    | 用于`select`类型的搜索项，`value`为`SelectOption`的值，`label`为`SelectOption`的显示文本                                                                                                                        |
| valueKey         | `string`                              | `options`数据中，用作`选项值`的字段名，默认为`value`                                                                                                                                                            |
| labelKey         | `string`                              | `options`数据中，用作`选项文本`的字段名，默认为`label`                                                                                                                                                          |
| props            | `{[key: string]: any}`                | 传给搜索项组件的其他属性                                                                                                                                                                                        |
| decoratorOptions | `Form.GetFieldDecoratorOptions`       | 搜索项的`getFieldDecorator`函数的第二个参数，可以在其中传入校验规则等，参考：[getFieldDecorator(id, options) 参数](<https://ant.design/components/form-cn/?#getFieldDecorator(id,-options)-%E5%8F%82%E6%95%B0>) |

#### SearchBarSelectableLabel 用于制定可下拉选择的 label，它继承于 SearchBarItem，目前与 SearchBarItem 的定义完全相同
