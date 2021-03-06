import React from 'react';

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
      if (this.props.active) {
        className += ' RichEditor-activeButton';
      }
      return (
        <span id = "RichEditor" className={className} onMouseDown={this.onToggle}>
          {this.props.label}
        </span>
      );
    }
  }

  export default InlineButton;