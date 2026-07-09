export function scientificNotation(value, digits = 1) {
  const superscript = {
    "-": "⁻",
    0: "⁰",
    1: "¹",
    2: "²",
    3: "³",
    4: "⁴",
    5: "⁵",
    6: "⁶",
    7: "⁷",
    8: "⁸",
    9: "⁹",
  };

  const [mantissa, exponent] = value.toExponential(digits).split("e");

  return `${mantissa.replace(".", ",")} × 10${[...exponent].map((c) => superscript[c]).join("")}`;
}
