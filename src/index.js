import React, { Component } from 'react'

import { Commands } from './lib/components/command';

export function reduceUI(state, { type, config }) {
  switch (type) {
    case 'CONFIG_LOAD':
    case 'CONFIG_RELOAD': {
      return state.set('hyperscripts', config.hyperscripts)
    }
    default:
      break
  }

  return state;
}

export function mapHyperState({ ui: { fontFamily, fontSize, fontWeightBold, backgroundColor, foregroundColor, hyperscripts } }, map) {
  return Object.assign({}, map, {
    backgroundColor,
    foregroundColor,
    fontFamily,
    fontSize,
    fontWeightBold,
    hyperscripts
  })
}

export function decorateHyper(Hyper) {
  return class extends Component {
    static displayName() {
      return 'Hyper'
    }

    constructor(props) {
      super(props);

      const { scripts } = this.props.hyperscripts;
      console.log(scripts)
  
      this.state = {
        scripts,
        selected: 0,
        opacity: 0.1
      };

      this.handleChange = this.handleChange.bind(this);
      this.mouseEnter = this.mouseEnter.bind(this);
      this.mouseLeave = this.mouseLeave.bind(this);
    }

    handleChange (event) {
      this.setState({
        selected: event.target.value
      })
    }

    mouseEnter (event) {
      this.setState({ opacity: 1 });
    }
    mouseLeave (event) {
      this.setState({ opacity: 0.1 });
    }

    render() {
      const { scripts, selected } = this.state;

      const font = `${this.props.fontWeightBold} ${this.props.fontSize}px ${this.props.fontFamily.split(',')[0]}`;

      const customChildren = (
        <div>
          {this.props.customChildren}
          <div className="commands" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
            <div>
              <select onChange={this.handleChange}>
                {scripts.map((script, i) => <option value={i}>{script.title.toUpperCase()}</option>)}
              </select>
              <Commands commands={scripts[selected].commands} font={font} color={this.props.foregroundColor}/>
            </div>
            <style jsx>{`
              .commands {
                display: flex;
                background: ${this.props.backgroundColor};
                resize: horizontal;
                position: fixed;
                top: 0px;
                bottom: 26px;
                right: 0px;
                margin-top: 40px;
                padding-bottom: 30px;
                width: 30%;
                min-width: 200px;
                max-width: 400px;
                overflow: scroll;
                opacity: ${this.state.opacity}
              }

              select {
                color: white;
                border: 0px;
                font: ${font};
                background-color: rgba(0, 0, 0, 0.01);
                width: 100%;
                margin-bottom: 10px;
              }
            `}</style>
          </div>
        </div>
      )

      return <Hyper {...this.props} customChildren={customChildren} />
    }
  }
}

export function terminal(cmd) {
  window.rpc.emit('run command', {
    uid: window.ACTIVE_SESSION,
    cmd,
  });
}
