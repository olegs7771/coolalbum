export const rotateDeg = int => {
  let deg;
  switch (int) {
    case 1:
      deg = 0;
      break;
    case 2:
      deg = 0;
      break;
    case 3:
      deg = 180;
      break;
    case 4:
      deg = 180;
      break;
    case 5:
      deg = 90;
      break;
    case 6:
      deg = 90;
      break;
    case 7:
      deg = 270;
      break;
    case 8:
      deg = 270;
      break;
    default:
      deg = 0;
  }
  return deg;
};
