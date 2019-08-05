import React, { useState } from "react";
import { Editor, EditorState, Modifier, RichUtils } from "draft-js";
import { Redirect } from "react-router-dom";
import {
  Editor,
  EditorState,
  RichUtils,
  setBlockType,
  ContentState,
  SelectionState,
  Modifier
} from "draft-js";

import ColorControls from "./ColorControls";
import colorStyleMap from "./ColorContainer/colorStyleMap";
import FontSizeControls from "./FontSizeControls";
import MutationControls from "./MutationControls";
import Navbar from "./Navbar";

function Draft() {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const toggleInlineStyle = inlineStyle => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
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
      <Navbar />
      <MutationControls editorState={editorState} onToggle={toggleInlineStyle} />
      <ColorControls editorState={editorState} onToggle={toggleInlineStyle} />
      <FontSizeControls editorState={editorState} onToggle={toggleInlineStyle} />
      <div className="paragraph-controls">
        <button onClick={() => onAlignmentClick("left", ["right", "center"])}>
          <i class="fa fa-align-left" />
        </button>
        <button onClick={() => onAlignmentClick("center", ["right", "left"])}>
          <i class="fa fa-align-center" />
        </button>
        <button onClick={() => onAlignmentClick("right", ["left", "center"])}>
          <i class="fa fa-align-right" />
        </button>
      </div>

      <Editor
        customStyleMap={colorStyleMap}
        spellCheck={true}
        editorState={editorState}
        onChange={setEditorState}
        blockStyleFn={getBlockStyle}
      />
    </div>
  );
}

export default Draft;
