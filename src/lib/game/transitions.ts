import { quadInOut } from 'svelte/easing'

export function swipe(node, { delay = 0, duration = 600 }) {
	return {
		delay,
		duration,
		easing: quadInOut,
		css: (t, u) => `
            transform: rotateZ(${25 * Math.sin(Math.PI * u)}deg) translate(${
			-300 * Math.sin(Math.PI * u)
		}px, ${-200 * Math.sin(Math.PI * u)}px);
            transform-origin: 50% -200px;
            z-index: ${u < 0.5 ? 10 : 0};
        `
	}
}
