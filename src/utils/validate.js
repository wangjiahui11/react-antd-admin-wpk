/* eslint-disable no-template-curly-in-string */
const typeTemplate = "'${label}' 不合法 ${type}"
export const validateMessages = {
  required: "${label} 不能为空!",
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  number: {
    len: "'${label}' 的长度必须等于 ${len}",
    min: "'${label}' 不能小于 ${min}",
    max: "'${label}' 不能大于 ${max}",
    range: "'${label}' 必须在 ${min} 和 ${max}之间",
  },
  pattern: {
    mismatch: "'${label}' does not match pattern ${pattern}",
  },
}
// 校验银行卡号
export const checkIsBankcard = {
  pattern: /^[0-9]{1,22}$/,
  message: "请输入正确的银行卡格式！",
}

// 校验手机号和邮箱
export const checkIsMobileAndEmail = {
  pattern: /^1[3456789]\d{9}$|^\w+(-+.\w+)*@\w+(-.\w+)*.\w+(-.\w+)*$/,
  message: " 请输入正确的邮箱或手机号格式！",
}

// 校验邮箱
export const checkIsEmail = {
  pattern: /^\w+(-+.\w+)*@\w+(-.\w+)*.\w+(-.\w+)*$/,
  message: "请输入正确的邮箱格式！",
}

// 校验是否为合法手机号
export const checkIsMobile = {
  pattern: /^1[3456789]\d{9}$/,
  message: "请输入正确的手机号码格式！",
}

// 校验是否为价格
export const checkIsPositiveNumberOrZero = {
  pattern: /^(0|([1-9]\d*))(\.\d{1,2})?$/,
  message: "请输入正确的价格",
}

// 校验是否为大于等于0的整数
export const checkIsPositiveInteger = {
  pattern: /(^[1-9]\d*$)/,
  message: "请输入正整数",
}

// 校验是否为非负整数
export const checkIsPositiveIntegerOrZero = {
  pattern: /(^[1-9]\d*|0$)/,
  message: "请输入整数",
}

// 检验身份证号是否合法
export const checkIsIDNumber = {
  pattern:
    /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  message: "请输入正确的身份证号",
}

/**
 * 判断空数组
 * @param {Array} array 需要判断的数组
 * @returns {boolean}
 */

export const isEmptyArray = (array) => {
  return !Array.isArray(array) || array.length === 0
}

/**
 * 判断空对象
 * @param {Object} object 需要判断的对象
 * @returns {boolean}
 */
export const isEmptyObject = (object) => {
  let empty = false
  if (!(object instanceof Object)) {
    object = {}
  }
  empty = Object.keys(object).length === 0
  return empty
}

export const isEmptyValue = (value) => {
  return value == null || value === ""
}

/**
 * 判断一个函数是否是一个生成器函数
 * @param {Function} fn
 * @returns {Boolean}
 */
export const isGeneratorFunction = (fn) => {
  return (
    fn && Object.prototype.toString.call(fn) === "[object GeneratorFunction]"
  )
}

export const isNotNumber = (value) => {
  return isEmptyValue(value) || isNaN(value)
}

export const noopValidator = (rule, value, callback) => callback()

export const patterns = {
  integer: /^[1-9]\d*$/,
  nonNegativeInteger: /^(0|[1-9]\d*)$/,
  limitedInteger: /^[1-9]\d{0,7}$/,
  cashTwo: /^(([1-9]{1}\d*)|(0{1}))(\.\d{2})?$/,
  cash: /^(([1-9]{1}\d*)|(0{1}))(\.\d{0,2})?$/,
  invalidCash: /\..{3}/,
}

export const urlValidator = (value, callback) => {
  if (!value) {
    return callback()
  }
  var pattern = /^(https?:\/\/(([a-zA-Z0-9]+-?)+\.)+[a-zA-Z]+)(:\d+)?(\/.*)?(\?.*)?(#.*)?$/

  if (pattern.test(value)) {
    return callback()
  }
  return callback(new Error("请输入正确的url"))
  // callback()
}

export const validators = {
  isPatternMatch: (value, pattern) => {
    if (!value) {
      return true
    }
    return pattern && pattern.test && pattern.test(value)
  },
  isNumber: (number) => {
    return !isNotNumber(number)
  },
  isBetween: (number, min, max) => {
    return validators.isNumber(number) && number >= min && number <= max
  },
  isLessThan: (number, targetNumber) => {
    if (isNotNumber(number) || isNotNumber(targetNumber)) {
      return true
    }
    return +number < +targetNumber
  },
  isLessThanOrEqualTo: (number, targetNumber) => {
    if (isNotNumber(number) || isNotNumber(targetNumber)) {
      return true
    }
    return +number <= +targetNumber
  },
  isLargerThan: (number, targetNumber) => {
    if (isNotNumber(number) || isNotNumber(targetNumber)) {
      return true
    }
    return +number > +targetNumber
  },
  isLargerThanOrEqualTo: (number, targetNumber) => {
    if (isNotNumber(number) || isNotNumber(targetNumber)) {
      return true
    }
    return +number >= +targetNumber
  },
  isEmptyArray,
  isEmptyObject,
  isEmptyValue,
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  isEmptyArray,
  isEmptyObject,
  isEmptyValue,
  isGeneratorFunction,
  isNotNumber,
  noopValidator,
  patterns,
  validators,
}
