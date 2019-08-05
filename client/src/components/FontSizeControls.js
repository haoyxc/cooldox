import React, { useState } from 'react';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';
import FontSizeButton from './FontSizeButton';
import fontSizes from './FontSizeContainer/fontSizes'

function FontSizeControls(props) {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
    <div>
        {fontSizes.map((type) =>
              <FontSizeButton
                key={type.label}
                active={currentStyle.has(type.style)}
                label={type.label}
                onToggle={props.onToggle}
                style={type.style}
              />)}
    </div>
    );
}

export default FontSizeControls;