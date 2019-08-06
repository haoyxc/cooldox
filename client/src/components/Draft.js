import React, { useState } from 'react';
import { Editor, EditorState, Modifier, RichUtils, getDefaultKeyBinding } from 'draft-js';
import { Redirect } from 'react-router-dom';
import ColorControls from './ColorControls';
import colorStyleMap from './ColorContainer/colorStyleMap';
import FontSizeControls from './FontSizeControls';
import MutationControls from './MutationControls';
import ListControls from './ListControls';
import Navbar from './Navbar';

function Draft() {
	const [ editorState, setEditorState ] = React.useState(EditorState.createEmpty());
	const toggleInlineStyle = (inlineStyle) => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	};
	const toggleBlockStyle = (blockStyle) => {
		setEditorState(RichUtils.toggleBlockType(editorState, blockStyle));
  };
  const handleKeyShortcut = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return true;
    }
    return false;
  }

  const mapKeyToEditorCommand = e => {
    if (e.keyCode === 9) {
      const newEditorState = RichUtils.onTab(
        e,
        editorState,
        4,
      );
      if (newEditorState !== editorState) {
        setEditorState(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  }

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

		setEditorState(EditorState.push(editorState, finalContent, 'change-inline-style'));
	};

	function getBlockAlignment(block) {
		let style = 'left';
		block.findStyleRanges(function(e) {
			if (e.hasStyle('center')) style = 'center';
			if (e.hasStyle('right')) style = 'right';
		});
		return style;
	}
	const getBlockStyle = (block) => {
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
			<ColorControls editorState={editorState} onToggle={toggleInlineStyle} />
			<FontSizeControls editorState={editorState} onToggle={toggleInlineStyle}/>
      <div className="paragraph-controls">
				<button onClick={() => onAlignmentClick('left', [ 'right', 'center' ])}>
					<i className="fa fa-align-left" />
				</button>
				<button onClick={() => onAlignmentClick('center', [ 'right', 'left' ])}>
					<i className="fa fa-align-center" />
				</button>
				<button onClick={() => onAlignmentClick('right', [ 'left', 'center' ])}>
					<i className="fa fa-align-right" />
				</button>
			</div>
			<ListControls editorState={editorState} onToggle={toggleBlockStyle} />
			<div className="RichEditor-editor">
				<Editor
          id = "richEditor"
					customStyleMap={colorStyleMap}
					spellCheck={true}
          editorState={editorState}
          handlekeyCommand={handleKeyShortcut}
          keyBindingFn={mapKeyToEditorCommand}
					onChange={setEditorState}
          blockStyleFn={getBlockStyle}
          ref={Editor => Editor && Editor.focus()}
				/>
			</div>
		</div>
	);
}

export default Draft;
