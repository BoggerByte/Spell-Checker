import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import * as path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		VitePWA({
			includeAssets: [
				'public/favicon.ico',
				'public/apple-touch-icon.png',
				'public/masked-icon.svg'
			],
			manifest: {
				name: 'Guess The Letter',
				short_name: 'GTL',
				description: 'Game that will make you learn how to write words correctly',
				theme_color: '#ffffff',
				icons: [
					{
						src: 'pwa-192x192.png',
						sizes: '192x192',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png'
					},
					{
						src: 'pwa-512x512.png',
						sizes: '512x512',
						type: 'image/png',
						purpose: 'any maskable'
					}
				],
				screenshots: [
					{
						src: 'docs/screenshot_main_menu.jpg',
						sizes: '1322x422',
						label: 'Main Menu'
					}
				]
			}
		})
	],
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib'),
			$types: path.resolve('./src/lib/types')
		}
	},
	base: '/guess-the-letter/'
})
