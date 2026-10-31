export type Data = {
	homePage?: {
		headline?: {
			imgURL?: string;
			content?: string;
			name?: string;
			location?: string;
			tagline?: string[];
		};
		info?: {
			techStack: Technology[];
		};
		projects?: ProjectPreview[];
	};
	aboutPage?: {
		eyebrow?: string;
		title?: string;
		intro?: string;
		paragraphs?: string[];
		stats?: { value: string; label: string }[];
		focusAreas?: string[];
	};
	projectsPage?: {
		engineeringProjects?: Project[];
		programmingProjects?: Project[];
	};
};
export type Image = {
	imgURL?: string;
	alt?: string;
	onclick?: () => void;
	caption?: string;
	class?: string;
	css?: string;
};

export type SubHeading = {
	images?: Image[];
	title?: string;
	content?: string;
	html?: boolean;
	subheadings?: SubHeading[];
	showSubHeadings?: boolean;
	border?: boolean;
};
export type Description = {
	overview?: string;
	subheadings?: SubHeading[];
};
export type Project = {
	name?: string;
	date?: string;
	category?: string;
	technologies?: Technology[];
	description?: Description;
	image?: string;
	url?: string;
	completed?: boolean;
};
export type ProjectPreview = {
	name?: string;
	date?: string;
	category?: string;
	technologies?: Technology[];
	completed?: boolean;
};
export type Technology = {
	name: string;
	url: string;
	logo?: string;
};

export const getData = async (): Promise<Data> => {
	const response = await fetch('/api/data');
	if (!response.ok) throw new Error('Unable to load portfolio data');
	return response.json();
};

export const setData = async (newData: Data) => {
	const response = await fetch('/api/data', {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newData)
	});
	if (!response.ok) throw new Error('Unable to save portfolio data');
};
