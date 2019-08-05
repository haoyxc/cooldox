import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

function Draft() {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'BOLD'));
  }

  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, 'ITALIC'));
  }

  return (
    <div className="test">
      <p>editor</p>
      <button onClick = {() => onBoldClick()}>Bold it</button>
      <button onItalicClick = {() => onItalicClick()}>Italic it</button>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

export default Draft;
