import React, { useState } from 'react';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';
import ColorControls from './ColorControls';
import colorStyleMap from './ColorContainer/colorStyleMap';
import FontSizeControls from './FontSizeControls';
import MutationControls from './MutationControls';

function Draft() {
	const [ editorState, setEditorState ] = React.useState(EditorState.createEmpty());

	const toggleInlineStyle = (inlineStyle) => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	}

	return (
		<div className="test">
			<p>Editor</p>
			<MutationControls 
				editorState={editorState}
				onToggle={toggleInlineStyle}
			/>
			<ColorControls editorState={editorState} onToggle={toggleInlineStyle} />
			<FontSizeControls 
				editorState={editorState}
				onToggle={toggleInlineStyle}
			/>
			<Editor customStyleMap={colorStyleMap} editorState={editorState} onChange={setEditorState} spellCheck={true} />
		</div>
	);
}

export default Draft;
