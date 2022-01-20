import "./ScreenGame.css"
import React, { useState, useEffect } from 'react'

/* hooks functions */
import StartMenu from "../StartMenu/StartMenu"
import CoreGame from "../CoreGame/CoreGame"


const ScreenGame = () => {

    const [state, setState] = useState(
        {
            showStartMenu: true,
            showRunGame: false,
        }
    )
    /* ComponentdidUpdate */
    useEffect(() => {
        console.log(state);
    })

    /* funzione di visualizzazione */
    const showScreens = () => {
        let showRunGame = null;
        let showStartMenu = null;
        if (state.showRunGame === false) {
            showRunGame = true;
            showStartMenu = false
        } else if (state.showRunGame === true) {
            showRunGame = false;
            showStartMenu = true;
        }
        setState(
            {
                showRunGame: showRunGame,
                showStartMenu: showStartMenu
            }
        )
    }
    /*  */






    return (
        <div className="screen-game" >

            {
                state.showStartMenu === true &&
                <StartMenu
                    callbackRunGame={showScreens}
                />
            }
            {
                state.showRunGame === true &&
                <CoreGame />
            }
        </div>
    )
}
export default ScreenGame










/*        */