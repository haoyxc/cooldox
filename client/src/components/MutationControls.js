import React, { useState } from 'react';
import InlineButton from './InlineButton';
import MutationStyles from './Containers/MutationStyles'

function FontSizeControls(props) {
    const currentStyle = props.editorState.getCurrentInlineStyle();

    return (
    <div>
        {MutationStyles.map((type) =>
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

export default FontSizeControls;