export const filters = {
    manipulação_de_cores: [
        {
            name: "Inverter cores",
            key: "inversao",
        },
        {
            name: "Conversão para cinza",
            key: "cinza",
        },
    ],
    detecção_de_bordas: [
        {
            name: "Canny",
            key: "canny",
        }, 
        {
            name: "Prewitt",
            key: "prewitt",
        },
        {
            name: "Sobel",
            key: "sobel",
        },
        {
            name: "Laplaciano",
            key: "laplacian",
        }
    ],
    remoção_de_ruídos: [
        {
            name: "Bilateral",
            key: "bilateral",
        },
        {
            name: "Gaussiano",
            key: "gaussiano",
        },
        {
            name: "Mediana",
            key: "mediana",
        },
    ],
    filtros: [
        {
            name: "Sépia",
            key: "sepia",
        },
        {
            name: "Suavização",
            key: "suavizacao",
        },
    ],
    operações_morfológicas: [
        {
            name: "Erosão",
            key: "erosao",
        },
        {
            name: "Dilatação",
            key: "dilatacao",
        }
    ],
    limiarizacao: {
        name: "Limiarização",
    },
};