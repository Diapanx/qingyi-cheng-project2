import { useContext, useState, useEffect } from 'react'
import './Cell.css'
import { MinesweeperContext } from './MinesweeperGameProvider'


export default function Cell(props){

    const globalProps = useContext(MinesweeperContext);
    const checkIfGameIsOver = globalProps.checkIfGameIsOver;
    const resetState = globalProps.resetState;
    const numFoundCell = globalProps.numFoundCell;
    const gameOverState = globalProps.gameOverState;
    useEffect(() => {
        setClassName('cell unselected'),
        setCellContent('')
      }, [resetState]);

    const row = props.row
    const col = props.col
    const isMine = props.isMine

    const [cellContent, setCellContent] = useState('')
    const [className, setClassName] = useState('cell unselected')

    function onMousePress(x, y){
        if (isMine == -1){
            setCellContent('💣')
        }
        else if (isMine !== 0){
            setCellContent(isMine)
        }
        else {
            setCellContent('')
        }
        setClassName('cell selected')

        checkIfGameIsOver(row, col)
    }

    return (
        <div className={className} onClick={() => !gameOverState && onMousePress()}>
            {cellContent}
        </div>
    )
}