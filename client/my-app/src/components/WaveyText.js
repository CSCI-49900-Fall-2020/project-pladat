import React, { Component } from 'react';

 import './WaveyText.css';
//import './WaveyText.scss';
export default class WaveyText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "I fucking hate redux",
            charArr: [],
            word: []
        }
        console.log(this.props.actions);
    }


    componentDidMount() {
        this.handleLetterMap();
    }

    handleLetterMap = () => {
        let tempArr = [];
        // for(let char of this.state.text) {
        //     // tempArr = [tempArr, char];
        //     tempArr.push(char);
        // }
        for(let i = 0; i < this.state.text.length; i++) {
          tempArr.push(this.state.text.substring(i,i+1))
        }
        this.setState({
            charArr: tempArr
        },() => {
                console.log("THIS.STATE.TEXT: " + this.state.text);
                console.log("TEMP ARR: " + tempArr)
                console.log("THIS.STATE.CHARARR: " + this.state.charArr);
            //     let rippleWord = this.state.charArr.map((c) => {
            //         return(
            //             <span className="waveChar" id={c} key={c}>{c}</span>
            //         )
            // });
            let rippleWord = [];
            for(let i of this.state.charArr) {
                // rippleWord = [...rippleWord, i];
                rippleWord.push(i);
            }
            console.log("RIPPLEWORD: " + rippleWord);
            this.setState({
                word: rippleWord
            });
        });
    }

    render() {
        return(
            <div className="rideTheWave">
                {
                    this.state.word.map((i,index) =>
                        {
                            return(
                                <span key={index} className="waveChar">{i}</span>
                            )
                        }
                    )
                }
            </div>
        )
    }
}
