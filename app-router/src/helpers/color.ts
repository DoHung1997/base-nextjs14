export const HexToRgb = (hex: string) => {
  // Xóa bỏ ký tự '#' nếu có
  hex = hex.replace('#', '');

  // Chuyển đổi chuỗi hex thành các giá trị màu
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);
  // Trả về giá trị RGB dưới dạng chuỗi
  return {
    r, g, b
  };
};