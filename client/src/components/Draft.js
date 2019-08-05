import React, { useState } from "react";
import { Editor, EditorState } from "draft-js";

function Draft() {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());

  return (
    <div className="test">
      <p>editor</p>
      <Editor editorState={editorState} onChange={setEditorState} />
    </div>
  );
}

export default Draft;
