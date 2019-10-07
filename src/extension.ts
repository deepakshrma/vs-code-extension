import { commands, ExtensionContext } from 'vscode';
import { setUpAll } from './commands/setup_all';
import { Logger } from './core/util';
const logger = Logger.of('BATMAN');
enum COMMANDS {
	SET_UP_ALL = 'extension.set_up_all',
}
export function activate(context: ExtensionContext) {
	logger.log('BAT Mobile has been activated');
	context.subscriptions.push(
		commands.registerCommand(COMMANDS.SET_UP_ALL, () => {
			setUpAll({ extensionPath: context.extensionPath });
		}),
	);
}
export function deactivate() {
	// tslint:disable-next-line:no-console
	logger.error('BatMobile is deactivated');
}
