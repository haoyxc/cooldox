import React, { useState } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  setBlockType,
  ContentState,
  SelectionState,
  Modifier
} from "draft-js";

function Draft() {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const removeStyles = [];

  const onBoldClick = () => {
    setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, "BOLD"));
  };

  const onItalicClick = () => {
    setEditorState(editorState => RichUtils.toggleInlineStyle(editorState, "ITALIC"));
  };
  // Beginning of paragraph alignment
  const onAlignmentClick = (style, removeStyles) => {
    const selection = editorState.getSelection();
    const currentContent = editorState.getCurrentContent();
    let focusBlock = currentContent.getBlockForKey(selection.getFocusKey());
    let anchorBlock = currentContent.getBlockForKey(selection.getAnchorKey());
    let selectionIsBackward = selection.getIsBackward();
    let changes = {
      anchorOffset: 0,
      focusOffset: focusBlock.getLength()
    };

    if (selectionIsBackward) {
      changes = {
        focusOffset: 0,
        anchorOffset: anchorBlock.getLength()
      };
    }
    let selectWholeBlocks = selection.merge(changes);
    let modifiedContent = Modifier.applyInlineStyle(
      currentContent,
      selectWholeBlocks,
      style
    );
    let finalContent = removeStyles.reduce(function(content, style) {
      return Modifier.removeInlineStyle(content, selectWholeBlocks, style);
    }, modifiedContent);

    setEditorState(EditorState.push(editorState, finalContent, "change-inline-style"));
  };

  function getBlockAlignment(block) {
    let style = "left";
    block.findStyleRanges(function(e) {
      if (e.hasStyle("center")) style = "center";
      if (e.hasStyle("right")) style = "right";
    });
    return style;
  }
  const getBlockStyle = block => {
    let alignment = getBlockAlignment(block);
    if (!block.getText()) {
      let previousBlock = editorState.getCurrentContent().getBlockBefore(block.getKey());
      if (previousBlock) {
        alignment = getBlockAlignment(previousBlock);
      }
    }
    return `align-${alignment}`;
  };
  //end of block alignment

  return (
    <div className="draft-container">
      <p>editor</p>
      <button onClick={() => onBoldClick()}>Bold it</button>
      <button onItalicClick={() => onItalicClick()}>Italic it</button>
      <button onClick={() => onAlignmentClick("left", ["right", "center"])}>
        <i class="fa fa-align-left" />
      </button>
      <button onClick={() => onAlignmentClick("center", ["right", "left"])}>
        <i class="fa fa-align-center" />
      </button>
      <button onClick={() => onAlignmentClick("right", ["left", "center"])}>
        <i class="fa fa-align-right" />
      </button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        blockStyleFn={getBlockStyle}
      />
    </div>
  );
}

export default Draft;
