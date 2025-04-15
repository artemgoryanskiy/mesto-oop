export const API_URL = `${process.env.API_ORIGIN}`;

export const settings = {
	headers: {
		'Content-Type': 'application/json',
		'authorization': `${process.env.API_TOKEN}`,
	}

};
