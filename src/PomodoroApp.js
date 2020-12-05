import React from 'react';
import './PomodoroApp.css';

class PomodoroApp extends React.Component
{
  constructor(props)
  {
    super(props);

    this.state = {
      // Storing minutes, per spec.
      breakLength: 5,
      // Storing minutes, per spec.
      sessionLength: 25,
      // Storing seconds, to convert for spec.
      timeRemaining: 1500,
      // Timer stopped or not.
      stop: true,
      // Session or not (break).
      session: true
    };

    this.handleClick = this.handleClick.bind(this);
  };
  
  componentDidMount()
  {
    // this.timer = setInterval(() =>
    //                          {
    //                            this.tick();
    //                          }, 1000);
  };

  componentWillUnmount()
  {
    // clearInterval(this.timer);
  };

  secondsToMMSS(s)
  {
    // const date = new Date(2020, 0, 2, 11, 0, s);
    const min = Math.floor(s / 60);
    const sec = s % 60;

    // return date.getMinutes().toString().padStart(2, 0) + ':' + date.getSeconds().toString().padStart(2, 0)
    return min.toString().padStart(2, 0) + ':' + sec.toString().padStart(2, 0)
  }

  tick()
  {
    if (this.state.timeRemaining >= 1)
    {
      this.setState((state) =>
                    {
                      return {
                        timeRemaining: state.timeRemaining - 1
                      };
                    });
    }
    else if (this.state.timeRemaining === 0)
    {
      if (this.state.session)
      {
        this.setState((state) =>
                      {
                        return {
                          timeRemaining: state.breakLength * 60,
                          session: false
                        };
                      });
      }
      else
      {
        this.setState((state) =>
                      {
                        return {
                          timeRemaining: state.sessionLength * 60,
                          session: true
                        };
                      });
      }
      document.getElementById('beep').play();
    }
  }

  handleClick(event)
  {
    switch (event.currentTarget.id)
    {
      // Break controls.
      case 'break-decrement':
      if (this.state.breakLength >= 2)
      {
        this.setState((state) =>
                      {
                        return {
                          breakLength: state.breakLength - 1
                        };
                      });
      }
      break;

      case 'break-increment':
      if (this.state.breakLength <= 59)
      {
        this.setState((state) =>
                      {
                        return {
                          breakLength: state.breakLength + 1
                        };
                      });
      }
      break;

      // Session controls.
      case 'session-decrement':
      if (this.state.sessionLength >= 2)
      {
        if (this.state.stop
            && this.state.session
            && this.state.timeRemaining === (this.state.sessionLength * 60))
        {
          console.log('stopped in session equal');
          this.setState((state) =>
                        {
                          return {
                            sessionLength: state.sessionLength - 1,
                            timeRemaining: (state.sessionLength - 1) * 60
                          };
                        });
        }
        else
        {
          console.log('everything else');
          console.log(this.state.stop);
          console.log(this.state.session);
          console.log(this.state.timeRemaining);
          console.log(this.state.sessionLength * 60);
          this.setState((state) =>
                        {
                          return {
                            sessionLength: state.sessionLength - 1
                          };
                        });
        }
      }
      break;

      case 'session-increment':
      if (this.state.sessionLength <= 59)
      {
        if (this.state.stop
            && this.state.session
            && this.state.timeRemaining === (this.state.sessionLength * 60))
        {
          this.setState((state) =>
                        {
                          return {
                            sessionLength: state.sessionLength + 1,
                            timeRemaining: (state.sessionLength + 1) * 60
                          };
                        });
        }
        else
        {
          this.setState((state) =>
                        {
                          return {
                            sessionLength: state.sessionLength + 1
                          };
                        });
        }
      }
      break;

      case 'start_stop':
      if (this.state.stop)
      {
        // Stopped; start again.
        this.setState((state) =>
                      {
                        return {
                          stop: false
                        };
                      });
        this.timer = setInterval(() =>
                                 {
                                   this.tick();
                                 }, 1000);
      }
      else
      {
        // Started; stop again.
        clearInterval(this.timer);
        this.setState((state) =>
                      {
                        return {
                          stop: true
                        };
                      });
      }
      break;

      case 'reset':
      document.getElementById('beep').pause();
      document.getElementById('beep').load();
      clearInterval(this.timer);
      this.setState((state) =>
                    {
                      return {
                        breakLength: 5,
                        sessionLength: 25,
                        timeRemaining: 1500,
                        stop: true,
                        session: true
                      };
                    });
      break;

      default:
      break;
    }
  };

