import React from 'react';
import './DrumMachineApp.css';

class DrumMachineApp extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {msg: 'Play!'};

    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }
  
  componentDidMount()
  {
    document.addEventListener('keydown', this.handleKey);
  }

  componentWillUnmount()
  {
    document.removeEventListener('keydown', this.handleKey);
  }

  handleKey(event)
  {
    const keyPressed = event.key.toUpperCase();
    const keys = ['Q',
                  'W',
                  'E',
                  'A',
                  'S',
                  'D',
                  'Z',
                  'X',
                  'C'
                 ];

    if (keys.includes(keyPressed))
    {
      this.setState({msg: 'clip-' + keyPressed});
      document.getElementById(keyPressed).play();
    }
    else
    {
      this.setState({msg: 'wrong key'});
    }      
  }

  handleClick(event)
  {
    this.setState({msg: event.currentTarget.id});
    event.currentTarget.children[1].play();
  }

  render()
  {
    return (
        <div className="drumMachineApp" id="drumMachineAppContainer">
        <DrumMachineDrums msg={this.state.msg} click={this.handleClick} key={this.handleKey} />
        </div>
    );
  }
}

class DrumMachineDrums extends React.Component
{
  constructor(props)
  {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }
  
  handleClick(event)
  {
    this.props.click(event);
  }

  handleKey(event)
  {
    this.props.key(event);
  }

  render()
  {
    return (
        <div id="drumMachineDrumsContainer">
        <div id="drum-machine" onKeyDown={this.props.play}>
        <DrumPadDisplay msg={this.props.msg} />
        <DrumPad letter="Q" file="q.ogg" click={this.props.click} />
        <DrumPad letter="W" file="w.ogg" click={this.props.click} />
        <DrumPad letter="E" file="e.ogg" click={this.props.click} />
        <DrumPad letter="A" file="a.ogg" click={this.props.click} />
        <DrumPad letter="S" file="s.ogg" click={this.props.click} />
        <DrumPad letter="D" file="d.ogg" click={this.props.click} />
        <DrumPad letter="Z" file="z.ogg" click={this.props.click} />
        <DrumPad letter="X" file="x.ogg" click={this.props.click} />
        <DrumPad letter="C" file="c.ogg" click={this.props.click} />
        </div>
        </div>
    );
  }
}

class DrumPadDisplay extends React.Component
{
  render()
  {
    return (
        <div id="display">
        <p>{this.props.msg}</p>
        </div>
    );
  }
}

class DrumPad extends React.Component
{
  constructor(props)
  {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleKey = this.handleKey.bind(this);
  }
  
  handleClick(event)
  {
    this.props.click(event);
  }

  handleKey(event)
  {
    this.props.key(event);
  }

  render()
  {
    return (
        <div className="drum-pad" id={'clip-' + this.props.letter} onClick={this.props.click}>
        <p>{this.props.letter}</p>
        <audio className="clip" preload="auto" id={this.props.letter} src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3">
        </audio>
        </div>
    );
  }
}

export default DrumMachineApp;
