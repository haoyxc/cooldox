import React, { useState } from 'react';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';

class InlineButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }
    render() {
      let className = 'RichEditor-styleButton';
      return (
        <span id = "RichEditor" className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
  }

  export default InlineButton;