import React from 'react'
import Component from 'hyper/component'

export class Commands extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { activeColor, inactiveColor, foregroundColor, runOnClick } = this.props;
    return (
      this.props.commands.map(command => <Command command={command} font={this.props.font} activeColor={activeColor}
        inactiveColor={inactiveColor} foregroundColor={foregroundColor} runOnClick={runOnClick}/>)
    )
  }
}

export class Command extends Component {

  constructor(props) {
    super(props);

    this.state = {
      ran: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    window.rpc.emit('run command', {
      uid: window.ACTIVE_SESSION,
      cmd: this.props.command,
      exec: this.props.runOnClick
    });

    this.setState({ran: true});
  }

  render() {
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
          color: ${this.state.ran ? this.props.inactiveColor : this.props.activeColor};
          opacity: ${this.state.ran ? 0.5 : 1};
          font: ${this.props.font};
          margin-bottom: 10px;
          margin-left: 7px;
          margin-right: 5px;
          padding-left: 10px;
        }

        .comment {
          color: ${this.props.foregroundColor};
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