export const snippets: any = {
	react: {
		ReactComponent: {
			prefix: 'x_rc',
			scope: 'javascript,typescript',
			body: [
				`import React from 'react';
const $\{TM_FILENAME_BASE} = () => (
<div>$\{TM_FILENAME_BASE}</div>
);
export default $\{TM_FILENAME_BASE}; `,
			],
			description: 'Create React Component',
		},
	},
};
