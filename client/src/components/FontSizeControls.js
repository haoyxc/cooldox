import React, { useState } from 'react';
import InlineButton from './InlineButton';
import fontSizes from './Containers/fontSizes';

function FontSizeControls(props) {
	const currentStyle = props.editorState.getCurrentInlineStyle();

	return (
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
					Fonts
				</button>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					{fontSizes.map((type) => (
            <>
						<InlineButton
							className="fontsize-option dropdown-item"
							key={type.label}
							active={currentStyle.has(type.style)}
							label={type.label}
							onToggle={props.onToggle}
							style={type.style}
						/>
            <div class="dropdown-divider"></div>
            </>
          ))}
				</div>
			</div>
		</div>
	);
}

export default FontSizeControls;
