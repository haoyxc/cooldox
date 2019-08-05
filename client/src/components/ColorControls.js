import React, { useState } from 'react';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';
import COLORS from './ColorContainer/Colors';

class StyleButton extends React.Component {
	constructor(props) {
		super(props);
		this.onToggle = (e) => {
			e.preventDefault();
			this.props.onToggle(this.props.style);
		};
	}
	render() {
		return (
			<span onMouseDown={this.onToggle}>
				<span>{this.props.label} </span>
			</span>
		);
	}
}

function ColorControls(props) {
	let currentStyle = props.editorState.getCurrentInlineStyle();
	return (
		<div>
			{COLORS.map((type) => (
				<StyleButton
					active={currentStyle.has(type.style)}
					label={type.label}
					onToggle={props.onToggle}
					style={type.style}
				/>
			))}
		</div>
	);
}

export default ColorControls;
