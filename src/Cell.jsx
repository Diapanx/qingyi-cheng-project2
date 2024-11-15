import { useContext } from 'react';
import './style/Cell.css';
import { MinesweeperContext } from './MinesweeperGameProvider';

export default function Cell(props) {
    const globalProps = useContext(MinesweeperContext);
    const {
        gameOverState,
        setGameOverState,
        setRevealedCells,
        revealAdjacentCells,
        revealedCells,
        flaggedCells,
        setFlaggedCells,
        setNumFlagged,
        setRemainingMines,
        incrementNumFoundCell,
        revealAdjacentEight
    } = globalProps;

    const row = props.row;
    const col = props.col;
    const isMine = props.isMine;
    const key = `${row}-${col}`;
    const isRevealed = revealedCells[key];
    const isFlagged = flaggedCells[key]


    const className = isRevealed ? 'cell selected' : 'cell unselected';
    let cellContent = '';

    if (isRevealed) {
        if (isMine === -1) {
            cellContent = '💣';
        } else if (isMine !== 0) {
            cellContent = isMine;
        }
    } else if (isFlagged) {
        cellContent = '🚩';
    }
    
    function onMousePress(x, y) {
        if (gameOverState) return;
        if (isRevealed){
            revealAdjacentEight(x, y)
            return
        }

        if (isMine === 0) {
            revealAdjacentCells(x, y);
        } else if (isMine > 0) {
            setRevealedCells(prev => ({ ...prev, [key]: true }));
            incrementNumFoundCell(); // Increment for non-zero, non-mine cells
        } else if (isMine === -1) {
            setRevealedCells(prev => ({ ...prev, [key]: true }));
            setGameOverState(-1); // Game lost
        }
    }

    function onRightClick(e) {
        e.preventDefault();
        if (isRevealed || gameOverState) return;

        setFlaggedCells((prev) => ({ ...prev, [key]: !prev[key] }));
        if (!flaggedCells[key]) {
            // If the cell was not flagged before, now it's being flagged
            setNumFlagged((prev) => prev + 1);
            setRemainingMines((prev) => prev - 1);
        } else {
            // If the cell was flagged before, now it's being unflagged
            setNumFlagged((prev) => prev - 1);
            setRemainingMines((prev) => prev + 1);
        }

    }

    return (
        <div
            className={className}
            onClick={() => !gameOverState && onMousePress(row, col)}
            onContextMenu={onRightClick}
        >
            {cellContent}
        </div>
    );
}