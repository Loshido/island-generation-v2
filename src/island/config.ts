// clamp renvoie 0 si n est au min
// et 1 si n est au max.
const clamp = (n: number, max: number, min: number) => (n - min) / (max - min)

// Arrondie une valeur
const r = (p: number) => Math.floor(p)

export const couleurs = [
    {
        name: "NEIGE",
        max: 100.0,
        min: 0.85,
        color: function(n: number) {
            const p = clamp(n, this.max, this.min)
            const sup = r(41 * p)
            return [255 - sup, 255 - sup, 255 - sup]
        }
    },
    {
        name: "ROCHERS",
        max: 0.85,
        min: 0.7,
        color: function(n: number) {
            const p = clamp(n, this.max, this.min)
            const sup = r(41 * p)
            return [82 + sup, 82 + sup, 82 + sup]
        }
    },
    {
        name: "HERBE",
        max: 0.7,
        min: 0.415,
        color: function(n: number) {
            const p = clamp(n, this.max, this.min)
            const sup = r(50 * p)
            return [70 - sup, 110 - sup, 70 - sup]
        }
    },
    {
        name: "TERRE",
        max: 0.415,
        min: 0.395,
        color: function(n: number) {
            const p = clamp(n, this.max, this.min)
            const sup = r(41 * p)
            return [119 + sup, 63 + sup, 41 + sup]
        }
    },
    {
        name: "SABLE",
        max: 0.395,
        min: 0.311,
        color: function(n: number) {
            const p = clamp(n, this.max, this.min)
            const sup = r(50 * p)
            return [235 - sup, 235 - sup, 205 - sup]
        }
    },
    {
        name: "MER",
        max: 0.311,
        min: 0.01,
        color: function(n: number) {
            const p = clamp(n, this.max, this.min)
            const sup = r(40 * p)
            return [sup, 60 + sup, 150 + sup]
        }
    }
]