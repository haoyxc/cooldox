import React from 'react';

class DropdownButton extends React.Component {
    constructor() {
      super();
      this.onToggle = (e) => {
        e.preventDefault();
        this.props.onToggle(this.props.style);
      };
    }
    render() {
      return (
        <span id = "RichEditor" className='dropdown-selection' onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
  }

  export default DropdownButton;