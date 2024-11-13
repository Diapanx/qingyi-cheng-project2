import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MinesweeperContext = createContext();


export function MinesweeperGameProvider(props){
    const [boardState, setBoardState] = useState({});
    const {difficulty} = useParams()

    const [gameOverState, setGameOverState] = useState(0);
    const [resetState, setResetState] = useState(false)
    const [endingComponent, setEndingComponent] = useState(undefined)

    // Switch game difficulty
    let numFoundCell = 0;
    let numMine = 0;
    let rows = undefined;
    let cols = undefined;
    if (difficulty == "easy"){
        rows = 8
        cols = 8
        numMine = 10
    }
    else if (difficulty == "medium"){
        rows = 16
        cols = 16
        numMine = 40
    }
    else {
        rows = 16
        cols = 30
        numMine = 99
    }

    function checkIfGameIsOver(row, column) {
        const foundMine = boardState[row + '-' + column]
        if(foundMine == -1) {
            setGameOverState(-1);
        }
        else{
            numFoundCell++;
            if (numFoundCell == rows * cols - numMine){
                setGameOverState(1)
            }
        }
    }

    useEffect(()=>{
        setResetState((prevState) => !prevState)
    }, [difficulty])

    useEffect(()=>{
        const board = {};
        let minePlaced = 0;
        const directions = [
            [-1, -1],
            [-1, 0],
            [-1, +1],
            [0, -1],
            [0, +1],
            [+1, -1],
            [+1, 0],
            [+1, +1],
        ];

        for(let i = 0; i < rows; i ++) {
            for(let j = 0; j < cols; j ++) {
                board[i + '-' + j] = 0;
            }
        }

        while (minePlaced < numMine){
            const row = Math.floor(Math.random() * rows);
            const col = Math.floor(Math.random() * cols);
            if (board[row + '-' + col] !== -1){
                board[row + '-' + col] = -1;
                minePlaced++;
                directions.forEach(([dx, dy]) => {
                    const newRow = row + dx;
                    const newCol = col + dy;
                    if (
                        newRow >= 0 &&
                        newRow < rows &&
                        newCol >= 0 &&
                        newCol < cols &&
                        board[newRow + '-' + newCol] !== -1
                    ) {
                        board[newRow + '-' + newCol]++;
                    }
                });
            }
        }

        setBoardState(board)
        setEndingComponent(undefined)
        setGameOverState(0)
    }, [resetState])

    const globalProps = {
        boardState: boardState,
        checkIfGameIsOver: checkIfGameIsOver,
        gameOverState: gameOverState,
        resetState: resetState,
        setResetState: setResetState,
        rows: rows,
        cols: cols,
        numFoundCell: numFoundCell,
        endingComponent: endingComponent,
        setEndingComponent: setEndingComponent
    }

    return <MinesweeperContext.Provider value={globalProps}>
        {props.children}
    </MinesweeperContext.Provider>


}