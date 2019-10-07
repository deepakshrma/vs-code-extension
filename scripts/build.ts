import {writeFileSync} from 'fs';
import {resolve} from 'path';
import { snippets } from './snippets';
const snippetPath = resolve(__dirname, '..', 'snippets');
Object.keys(snippets).forEach(name => {
	const snippet: any = snippets[name];
	writeFileSync(`${snippetPath}/xdeepakv-${name}.code-snippets`, JSON.stringify(snippet, null, 4));
});
