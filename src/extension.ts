// tslint:disable-next-line:no-implicit-dependencies
import { commands, ExtensionContext, ViewColumn, window } from 'vscode';
import { installExt, setUpAll } from './commands/setup_all';
import { Logger } from './core/util';
const logger = Logger.of('BATMAN');
enum COMMANDS {
	SET_UP_ALL = 'extension.set_up_all',
	INSTALL_EXTS = 'extension.install_extension',
	BATMAN_DANCING = 'extension.dancing_batman',
}
export function activate(context: ExtensionContext) {
	logger.log('BAT Mobile has been activated');
	context.subscriptions.push(
		commands.registerCommand(COMMANDS.SET_UP_ALL, () => {
			setUpAll({ extensionPath: context.extensionPath });
		}),
	);
	context.subscriptions.push(
		commands.registerCommand(COMMANDS.INSTALL_EXTS, () => {
			installExt({ extensionPath: context.extensionPath });
		}),
	);
	context.subscriptions.push(registerYoutube(context));
}
const registerYoutube = (context: ExtensionContext) => {
	return commands.registerCommand(COMMANDS.BATMAN_DANCING, () => {
		const panel = window.createWebviewPanel('catCoding', 'Cat Coding', ViewColumn.One, {
			enableScripts: true,
			retainContextWhenHidden: true,
		});
		panel.webview.html = getWebviewContent();
	});
};
function getWebviewContent() {
	return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
</head>
<body>
    <img src="https://media.giphy.com/media/O3IHMKIYwLT8I/source.gif" width="300" />
    <h1 id="number-of-steps">0</h1>

    <script>
        const counter = document.getElementById('number-of-steps');
        let count = 0;
        setInterval(() => {
            counter.textContent = "Steps: "+ (count++);
        }, 500);
    </script>
</body>
</html>`;
}
export function deactivate() {
	// tslint:disable-next-line:no-console
	logger.error('BatMobile is deactivated');
}
