const abbreviateNumber = (number: number): string =>
  new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
    compactDisplay: "short",
  }).format(number);

export default abbreviateNumber;
