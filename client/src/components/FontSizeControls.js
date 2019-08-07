import React from 'react';
import fontSizes from './Containers/fontSizes';
import DropdownButton from './DropdownButton';

function FontSizeControls(props) {
	const currentStyle = props.editorState.getCurrentInlineStyle();

	return (
		<div className="RichEditor-controls">
			<div className="dropdown show">
				<button
					className="dropdown-btn dropdown-toggle"
					type="button"
					id="dropdownMenuButton"
					data-toggle="dropdown"
					aria-haspopup="true"
					aria-expanded="false"
				>
					{props.fontSize.slice(10) || "14"}
				</button>
				<div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
					{fontSizes.map((type) => (
						<DropdownButton
							className="fontsize-option dropdown-item"
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
	);
}

export default FontSizeControls;
