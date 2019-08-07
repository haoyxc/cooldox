import React, { useState } from 'react';
import InlineButton from './InlineButton';
import COLORS from './Containers/Colors';
import DropdownColorButton from './DropdownColorButton';

function ColorControls(props) {
	const currentStyle = props.editorState.getCurrentInlineStyle();

	return (
		<div className="color-controls">
			<div className="RichEditor-controls">
				<div className="dropdown show">
					<button
						className="dropdown-btn dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-toggle="dropdown"
						aria-haspopup="true"
            aria-expanded="false"
            style = {{color: props.color}}
					>
						{props.color ? (props.color[0].toUpperCase() + props.color.slice(1)) : "Black"}
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						{COLORS.map((type) => (
							<DropdownColorButton
								className="color-option"
								key={type.label}
								active={currentStyle.has(type.style)}
								label={type.label}
								onToggle={props.onToggle}
                style={type.style}
                color={props.color}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
export default ColorControls;
