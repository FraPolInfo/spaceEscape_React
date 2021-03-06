import "./CoreGame.css"
import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react"

const CoreGame = (props) => {

    let topBorder = 10
    let bottomBorder = 90
    let jumpingSpeed = 2
    let fallingSpeed = 2

    const [state, setState] = useState({
        top: 50,
        startingFlag: true,
        jumpingFlag: false,
        life: 3,
        points: 0
    })

    /* Component Did Update
    /*continua a muovere il personaggio in basso finchè la jumpingFlag è falsa, e
    e verso l'alto quando è vera.*/
    useEffect(() => {
        if (state.startingFlag === false) {

            let top = null;
            if (state.jumpingFlag) {
                top = state.top - jumpingSpeed
            } else {
                top = state.top + fallingSpeed
            }

            /* Controlla che il personaggio non stia saltando oltre il limite superiore   o cadendo oltre il limite inferiore*/
            const interval = setTimeout(() => {
                setState({
                    ...state,
                    top: top,
                    points: state.points + 1
                })
            }, 30)

            return () => clearTimeout(interval)
        }
    })
    /* Component Did Update listening state.top  */
    useEffect(() => {
        endGame()
    }, [state.top])
    /*  */
    /* funzioni movimento */
    const characterJumping = () => {
        setState({
            ...state,
            jumpingFlag: true,
            startingFlag: false
        })
    }
    const characterFalling = () => {
        setState({
            ...state,
            jumpingFlag: false
        })
    }

    /* funzione end game */
    const endGame = () => {
        if (state.life === 0) {
            /* Settiamo il record*/
            let record = localStorage.getItem('points')
            if (record < state.points) {
                localStorage.setItem("points", state.points)
            }
            props.callbackReturnToStart()
        }
        if (state.top === bottomBorder || state.top === topBorder) {
            setState({
                ...state,
                top: 50,
                startingFlag: true,
                life: state.life - 1
            })
        }
    }

    return (
        <div className="container-core-game">
            <div className="ui-container">
                <div className="ui-life">
                    <div className={`${props.character} character-icon`}></div>
                    <div>x {state.life}</div>
                </div>
                <div className="ui-points">
                    Score {state.points}
                </div>
            </div>
            <div className="core-game" onMouseDown={characterJumping} onMouseUp={characterFalling}>
                <div className="top-margin"
                    style={{ top: 0 }}
                >
                </div>
                <span className={`character ${props.character}`}
                    style={{ left: "50%", top: state.top.toString() + "%" }}
                >
                </span>
                {
                    state.startingFlag === true &&
                    <span className="start-game" > Clicca per Cominciare </span>
                }
                <div className="bottom-margin"
                    style={{ top: (bottomBorder).toString() + "%" }}
                >
                </div>
            </div>
        </div>

    );
}

CoreGame.propTypes = {
    callbackReturnToStart: PropTypes.func,
    character: PropTypes.string,
};

export default CoreGame;

