export const MATERIALS = {
  STEEL: {
    id: "steel",
    name: "Aço",

    linear_coefficient: 1.2e-5,
    melting_point: 1425,
    boiling_point: 3000,

    base_color: "#6B7280",

    icon: "../assets/icons/materials/steel.svg",
    texture: "../assets/textures/steel.png",
  },

  ALUMINUM: {
    id: "aluminum",
    name: "Alumínio",

    linear_coefficient: 2.3e-5,
    melting_point: 660,
    boiling_point: 2470,

    base_color: "#D1D5DB",

    icon: "../assets/icons/materials/steel.svg",
    texture: "../assets/textures/aluminum.png",
  },

  COPPER: {
    id: "copper",
    name: "Cobre",

    linear_coefficient: 1.7e-5,
    melting_point: 1085,
    boiling_point: 2562,

    base_color: "#B87333",

    icon: "../assets/icons/materials/steel.svg",
    texture: "../assets/textures/copper.png",
  },

  IRON: {
    id: "iron",
    name: "Ferro",

    linear_coefficient: 1.1e-5,
    melting_point: 1200,
    boiling_point: 2860,

    base_color: "#4B5563",

    icon: "../assets/icons/materials/steel.svg",
    texture: "../assets/textures/iron.png",
  },

  GLASS: {
    id: "glass",
    name: "Vidro",

    linear_coefficient: 9.0e-6,
    melting_point: 1400,
    boiling_point: 2200,

    base_color: "#81D4FA",

    icon: "../assets/icons/materials/steel.svg",
    texture: "../assets/textures/glass.png",
  },

  PVC: {
    id: "pvc",
    name: "PVC",

    linear_coefficient: 7.0e-5,
    melting_point: 100,
    boiling_point: null,

    base_color: "#ECEFF1",

    icon: "../assets/icons/materials/steel.svg",
    texture: "../assets/textures/pvc.png",
  },
};

export const ITEM_INFO = [
  {
    id: "material",
    title: "Material",
    description: "Escolha o material do objeto a ser dilatado.",
    color: "var(--primary-blue)",
    icon: "./assets/icons/building.svg",
  },

  {
    id: "dilation-type",
    title: "Tipo de Dilatação",
    description: "Selecione o tipo de dilatação que deseja calcular.",
    color: "var(--accent-orange)",
    icon: "./assets/icons/expand.svg",
  },

  {
    id: "parameters",
    title: "Parâmetros",
    description:
      "Insira os parâmetros necessários para o cálculo da dilatação.",
    color: "var(--success-green)",
    icon: "./assets/icons/temperature.svg",
  },

  {
    id: "results",
    title: "Resultados",
    description:
      "Veja os resultados do cálculo da dilatação com base nos parâmetros fornecidos.",
    color: "var(--purple-card)",
    icon: "./assets/icons/result.svg",
  },

  {
    id: "calculation",
    title: "Cálculo Detalhado",
    description:
      "Acesse um passo a passo detalhado do cálculo da dilatação para entender melhor o processo.",
    color: "var(--cyan-card)",
    icon: "./assets/icons/calculation.svg",
  },
];

export const DILATATION_TYPES = ["linear", "superficial", "volumetric"];
