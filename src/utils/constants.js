export const MATERIALS = {
  STEEL: {
    id: "steel",
    name: "Aço",
    linear_coefficient: 1.2e-5,
    melting_point: 1510, // em Celsius
    base_color: "#7a7a7a",
    texture: "../assets/textures/steel.png",
  },
  ALUMINUM: {
    id: "aluminum",
    name: "Alumínio",
    linear_coefficient: 2.3e-5,
    melting_point: 660,
    base_color: "#d1d5db",
    texture: "../assets/textures/aluminum.png",
  },
};

export const ITEM_INFO = [
  {
    id: "material",
    title: "Material",
    description: "Escolha o material do objeto a ser dilatado.",
    href: "#material",
    color: "var(--primary-blue)",
    icon: "./assets/icons/building.svg",
  },

  {
    id: "dilation-type",
    title: "Tipo de Dilatação",
    description: "Selecione o tipo de dilatação que deseja calcular.",
    href: "#dilation-type",
    color: "var(--accent-orange)",
    icon: "./assets/icons/expand.svg",
  },

  {
    id: "parameters",
    title: "Parâmetros",
    description:
      "Insira os parâmetros necessários para o cálculo da dilatação.",
    href: "#parameters",
    color: "var(--success-green)",
    icon: "./assets/icons/temperature.svg",
  },

  {
    id: "results",
    title: "Resultados",
    description:
      "Veja os resultados do cálculo da dilatação com base nos parâmetros fornecidos.",
    href: "#results",
    color: "var(--purple-card)",
    icon: "./assets/icons/result.svg",
  },

  {
    id: "calculation",
    title: "Cálculo Detalhado",
    description:
      "Acesse um passo a passo detalhado do cálculo da dilatação para entender melhor o processo.",
    href: "#calculation",
    color: "var(--cyan-card)",
    icon: "./assets/icons/calculation.svg",
  },
];