  render()
  {
    return (
        <div className="pomodoroApp" id="pomodoroAppContainer">
        <div className="pomodoroApp" id="pomodoroAppControls">
        <PomodoroBreak breakLength={this.state.breakLength} click={this.handleClick}/>
        <PomodoroSession sessionLength={this.state.sessionLength} click={this.handleClick} />
        </div>
        <div className="pomodoroApp" id="pomodoroAppDisplay">
        <PomodoroTime session={this.state.session} timeRemaining={this.secondsToMMSS(this.state.timeRemaining)} click={this.handleClick} />
        </div>
        </div>
    );
  };
};

class PomodoroBreak extends React.Component
{
  constructor(props)
  {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event)
  {
    this.props.click(event);
  }

  render()
  {
    return (
        <div className="pomodoroApp pomodoroAppBreakContainer" id="pomodoroAppBreakContainer">
        <div className="pomodoroApp pomodoroAppBreak" id="break-label">
        <p>
        Break Length
        </p>
        </div>
        <div className="pomodoroApp pomodoroAppBreak" id="pomodoroAppBreakTime">
        <p id="break-length">
        {this.props.breakLength}
        </p>
        </div>
        <div className="pomodoroApp pomodoroAppBreakControls" id="pomodoroAppBreakControls">
        <div className="pomodoroApp pomodoroAppBreakControls pomodoroAppBreakControlsButton" id="break-increment" onClick={this.props.click}>
        +
        </div>
        <div className="pomodoroApp pomodoroAppBreakControls pomodoroAppBreakControlsButton" id="break-decrement" onClick={this.props.click}>
        -
        </div>
        </div>
        </div>
    );
  }
};

class PomodoroSession extends React.Component
{
  constructor(props)
  {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event)
  {
    this.props.click(event);
  }

  render()
  {
    return (
        <div className="pomodoroApp pomodoroAppSessionContainer" id="pomodoroAppSessionContainer">
        <div className="pomodoroApp pomodoroAppSession" id="session-label">
        <p>
        Session Length
        </p>
        </div>
        <div className="pomodoroApp pomodoroAppSession" id="pomodoroAppSessionTime">
        <p id="session-length">
        {this.props.sessionLength}
        </p>
        </div>
        <div className="pomodoroApp pomodoroAppSessionControls" id="pomodoroAppSessionControls">
        <div className="pomodoroApp pomodoroAppSessionControls pomodoroAppSessionControlsButton" id="session-increment" onClick={this.props.click}>
        +
        </div>
        <div className="pomodoroApp pomodoroAppSessionControls pomodoroAppSessionControlsButton" id="session-decrement" onClick={this.props.click}>
        -
        </div>
        </div>
        </div>
    );
  }
};

class PomodoroTime extends React.Component
{
  constructor(props)
  {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }
  
  handleClick(event)
  {
    this.props.click(event);
  }

  render()
  {
    return (
        <div className="pomodoroApp pomodoroAppTime" id="timer-label">
        <p>
        {this.props.session ? 'Session' : 'Break'}
        </p>
        <div className="pomodoroApp pomodoroAppTimeDisplay" id="pomodoroAppTimeDisplayTime">
        <p id="time-left">
        {this.props.timeRemaining}
        </p>
        <audio className="beep" preload="auto" id="beep" src="https://www.nasa.gov/mp3/640150main_Go%20at%20Throttle%20Up.mp3"></audio>
        </div>
        <div className="pomodoroApp pomodoroAppTimeControls">
        <div className="pomodoroApp pomodoroAppTimeControls pomodoroAppTimeControlsButton" id="start_stop" onClick={this.props.click}>
        start/stop
        </div>
        <div className="pomodoroApp pomodoroAppTimeControls pomodoroAppTimeControlsButton" id="reset" onClick={this.props.click}>
        reset
        </div>
        </div>
        </div>
    );
  }
};

export default PomodoroApp;
