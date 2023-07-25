export const validate = (rules = {}, values) => {
  let errObj = {};

  for (const errKey in rules) {
    for (const rule of rules[errKey]) {
      if (rule.required) {
        if (!!!values[errKey]?.trim()) {
          errObj[errKey] = rule.message || "Vui lòng không để trống!";
          break;
        }
      }
      if (rule?.regex instanceof RegExp) {
        if (!rule.regex.test(values[errKey])) {
          errObj[errKey] = rule.message || "Vui lòng nhập đúng định dạng!";
          break;
        }
      }
    }
  }
  return errObj;
};
