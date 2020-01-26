import React, {useState, useEffect} from 'react';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';
import WaveSurferJs from 'wavesurfer.js';

function WaveSurfer(props: {playing?: boolean, audioFile?: string, volume?: number, speed?: number}) {
    const [waveSurfer, setWaveSurfer] = useState<WaveSurfer|null>(null);

    useEffect(() => {
        const wave = WaveSurferJs.create({
            container: "#waveform",
            waveColor: "violet",
            progressColor: "purple"
        });

        setWaveSurfer(wave);

        if(wave !== null && props.audioFile) {
            wave.load(props.audioFile);
        }
    }, []);

    useEffect(() => {
        if(waveSurfer !== null && props.volume) {
            waveSurfer.setVolume(props.volume);
        }
    }, [props.volume])

    useEffect(() => {
        if(waveSurfer !== null) {
            if(props.playing) {
                waveSurfer.play();
            } else {
                waveSurfer.pause();
            }
        }
    }, [props.playing]);

    useEffect(() => {
        if(waveSurfer !== null && props.audioFile) {
            waveSurfer.load(props.audioFile);
        }
    }, [props.audioFile]);

    useEffect(() => {
        if(waveSurfer !== null && props.speed) {
            waveSurfer.setPlaybackRate(1 + props.speed);
        }
    }, [props.speed]);

    return (
        <div id="waveform" style={{width: '100%', height: '100%'}}></div>
    );
}

export default WaveSurfer;
