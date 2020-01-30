import React from 'react';
import ReactHowler from 'react-howler';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      playing: false,
      icon: "play_circle_outline"
    };
  }

  isPlaying() {
    this.state.playing ? this.pauseHandler() : this.playHandler();
  }

  playHandler() {
    this.setState(
      {
        playing: true,
        icon: 'pause_circle_outline'
      }
    );
  }

  pauseHandler() {
    this.setState(
      {
        playing: false,
        icon: "play_circle_outline"
      }
    );
  }

  render() {
    return (
      <div>
        <ReactHowler
          src={'https://servidor32-4.brlogic.com:8130/live'}
          format={['mp3', 'aac']}
          playing={this.state.playing}
          html5={true}
        />
        <Button icon={this.state.icon} onClick={() => this.isPlaying()} />
      </div>
    );
  }
}

const Button = (props) => (
  <div className="button play" onClick={() => props.onClick()}>
    <i className="material-icons">{props.icon}</i>
  </div>
);

export default App;
