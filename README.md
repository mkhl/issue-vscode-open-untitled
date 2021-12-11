# Issue: Saving an untitled document created with the vscode.open command forgets its intended file name

Creating an untitled document
(from a file URI amended with the `untitled` scheme)
results in different states depending on whether the document is created
with the `vscode.open` command or the `openTextDocument` function.

I tried to reduce the problem to a failing test case and failed,
but maybe these tests can still be useful for debugging.

## Reproduction

- Create an untitled URI for a new file (`vscode.Uri.file(path).with({scheme:'untitled'})`)
- Open an editor for that URI with `openTextDocument`/`showTextDocument`
- Type some text
- Save the file
- Notice that the save dialog starts with the `path` we had provided

- Create a new untitled URI for a new file
- Open an editor for that URI with `vscode.commands.executeCommand('vscode.open', uri)`
- Type some text
- Save the file

## Expected behavior

The save dialog starts with the `path` we had provided,
just like with the other method.

## Actual behavior

The save dialog starts with the text we typed instead of the `path` we had provided.
