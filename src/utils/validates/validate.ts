import { cloneDeep, noop } from "lodash";

export const JOI_DEFAULT_MESSAGE = {
  // boolean
  "boolean.base": "Vui lòng nhập {{#label}} đúng định dạng.",

  // string
  "string.base": "Vui lòng nhập {{#label}} đúng định dạng.",
  "string.empty": "Vui lòng nhập {{#label}}.",
  "string.min": "Vui lòng nhập {{#label}} không ít hơn {{#limit}} ký tự.",
  "string.max": "Vui lòng nhập {{#label}} không vượt quá {{#limit}} ký tự.",
  "string.pattern.base": "Vui lòng nhập {{#label}} đúng định dạng.",
  "string.email": "Vui lòng nhập {{#label}} đúng định dạng.",
  "string.equal": "Vui lòng đảm bảo {{#label}} trùng khớp.",
  "string.length": "Vui lòng nhập {{#label}} có độ dài đúng {{#limit}} ký tự.",

  // number
  "number.base": "Vui lòng nhập {{#label}} đúng định dạng.",
  "number.integer": "Vui lòng nhập {{#label}} là số nguyên.",
  "number.min": "Vui lòng nhập {{#label}} không nhỏ hơn {{#limit}}.",
  "number.max": "Vui lòng nhập {{#label}} không lớn hơn {{#limit}}.",

  // array
  "array.base": "Vui lòng nhập {{#label}} đúng định dạng.",
  "array.unique": "Vui lòng đảm bảo các {{#label}} không trùng lặp.",
  "array.min": "Vui lòng nhập {{#label}} có ít nhất {{#limit}} phần tử.",
  "array.max": "Vui lòng nhập {{#label}} không vượt quá {{#limit}} phần tử.",
  "array.length": "Vui lòng nhập {{#label}} có đúng {{#limit}} phần tử.",
  "array.includesRequiredUnknowns": "Vui lòng kiểm tra lại {{#label}}.",
  "array.includesRequiredKnowns": "Vui lòng nhập đầy đủ {{#label}}.",

  // object
  "object.base": "Vui lòng nhập {{#label}} đúng định dạng.",
  "object.unknown": "Vui lòng kiểm tra lại, trường {#key} không được xác định.",
  "object.instance": "Vui lòng đảm bảo {{#label}} đúng định dạng.",

  // binary
  "binary.base": "Vui lòng nhập {{#label}} đúng định dạng.",
  "binary.min": "Vui lòng nhập {{#label}} không ít hơn {{#limit}} bytes.",
  "binary.max": "Vui lòng nhập {{#label}} không vượt quá {{#limit}} bytes.",

  // any
  "any.only":
    "Vui lòng nhập {{#label}} là {if(#valids.length == 1, '', 'một trong ')}{{#valids}}.",
  "any.required": "Vui lòng nhập {{#label}}.",
  "any.unknown": "Vui lòng kiểm tra lại, trường {#key} không được xác định.",
  "any.invalid": "Vui lòng kiểm tra lại, {{#label}} không hợp lệ.",
  "any.exists": "Vui lòng kiểm tra lại, {{#label}} đã tồn tại.",
};

export const JOI_DEFAULT_OPTIONS = {
  abortEarly: false,
  errors: {
    wrap: { label: false },
    language: { "any.exists": "any.exists" },
  },
  stripUnknown: true,
};

export function validate(
  schema: any,
  data: any,
  event = { onSuccess: noop, onError: noop }
) {
  const { value, error } = schema.messages(JOI_DEFAULT_MESSAGE).validate(data, {
    ...JOI_DEFAULT_OPTIONS,
    context: {
      data: cloneDeep(data),
    },
  });
  if (error) {
    const details = error.details.reduce(function (pre: any, curr: any) {
      const path = curr.path.join(".");
      if (!(path in pre)) {
        pre[path] = curr.message;
      }
      return pre;
    }, {});
    event.onError(details);
  } else {
    event.onSuccess(value);
  }
}
