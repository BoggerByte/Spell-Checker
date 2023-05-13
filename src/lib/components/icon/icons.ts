interface Icon {
	box: number
	name: string
	svg: string
}

const icons: Icon[] = [
	{
		box: 16,
		name: 'plus',
		svg: `<path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M8 4L8 12M4 8L12 8" />`
	},
	{
		box: 16,
		name: 'copy',
		svg: `<path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M3 10H2.5C1.67157 10 1 9.32845 1 8.50002L1 2.5C1 1.67157 1.67158 1 2.50001 1L8.5 1.00002C9.32843 1.00002 10 1.67159 10 2.50002V3.00002M13.4999 6.00008L7.49994 6.00006C6.67151 6.00006 5.99994 6.67164 5.99994 7.50006L5.99993 13.5001C5.99993 14.3285 6.67151 15.0001 7.49993 15.0001H13.4999C14.3284 15.0001 14.9999 14.3285 14.9999 13.5001V7.50008C14.9999 6.67165 14.3284 6.00008 13.4999 6.00008Z" />`
	},
	{
		box: 16,
		name: 'cross',
		svg: `<path stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" d="M12 4L4 12M4 4L12 12" />`
	},
	{
		box: 24,
		name: 'chevron-up',
		svg: `<path stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />`
	},
	{
		box: 24,
		name: 'chevron-down',
		svg: `<path stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />`
	},
	{
		box: 24,
		name: 'chevron-right',
		svg: `<path stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />`
	},
	{
		box: 24,
		name: 'arrow-path',
		svg: `<path stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />`
	},
	{
		box: 24,
		name: 'star-filled',
		svg: `<path fill-rule='evenodd' clip-rule='evenodd' d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z' />`
	},
	{
		box: 24,
		name: 'star',
		svg: `<path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />`
	}
]

export default icons
