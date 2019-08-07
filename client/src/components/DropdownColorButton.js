import React, { useState } from 'react';
import { Editor, EditorState, Modifier, RichUtils } from 'draft-js';

class DropdownColorButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }
    render() {
      return (
        <span id = "RichEditor" className='dropdown-selection-color' onMouseDown={this.onToggle} style = {{background: this.props.label}}>
          
        </span>
      );
    }
  }

  export default DropdownColorButton;