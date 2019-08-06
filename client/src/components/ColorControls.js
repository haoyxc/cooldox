import React, { useState } from 'react';
import InlineButton from './InlineButton';
import COLORS from './Containers/Colors';

function ColorControls(props) {
	const currentStyle = props.editorState.getCurrentInlineStyle();

	return (
		<div className="color-controls">
			<div className="RichEditor-controls">
				<div className="dropdown show">
					<button
						className="btn btn-secondary dropdown-toggle"
						type="button"
						id="dropdownMenuButton"
						data-toggle="dropdown"
						aria-haspopup="true"
						aria-expanded="false"
					>
						Colors
					</button>
					<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
						{COLORS.map((type) => (
							<InlineButton
								className="color-option"
								key={type.label}
								active={currentStyle.has(type.style)}
								label={type.label}
								onToggle={props.onToggle}
								style={type.style}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
export default ColorControls;
