import { execSync } from 'child_process';
import { window } from 'vscode';

export class Logger {
	public static of(context: string): Logger {
		if (this.instance$ === undefined) {
			this.instance$ = new Logger(context);
		}
		return this.instance$;
	}
	private static instance$: Logger;
	private context$$: string;
	private constructor(context: string) {
		this.context$$ = context;
	}
	public log(message: string) {
		window.showInformationMessage(`${this.context$$}: ${message}`);
	}
	public error(message: string) {
		window.showErrorMessage(`${this.context$$}: ${message}`);
	}
	public warn(message: string) {
		window.showWarningMessage(`${this.context$$}: ${message}`);
	}
}
export const copyR = (src: string, dest: string) => execSync(`cp -r ${src} ${dest}`);
export const isEmpty = (data: any): boolean => {
	if (!data) {
		return true;
	}
	if (typeof data === 'string') {
		return data.replace(/\s+/g, '') === '';
	}
	if (Array.isArray(data)) {
		return data.length === 0;
	}
	return JSON.stringify(data) === '{}';
};
export const stringify = (obj: any, tabs: number = 4) => JSON.stringify(obj, null, tabs);
