import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const MinesweeperContext = createContext();


export function MinesweeperGameProvider(props){
    const [boardState, setBoardState] = useState({});
    const {difficulty} = useParams()

    const [gameOverState, setGameOverState] = useState(0);
    const [resetState, setResetState] = useState(false)
    const [endingComponent, setEndingComponent] = useState(undefined)
    const [revealedCells, setRevealedCells] = useState({});
    const [flaggedCells, setFlaggedCells] = useState({});
    const [numFlagged, setNumFlagged] = useState(0)
    const [remainingMines, setRemainingMines] = useState(0)
    const [numFoundCell, setNumFoundCell] = useState(0);


    function revealAdjacentCells(x, y, visited = {}) {
        const key = `${x}-${y}`;
    
        // Check if the cell has already been revealed or visited in this recursion
        if (visited[key] || revealedCells[key]) return;
    
        visited[key] = true;
    
        setRevealedCells(prev => ({ ...prev, [key]: true }));
        incrementNumFoundCell();
    
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],          [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];
    
        directions.forEach(([dx, dy]) => {
            const newRow = x + dx;
            const newCol = y + dy;
            const newKey = `${newRow}-${newCol}`;
    
            if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                !visited[newKey] &&
                !revealedCells[newKey]
            ) {
                const adjacentMineCount = boardState[newKey];
    
                if (adjacentMineCount === 0) {
                    revealAdjacentCells(newRow, newCol, visited);
                } else if (adjacentMineCount > 0) {
                    visited[newKey] = true;
                    setRevealedCells(prev => ({ ...prev, [newKey]: true }));
                    incrementNumFoundCell();
                }
            }
        });
    }

    function revealAdjacentEight(x, y) {    
        const directions = [
            [-1, -1], [-1, 0], [-1, 1],
            [0, -1],          [0, 1],
            [1, -1], [1, 0], [1, 1],
        ];
    
        directions.forEach(([dx, dy]) => {
            const newRow = x + dx;
            const newCol = y + dy;
            const newKey = `${newRow}-${newCol}`;
    
            if (
                newRow >= 0 &&
                newRow < rows &&
                newCol >= 0 &&
                newCol < cols &&
                !revealedCells[newKey] &&
                !flaggedCells[newKey]
            ) {
                const adjacentMineCount = boardState[newKey];
    
                if (adjacentMineCount === 0) {
                    revealAdjacentCells(newRow, newCol);
                } else if (adjacentMineCount > 0) {
                    setRevealedCells(prev => ({ ...prev, [newKey]: true }));
                    incrementNumFoundCell();
                } else if (adjacentMineCount === -1) {
                    setRevealedCells(prev => ({ ...prev, [newKey]: true }));
                    setGameOverState(-1); // Game lost
                }
            }
        });
    }

    function incrementNumFoundCell() {
        setNumFoundCell((prevNumFoundCell) => {
            const newNumFoundCell = prevNumFoundCell + 1;
            if (newNumFoundCell === rows * cols - numMine) {
                setGameOverState(1); // Game won
            }
            return newNumFoundCell;
        });
    }

    // Switch game difficulty
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
    useEffect(() => {
        setRemainingMines(numMine);
    }, [numMine]);

    useEffect(()=>{
        setResetState((prevState) => !prevState)
    }, [difficulty])

    function revealAllBombs() {
        const newRevealedCells = { ...revealedCells }; // Start with the existing revealed cells state
        Object.keys(boardState).forEach(key => {
            if (boardState[key] === -1) { // Check if the cell is a mine
                newRevealedCells[key] = true; // Reveal the mine cell
            }
        });
        setRevealedCells(newRevealedCells);
    }
    
    useEffect(() => {
        if (gameOverState === -1) {
            revealAllBombs();
        }
    }, [gameOverState]);

    useEffect(()=>{
        const board = {};
        const revealed = {}
        const flagged = {}
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
                revealed[i + '-' + j] = false
                flagged[i + '-' + j] = false
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
        setRevealedCells(revealed)
        setFlaggedCells(flagged)
        setRemainingMines(numMine)
        setEndingComponent(undefined)
        setGameOverState(0)
        setNumFoundCell(0)
    }, [resetState])

    const globalProps = {
        boardState: boardState,
        gameOverState: gameOverState,
        setGameOverState: setGameOverState,
        resetState: resetState,
        setResetState: setResetState,
        rows: rows,
        cols: cols,
        numFoundCell: numFoundCell,
        endingComponent: endingComponent,
        setEndingComponent: setEndingComponent,
        revealedCells: revealedCells,
        setRevealedCells: setRevealedCells,
        revealAdjacentCells: revealAdjacentCells,
        flaggedCells: flaggedCells,
        setFlaggedCells: setFlaggedCells,
        numFlagged: numFlagged,
        setNumFlagged: setNumFlagged,
        remainingMines,
        setRemainingMines,
        incrementNumFoundCell,
        revealAdjacentEight
    }

    return <MinesweeperContext.Provider value={globalProps}>
        {props.children}
    </MinesweeperContext.Provider>


}