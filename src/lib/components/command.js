import React from 'react'
import Component from 'hyper/component'

import { terminal } from '../../index';

export class Commands extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      this.props.commands.map(command => <Command command={command} font={this.props.font} color={this.props.color}/>)
    )
  }
}

export class Command extends Component {

  constructor(props) {
    super(props);

    this.state = {
      run: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    terminal(this.props.command);
    this.setState({run: true});
  }

  render() {
    console.log(`hey! ${this.props.color}`);
    let className = 'command';
    let command = this.props.command;
    let handler = this.handleClick;

    if (command.charAt(0) === '#') {
      className = 'comment';
      command = command.substring(command.indexOf(' ')).toUpperCase();
      handler = () => {};
    }

    return (
      <div className={className} onClick={handler}>
        {command}
        <style jsx>{`
        .command {
          color: ${this.props.color};
          font: ${this.props.font};
          opacity: 0.5;
          margin-bottom: 10px;
          margin-left: 7px;
          margin-right: 5px;
          padding-left: 10px;
        }

        .comment {
          color: ${this.props.color};
          font: ${this.props.font};
          margin-bottom: 10px;
          margin-left: 5px;
          margin-right: 5px;
        }
        `}</style>
      </div>
    )
  }

}