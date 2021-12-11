import { strict as assert } from 'assert';
import * as path from 'path';

import * as vscode from 'vscode';

suite('Open a missing file', () => {
	const missing = path.resolve(__dirname, '../../../MISSING.md');
	const untitled = vscode.Uri.file(missing).with({ scheme: 'untitled' });

	setup(async () => {
		await vscode.commands.executeCommand('workbench.action.closeAllEditors');
	});

	test('with functions', async () => {
		const document = await vscode.workspace.openTextDocument(untitled);
		const editor = await vscode.window.showTextDocument(document);
		assert.equal(editor.document.fileName, missing);
		assert.equal(vscode.window.activeTextEditor?.document.fileName, missing);
	});

	test('with commands', async () => {
		await vscode.commands.executeCommand('vscode.open', untitled, undefined, path.basename(missing));
		assert.equal(vscode.window.activeTextEditor?.document.fileName, missing);
	});

	test('with commands and edits', async () => {
		await vscode.commands.executeCommand('vscode.open', untitled, undefined, path.basename(missing));
		const editor = vscode.window.activeTextEditor!;
		await editor.edit(it => it.insert(new vscode.Position(0, 0), 'PRESENT'));
		assert.equal(editor.document.fileName, missing);
		// trying to save this file proposes the name 'PRESENT.md'
		// but i can't figure out how to determine that programmatically...
	});
});
