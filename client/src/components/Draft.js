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
      <button onClick={this._onBoldClick.bind(this)}>Bold</button>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

export default Draft;
