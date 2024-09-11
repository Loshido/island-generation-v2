import { createNoise2D } from "simplex-noise"
import { couleurs } from "./config"
import alea from 'alea';

const colorize = (n: number) => {
    // On cherche à quelle couche appartient n.
    for(let i = 0; i < couleurs.length; i++) {
        // Si n est compris 
        // entre le maximum et le minimum de la couche
        if(couleurs[i].max > n && couleurs[i].min <= n) {
            // On donne la couleurs de la 
            // couche en fonction de n (pour le dégradé)
            const rgb = couleurs[i].color(n)
            return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
        }
    }
    return false
}

export interface Settings {
    resolution: number,
    seed: string,
    scale: number,
    distance: number
}


export default (p: Settings) => {
    // On récupère le canvas pour dessiner
    const island = document.getElementById('island') as HTMLCanvasElement
    const ctx = island.getContext('2d')
    if(!ctx) return
    ctx.imageSmoothingEnabled = false
    
    // On fixe la taille du dessin (canvas)
    island.height = window.innerHeight
    island.width = window.innerWidth
    const h = island.height
    const w = island.width
    
    // On remplit le fond du dessin avec du bleu
    ctx.fillStyle = 'rgb(0, 60, 150)'
    ctx.fillRect(0, 0, w, h)

    // libraire pour permettre de régénérer plusieurs
    // fois la même île
    const prng = alea(p.seed);
    // librairie pour utiliser le perlin noise
    const noise = createNoise2D(prng)

    // On prends le centre du dessin 
    // (accessoirement le centre de l'île)
    const center = [w / (p.resolution * 2), h / (p.resolution * 2)]

    const grid = []
    // On passe sur chaque pixel/zone de l'axe x
    for(let x = 0; x < w / p.resolution; x++) {
        grid.push([] as number[])

        // On passe sur chaque pixel/zone de l'axe y
        for(let y = 0; y < h / p.resolution; y++) {

            // On prends la distance du point(x, y) 
            // au centre avec pythagore
            const d = Math.sqrt((x - center[0]) ** 2 
                + (y - center[1]) ** 2)

            // Manipulations obscures
            const relativeMalus = (100 - p.distance) / 10000 
            const scale = (p.scale / 1000) * p.resolution

            
            const n = 
                // noise rend une valeur entre -1 et 1
                // (1 + noise(...)) / 2 permet 
                // d'avoir une valeur de n entre 0 et 1.
                (1 + noise(x * scale, y * scale)) / 2 

                // On réduit n par rapport à la distance
                // au centre pour avoir une île.
                - d * relativeMalus * p.resolution

            grid[x].push(n)
            // Si n est inférieur à 0, cela signifie 
            // que le point est sous l'eau
            // et qu'il ne faut pas le dessiner / calculer
            if(n > 0.0) {
                const couleur = colorize(n)
                if(couleur) {
                    ctx.fillStyle = couleur
                    ctx.fillRect(x * p.resolution, y * p.resolution, p.resolution, p.resolution)
                }
            }
        }
    }
}