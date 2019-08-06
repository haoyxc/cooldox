import React, { useState } from 'react';
import InlineButton from './InlineButton';
import Lists from './Containers/Lists'

function ListControls(props) {
    const {editorState} = props;
    const selection = editorState.getSelection();
    const blockType = editorState
      .getCurrentContent()
      .getBlockForKey(selection.getStartKey())
      .getType();
    return (
      <div className = "RichEditor-controls">
        {Lists.map((type) =>
          <InlineButton
            key={type.label}
            active={type.style === blockType}
            label={type.label}
            onToggle={props.onToggle}
            style={type.style}
          />
        )}
      </div>
    );
}

export default ListControls;