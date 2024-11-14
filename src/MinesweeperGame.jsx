import './MinesweeperGame.css'
import Cell from './Cell'
import { useContext, useEffect } from 'react';
import { MinesweeperContext } from './MinesweeperGameProvider';

export default function MinesweeperGame(){

    const globalProps = useContext(MinesweeperContext)
    const boardState = globalProps.boardState
    const gameOverState = globalProps.gameOverState
    const row = globalProps.rows
    const col = globalProps.cols
    const endingComponent = globalProps.endingComponent
    const setEndingComponent = globalProps.setEndingComponent

    let rowComponents = [];

    useEffect(() => {
        if (gameOverState === 1) {
            setEndingComponent(<h1 className='ending'>Game over! You Won!</h1>);
        } else if (gameOverState === -1) {
            setEndingComponent(<h1 className='ending'>Game over! You lost!</h1>);
        }
    }, [gameOverState, setEndingComponent]);

    for (let i = 0; i < row; i++){
        const singleRowComponent = [];
        for (let j = 0; j < col; j++){
            const key = i + '-' + j
            const isMine = boardState[key]
            const cell = (<Cell row = {i} col = {j} isMine = {isMine} />);
            singleRowComponent.push(cell);
        }
        const styledRowComponent = (<div className='row'>{singleRowComponent}</div>)
        rowComponents.push(styledRowComponent)
    }

    const setResetState = globalProps.setResetState

    const handleReset = () => {
        setResetState((prevState) => !prevState)
    }


    return (
        <div className='game-body'>
            <div>{endingComponent}</div>
            <div>
                <div className='btn-container'>
                    <button onClick={()=>handleReset()}>Reset</button>
                </div>
                {rowComponents}
            </div>
        </div>
    )

}