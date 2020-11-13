import React from 'react';
import anime from 'animejs';
import {ReactComponent as MintLogo} from '../uiComponents/mint.svg';

export default class MintAnimation extends React.Component {

    componentDidMount() {
        this.playAnime();
    }

    playAnime = () => {
        anime({
            targets: '.mint',
            translateY: [0, 50],
            translateX: [0, 75],
            easing: 'easeInOutSine',
            duration: 3000,
            direction: 'alternate',
            loop: true
          });
        }

    render() {
        return (
            <div><MintLogo/></div>
        )
    }
}