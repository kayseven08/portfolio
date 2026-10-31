import type { Data } from './index';

const repo = (name: string) => `https://github.com/kayseven08/${name}`;
const tech = (name: string, url: string): { name: string; url: string } => ({ name, url });

export const defaultData: Data = {
	homePage: {
		headline: {
			imgURL: 'https://avatars.githubusercontent.com/u/129635995?v=4',
			content: "Hi, I'm ",
			name: 'Kesavan Rangarajan',
			location: 'Marietta, Georgia',
			tagline: [
				'Computer Engineering @ Georgia Tech',
				'Builder of software, robots, and experiments'
			]
		},
		info: {
			techStack: [
				tech('TypeScript', 'https://www.typescriptlang.org/'),
				tech('Svelte', 'https://svelte.dev/'),
				tech('Python', 'https://www.python.org/'),
				tech('Java', 'https://www.java.com/')
			]
		},
		projects: [
			{
				name: 'SPARK',
				date: '2026',
				category: 'AI / TypeScript',
				completed: false,
				technologies: [tech('TypeScript', 'https://www.typescriptlang.org/')]
			},
			{
				name: 'EnvSensingResearch',
				date: '2025',
				category: 'Research / Python',
				completed: false,
				technologies: [tech('Python', 'https://www.python.org/')]
			},
			{
				name: 'FRC-2026',
				date: '2026',
				category: 'Robotics / Java',
				completed: false,
				technologies: [tech('Java', 'https://www.java.com/')]
			},
			{
				name: 'taskermind',
				date: '2025',
				category: 'Web App / Vue',
				completed: true,
				technologies: [tech('Vue', 'https://vuejs.org/')]
			}
		]
	},
	aboutPage: {
		eyebrow: 'A little context',
		title: 'About me',
		intro: 'Hi, I’m Kesavan Rangarajan — a Computer Engineering student at Georgia Tech who likes turning ambitious ideas into working systems.',
		paragraphs: [
			'I build across web applications, AI assistants, environmental sensing, simulations, and competitive robotics.',
			'My current work includes SPARK, environmental sensing research with the Voicu Lab at Kennesaw State University, and software for CircuitRunners. I work primarily with TypeScript, Svelte, Python, and Java.'
		],
		stats: [
			{ value: 'GT', label: 'Computer Engineering' },
			{ value: 'AI', label: 'SPARK assistant' },
			{ value: 'FRC', label: 'CircuitRunners robotics' }
		],
		focusAreas: [
			'Useful interfaces',
			'Reliable systems',
			'Learning by building',
			'Open collaboration'
		]
	},
	projectsPage: {
		programmingProjects: [
			{
				name: 'SPARK',
				date: '2026',
				category: 'AI assistant',
				url: 'https://spark-va.vercel.app',
				technologies: [tech('TypeScript', 'https://www.typescriptlang.org/')],
				description: {
					overview:
						'Smart Protocol Assistant for Responsive Knowledge: an AI virtual assistant for controlling devices.'
				}
			},
			{
				name: 'EnvSensingResearch',
				date: '2025',
				category: 'Research',
				url: repo('EnvSensingResearch'),
				technologies: [tech('Python', 'https://www.python.org/')],
				description: { overview: 'A current environmental sensing and research project.' }
			},
			{
				name: 'taskermind',
				date: '2025',
				category: 'Web application',
				url: 'https://taskermind.vercel.app',
				technologies: [tech('Vue', 'https://vuejs.org/')],
				description: { overview: 'A Vue application for organizing tasks and thinking.' }
			},
			{
				name: 'My-Coding-Stuff',
				date: '2025',
				category: 'Web application',
				url: 'https://my-coding-stuff.vercel.app',
				technologies: [
					tech('JavaScript', 'https://developer.mozilla.org/en-US/docs/Web/JavaScript')
				],
				description: { overview: 'A collection of coding projects and experiments.' }
			},
			{
				name: 'Double-Pendulum',
				date: '2025',
				category: 'Simulation',
				url: repo('Double-Pendulum'),
				technologies: [tech('Python', 'https://www.python.org/')],
				description: { overview: 'An exploration of chaotic double-pendulum motion.' }
			},
			{
				name: 'tonal',
				date: '2026',
				category: 'TypeScript',
				url: repo('tonal'),
				technologies: [tech('TypeScript', 'https://www.typescriptlang.org/')],
				description: { overview: 'A TypeScript project exploring musical and tonal ideas.' }
			},
			{
				name: 'c',
				date: '2026',
				category: 'Svelte',
				url: repo('c'),
				technologies: [tech('Svelte', 'https://svelte.dev/')],
				description: { overview: 'A small Svelte experiment.' }
			},
			{
				name: 'IF-Browser',
				date: '2023',
				category: 'Browser',
				url: repo('IF-Browser'),
				technologies: [tech('Chromium', 'https://www.chromium.org/')],
				description: { overview: 'A Chromium-based browser fork and exploration.' }
			},
			{
				name: 'portfolio',
				date: '2025',
				category: 'Web application',
				url: 'https://kesavan-rangarajan.pages.dev',
				technologies: [
					tech('SvelteKit', 'https://kit.svelte.dev/'),
					tech('CockroachDB', 'https://www.cockroachlabs.com/')
				],
				description: { overview: 'This editable portfolio, backed by CockroachDB.' }
			}
		],
		engineeringProjects: [
			{
				name: 'FRC-2026',
				date: '2026',
				category: 'FRC robotics',
				url: 'https://github.com/CircuitRunners/FRC-2026',
				technologies: [tech('Java', 'https://www.java.com/')],
				description: { overview: 'Robot code for CircuitRunners FRC 1002 Entropy.' }
			},
			{
				name: 'FRC-2025',
				date: '2025',
				category: 'FRC robotics',
				url: 'https://github.com/CircuitRunners/FRC-2025',
				technologies: [tech('Java', 'https://www.java.com/')],
				description: { overview: 'Competition robot software for CircuitRunners FRC 1002.' }
			}
		]
	}
};
