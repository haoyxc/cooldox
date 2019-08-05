import React, { useState } from 'react';
import InlineButton from './InlineButton';
import COLORS from './Containers/Colors';

function ColorControls(props) {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
    <div>
        {COLORS.map((type) =>
              <InlineButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
              />)}
    </div>
    );
}
export default ColorControls;
