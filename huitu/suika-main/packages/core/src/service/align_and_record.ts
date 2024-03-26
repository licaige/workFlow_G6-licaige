import { AlignCmd, type AlignType } from '../commands/align';
import { type Editor } from '../editor';

export const alignAndRecord = (editor: Editor, type: AlignType) => {
  if (editor.selectedElements.size() < 2) {
    console.warn('can align zero or two elements, fail silently');
    return;
  }
  editor.commandManager.pushCommand(
    new AlignCmd('Align ' + type, editor.selectedElements.getItems(), type),
  );
  editor.render();
};
