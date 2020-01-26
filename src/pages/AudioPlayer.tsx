import React, {useState, useEffect, FormEvent, ChangeEvent} from 'react';
import {
  Typography,
  IconButton,
  Slider,
  Grid,
} from '@material-ui/core';
import {
  PlayCircleFilled as PlayIcon,
  PauseCircleFilled as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeDown as VolumeDownIcon,
  Remove as MinusIcon,
  Add as PlusIcon,
} from '@material-ui/icons';
import WaveSurfer from '../components/WaveSurfer';
import { Api } from '../api';

function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [speed, setSpeed] = useState(0);

  const handlePlayPauseClick = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (event: object, value: any) => {
    setVolume(value as number);
  };

  const handleSpeedChange = (event: object, value: any) => {
    setSpeed(value as number);
  };


  const speedStep = 0.001; // 0.1%
  const speedMax = 0.1; // +10%
  const speedMin = -0.1; // -10%
  const handleSpeedUpClick = () => {
    const newSpeed = speed + speedStep;
    if(newSpeed > speedMax) {
      setSpeed(speedMax);
    } else {
      setSpeed(newSpeed);
    }
  };
  const handleSpeedDownClick = () => {
    const newSpeed = speed - speedStep;
    if(newSpeed < speedMin) {
      setSpeed(speedMin);
    } else {
      setSpeed(newSpeed);
    }
  };


  const volumeStep = 0.005;
  const volumeMax = 1;
  const volumeMin = 0;
  const handleVolumeUpClick = () => {
    const newVolume = volume + volumeStep;
    if(newVolume > volumeMax) {
      setVolume(volumeMax);
    } else {
      setVolume(newVolume);
    }
  };
  const handleVolumeDownClick = () => {
    let newVolume = volume - volumeStep;
    if(newVolume < volumeMin) {
      setVolume(volumeMin);
    } else {
      setVolume(newVolume);
    }
  }

  return (
      <>
        <Grid container spacing={0}>
          <Grid container item direction="column" xs={1} alignItems="center">
            <Grid item>
              <IconButton onClick={handleVolumeUpClick}>
                <VolumeUpIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Slider
                  value={volume}
                  onChange={handleVolumeChange}
                  min={volumeMin}
                  max={volumeMax}
                  step={volumeStep}
                  style={{height: '100px'}}
                  orientation="vertical"
              />
            </Grid>
            <Grid item>
              <IconButton onClick={handleVolumeDownClick}>
                <VolumeDownIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container item direction="column" xs={1} alignItems="center">
            <Grid item>
              <IconButton onClick={handleSpeedUpClick}>
                <PlusIcon />
              </IconButton>
            </Grid>
            <Grid item>
              <Slider
                  value={speed}
                  onChange={handleSpeedChange}
                  min={speedMin}
                  max={speedMax}
                  step={speedStep}
                  orientation="vertical"
                  style={{height: '100px'}}
              />
            </Grid>
            <Grid item>
              <IconButton onClick={handleSpeedDownClick}>
                <MinusIcon />
              </IconButton>
            </Grid>
          </Grid>
          <Grid container item xs={10}>
            <WaveSurfer
                audioFile={Api.apiUrl+"/files/" + "tinaturner.mp3?token=" + Api.token}
                playing={playing}
                volume={volume}
                speed={speed}
            />
          </Grid>
        </Grid>
        <IconButton onClick={handlePlayPauseClick}>
          {playing ? <PauseIcon /> : <PlayIcon /> }
        </IconButton>
      </>
  );
}

export default AudioPlayer;
