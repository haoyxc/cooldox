import React, { useState } from "react";
import { Editor, EditorState, RichUtils } from "draft-js";

function Draft() {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const _onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };
  return (
    <div className="draft-container">
      <p>editor</p>
      <button onClick={() => onBoldClick()}>Bold it</button>
      <button onItalicClick={() => onItalicClick()}>Italic it</button>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

export default Draft;
