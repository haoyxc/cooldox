
import React, { useState, useEffect } from "react";
import { Editor, EditorState, Modifier, RichUtils, getDefaultKeyBinding } from "draft-js";
import { Redirect } from "react-router-dom";
import ColorControls from "./ColorControls";
import colorStyleMap from "./ColorContainer/colorStyleMap";
import FontSizeControls from "./FontSizeControls";
import MutationControls from "./MutationControls";
import ListControls from "./ListControls";
import Navbar from "./Navbar";


import React from 'react';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';
import ColorControls from './ColorControls';
import colorStyleMap from './ColorContainer/colorStyleMap';
import FontSizeControls from './FontSizeControls';
import MutationControls from './MutationControls';
import ListControls from './ListControls';
import axios from "axios";


function Draft({ docId }) {
  const [editorState, setEditorState] = React.useState(EditorState.createEmpty());
  const [color, setColor] = React.useState("");
  const [fontSize, setFontSize] = React.useState("");

  const onSave = async function() {
    try {
      const response = await axios.post(
        `http://localhost:4000/editor/${docId}/save`,
        {
          content: editorState,
          modifiedAt: new Date()
        },
        {
          withCredentials: true
        }
	  );
	  let contentData = response.data
	  console.log(contentData)
    } catch (e) {
      console.log(e);
    }
  };

  const toggleInlineStyle = inlineStyle => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
  };
  const toggleBlockStyle = blockStyle => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockStyle));
  };
  const toggleColor = color => {
    setColor(color);
    console.log(editorState);
    console.log(RichUtils);
    setEditorState(RichUtils.toggleInlineStyle(editorState, color));
  };
  const toggleFontSize = fontSize => {
    setFontSize(fontSize);
    setEditorState(RichUtils.toggleInlineStyle(editorState, fontSize));
  };
  const handleKeyShortcut = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
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
    let modifiedContent = Modifier.applyInlineStyle(currentContent, selectWholeBlocks, style);
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
    <div className="RichEditor-root">
      <MutationControls editorState={editorState} onToggle={toggleInlineStyle} />
      <span style={{ borderLeft: "1px solid grey", marginRight: "3px" }} />
      <ColorControls editorState={editorState} onToggle={toggleColor} color={color} />
      <span style={{ borderLeft: "1px solid grey", marginRight: "3px" }} />
      <FontSizeControls editorState={editorState} onToggle={toggleFontSize} fontSize={fontSize} />
      <span style={{ borderLeft: "1px solid grey", marginRight: "3px" }} />
      <div className="paragraph-controls">
        <button className="align-btn" onClick={() => onAlignmentClick("left", ["right", "center"])}>
          <i className="fa fa-align-left" />
        </button>
        <button className="align-btn" onClick={() => onAlignmentClick("center", ["right", "left"])}>
          <i className="fa fa-align-center" />
        </button>
        <button className="align-btn" onClick={() => onAlignmentClick("right", ["left", "center"])}>
          <i className="fa fa-align-right" />
        </button>
      </div>
      <span style={{ borderLeft: "1px solid grey", marginRight: "3px" }} />
      <ListControls editorState={editorState} onToggle={toggleBlockStyle} />
      <div className="RichEditor-editor">
        <Editor
          id="richEditor"
          customStyleMap={colorStyleMap}
          spellCheck={true}
          editorState={editorState}
          handleKeyCommand={handleKeyShortcut}
          onChange={setEditorState}
          blockStyleFn={getBlockStyle}
          ref={Editor => Editor && Editor.focus()}
        />
      </div>
    </div>
  );
}

export default Draft;
