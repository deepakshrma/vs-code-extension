import { exec, execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';
import { promisify } from 'util';
import { copyR, isEmpty, lines, Logger, removeAll, runInSeries, stringify } from '../core/util';
const execWithPromise = promisify(exec);

const USER_HOME = resolve(process.env.HOME || '~/');
const SETTINGS_PATH = resolve(
	USER_HOME,
	'Library/Application Support/Code/User/settings.json',
);

const logger = Logger.of('BATMAN');
export async function setUpAll({ extensionPath }: { extensionPath: string }) {
	try {
		logger.log('Installing fonts...');
		copyR(`${extensionPath}/data/fonts/InputMono/*`, '~/Library/Fonts/');
		const settingsStr = readFileSync(SETTINGS_PATH).toString();
		const settingsJSON = JSON.parse(settingsStr || '{}');
		let fontFamily = settingsJSON['editor.fontFamily'];
		fontFamily = isEmpty(fontFamily)
			? "Menlo, Monaco, 'Courier New', monospace"
			: fontFamily.replace(`'Input Mono',`, '');
		settingsJSON['editor.fontFamily'] = `'Input Mono', ${fontFamily}`;
		writeFileSync(SETTINGS_PATH, stringify(settingsJSON));
		logger.log('Setup done...');
	} catch (error) {
		logger.error(
			'Something is wrong happen, please contact github.com/deepakshrma/\n' + error.message,
		);
	}
}
export async function installExt({ extensionPath }: { extensionPath: string }) {
	const extensionsList = lines(execSync(`cat ${extensionPath}/data/list_of_extensions.txt`)
		.toString());
	const curExtList = lines(execSync(`code --list-extensions`)
		.toString());
	const missingExtList = removeAll(extensionsList, curExtList);
	let counter = 0;
	runInSeries(missingExtList, (ext: string) => {
		counter += 1;
		return execWithPromise(`code --install-extension ${ext}`).then(x => {
			logger.log(x.stdout);
			if (counter === missingExtList.length) {
				logger.log('Installing extensions done!!');
			}
		});
	});
}
