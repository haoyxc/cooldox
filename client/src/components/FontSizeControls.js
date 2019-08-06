import React, { useState } from "react";
import InlineButton from "./InlineButton";
import fontSizes from "./Containers/fontSizes";

function FontSizeControls(props) {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {fontSizes.map(type => (
        <InlineButton
          className="fontsize-option"
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
}

export default FontSizeControls;
