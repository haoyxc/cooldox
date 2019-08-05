import React, { useState } from 'react';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';
import ColorControls from './ColorControls';
import colorStyleMap from './ColorContainer/colorStyleMap';
import fontSizes from './FontSizeContainer/fontSizes';
import FontSizeControls from './FontSizeControls';
import MutationControls from './MutationControls';

function Draft() {
	const [ editorState, setEditorState ] = React.useState(EditorState.createEmpty());

	const toggleInlineStyle = (inlineStyle) => {
		setEditorState(RichUtils.toggleInlineStyle(editorState, inlineStyle));
	}

	const toggleColor = (toggledColor) => {
		const selection = editorState.getSelection();

		// Let's just allow one color at a time. Turn off all active colors.
		const nextContentState = Object.keys(colorStyleMap).reduce((contentState, color) => {
			return Modifier.removeInlineStyle(contentState, selection, color);
		}, editorState.getCurrentContent());

		let nextEditorState = EditorState.push(editorState, nextContentState, 'change-inline-style');

		const currentStyle = editorState.getCurrentInlineStyle();

		// Unset style override for current color.
		if (selection.isCollapsed()) {
			nextEditorState = currentStyle.reduce((state, color) => {
				return RichUtils.toggleInlineStyle(state, color);
			}, nextEditorState);
		}

		// If the color is being toggled on, apply it.
		if (!currentStyle.has(toggledColor)) {
			nextEditorState = RichUtils.toggleInlineStyle(nextEditorState, toggledColor);
		}

		setEditorState(nextEditorState);
	};

	return (
		<div className="test">
			<p>Editor</p>
			<MutationControls 
				editorState={editorState}
				onToggle={toggleInlineStyle}
			/>
			<ColorControls editorState={editorState} onToggle={toggleColor} />
			<FontSizeControls 
				editorState={editorState}
				onToggle={toggleInlineStyle}
			/>
			<Editor customStyleMap={colorStyleMap} editorState={editorState} onChange={setEditorState} spellCheck={true} />
		</div>
	);
}

export default Draft;
