import { $, component$, PropsOf, QRL, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

interface Params {
	nom: string,
	onclick?: QRL<(event: PointerEvent, element: HTMLSpanElement) => void>,
	oninput?: QRL<(event: InputEvent, element: HTMLInputElement) => void>,
	attr: {
		span?: PropsOf<'span'>,
		input?: PropsOf<'input'>
	}
}

import island, { Settings } from "~/island";
export default component$(() => {
	// Variables syncronisés dans toute l'application
	const parametres = useStore<Settings>({
		seed: '¯\\_(ツ)_/¯',
		resolution: 3,
		scale: 10,
		distance: 75
	})
	
	// Fonction sérialisée (détaché de l'applicatio,)
	const update = $(() => {
		island(parametres)
	})

	// eslint-disable-next-line qwik/no-use-visible-task
	useVisibleTask$(async () => {
		// Lorsque la page est visible, on créé l'île
		await update()
	})

	// Contrôles de la génération de l'île
	const params: Params[] = [
		{
			nom: "Seed",
			onclick: $(() => {
				parametres.seed = Math.random().toString(36).slice(2)
				update()
			}),
			oninput: $((_: InputEvent, t: HTMLInputElement) => {
				parametres.seed = t.value
				update()
			}),
			attr: {
				span: {
					class: "cursor-pointer select-none"
				},
				input: {
					value: parametres.seed,
					type: "text",
					class: "bg-transparent w-24"
				}
			}
		},
		{
			nom: "Résolution",
			oninput: $((_, t) => {
				const v = parseInt(t.value)
				if(v > 0) {
					parametres.resolution = v
					update()
				}
			}),
			attr: {
				input: {
					min: 1,
					type: "number",
					class: "bg-transparent w-10",
					value: parametres.resolution
				}
			}
		},
		{
			nom: "Taille",
			oninput: $((_, t) => {
				const v = parseInt(t.value)
				if(v >= 1) {
					parametres.scale = v
					update()
				}
			}),
			attr: {
				input: {
					min: 0,
					type: 'number',
					class: "bg-transparent w-10",
					value: parametres.scale
				}
			}
		},
		{
			nom: "Rayon",
			oninput: $((_, t) => {
				const v = parseInt(t.value)
				if(v >= 1) {
					parametres.distance = v
					update()
				}
			}),
			attr: {
				input: {
					min: 0,
					type: 'number',
					class: 'bg-transparent w-10',
					value: parametres.distance
				}
			}
		}
	]

	return <div class="w-full h-screen relative">
		<section class="absolute top-0 left-0 m-2 p-4 flex flex-row gap-2">
			{
				params.map(param => <div 
					key={param.nom}
					class="rounded bg-white bg-opacity-25 p-2 h-fit
					text-white flex gap-3">
					<span 
						onClick$={param.onclick}
						{...param.attr.span}>{param.nom}</span>
					<input 
						onInput$={param.oninput}
						{...param.attr.input} />
				</div>)
			}
		</section>
		<canvas id="island" class="w-full h-full"/>
	</div>
});

export const head: DocumentHead = {
	title: "Island generation",
	meta: []
};
