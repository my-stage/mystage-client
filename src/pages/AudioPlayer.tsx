import React, { useState, useEffect } from 'react';
import {
  Typography
} from '@material-ui/core';
import WaveSurfer from 'wavesurfer.js';

function AudioPlayer() {
  const [waveSurfer, setWaveSurfer] = useState();

  useEffect(() => {
    const waveSurfer = WaveSurfer.create({
      container: '#waveform'
    });
    waveSurfer.load('data/Tina Turner.mp3');
    waveSurfer.on('ready', function () {
      waveSurfer.play();
    });
    setWaveSurfer(waveSurfer);
  }, []);

  return (
    <>
      <Typography>Audio Player</Typography>
      <div id="waveform"></div>
    </>
  );
}

export default AudioPlayer;
