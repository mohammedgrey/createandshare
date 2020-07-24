import React from "react";

import videojs from "video.js";
import "./VideoPlayer.css";

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      videoJsOptions: null,
    };
  }

  componentDidMount() {
    this.setState(
      {
        loaded: true,
        videoJsOptions: {
          autoplay: false,
          controls: true,
          sources: [
            {
              src: this.props.videoPath,
            },
          ],
          fluid: true,
        },
      },
      () => {
        this.player = videojs(
          this.videoNode,
          this.state.videoJsOptions,
          function onPlayerReady() {
            // console.log('onPlayerReady', this)
          }
        );
      }
    );
  }

  componentWillUnmount() {
    if (this.player) {
      this.player.dispose();
    }
  }

  render() {
    return (
      <div data-vjs-player>
        <video
          ref={(node) => (this.videoNode = node)}
          className="video-js vjs-big-play-centered"
        />
      </div>
    );
  }
}

export default VideoPlayer;
