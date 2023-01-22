/**
 *
 *  "How to decide font color in white or black depending on background color?",
 *  https://stackoverflow.com/a/41491220
 *
 * @param backgroundColor
 * @param lightColor
 * @param darkColor
 */
export function pickContrastColor(backgroundColor: string, lightColor: string, darkColor: string): string {
  const color = (backgroundColor.charAt(0) === '#') ? backgroundColor.substring(1, 7) : backgroundColor;
  const R = parseInt(color.substring(0, 2), 16); // hexToR
  const G = parseInt(color.substring(2, 4), 16); // hexToG
  const B = parseInt(color.substring(4, 6), 16); // hexToB
  const UIColors = [R / 255, G / 255, B / 255];
  const c = UIColors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  const L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.179) ? darkColor : lightColor;
}
