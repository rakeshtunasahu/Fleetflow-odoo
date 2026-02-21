export const calculateROI = (revenue, fuel, maintenance, acquisition) =>
  (revenue - (fuel + maintenance)) / acquisition