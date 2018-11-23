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

export function mapHyperState({ ui: { colors, fontFamily, fontSize, fontWeightBold, backgroundColor, foregroundColor, hyperscripts } }, map) {
  const { runOnClick = false } = hyperscripts;
  let activeColor = foregroundColor;
  let inactiveColor = foregroundColor;

  if (hyperscripts.activeColor) {
    activeColor = colors[hyperscripts.activeColor];
  }

  if (hyperscripts.inactiveColor) {
    inactiveColor = colors[hyperscripts.inactiveColor];
  }
  
  return Object.assign({}, map, {
    backgroundColor,
    foregroundColor,
    fontFamily,
    fontSize,
    fontWeightBold,
    hyperscripts,
    activeColor,
    inactiveColor,
    runOnClick
  });
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
        opacity: 0.05
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
      this.setState({ opacity: 0.05 });
    }

    render() {
      const { scripts, selected } = this.state;

      const {
        fontSize,
        fontWeightBold,
        fontFamily,
        foregroundColor,
        activeColor,
        inactiveColor,
        runOnClick
      } = this.props;

      const font = `${fontWeightBold} ${fontSize}px ${fontFamily.split(',')[0]}`;

      const customChildren = (
        <div>
          {this.props.customChildren}
          <div className="commands" onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}>
            <div>
              <select onChange={this.handleChange}>
                {scripts.map((script, i) => <option value={i}>{script.title.toUpperCase()}</option>)}
              </select>
              <Commands commands={scripts[selected].commands} font={font} foregroundColor={foregroundColor} 
                activeColor={activeColor} inactiveColor={inactiveColor} runOnClick={runOnClick}/>
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
