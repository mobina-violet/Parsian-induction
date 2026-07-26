const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']

export function toPersianDigits(value: number | string) {
  return String(value).replace(/[0-9]/g, (digit) => persianDigits[Number(digit)])
}