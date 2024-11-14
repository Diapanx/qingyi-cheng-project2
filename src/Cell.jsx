import { useContext } from 'react';
import './Cell.css';
import { MinesweeperContext } from './MinesweeperGameProvider';

export default function Cell(props) {
    const globalProps = useContext(MinesweeperContext);
    const {
        checkIfGameIsOver,
        gameOverState,
        setRevealedCells,
        revealAdjacentCells,
        revealedCells,
    } = globalProps;

    const row = props.row;
    const col = props.col;
    const isMine = props.isMine;
    const key = `${row}-${col}`;
    const isRevealed = revealedCells[key];

    const className = isRevealed ? 'cell selected' : 'cell unselected';
    let cellContent = '';

    if (isRevealed) {
        if (isMine === -1) {
            cellContent = '💣';
        } else if (isMine !== 0) {
            cellContent = isMine;
        }
    }

    function onMousePress(x, y) {
        if (isRevealed || gameOverState) return;

        setRevealedCells(prev => ({ ...prev, [key]: true }));

        if (isMine === 0) {
            revealAdjacentCells(x, y);
        }

        checkIfGameIsOver(row, col);
    }

    return (
        <div
            className={className}
            onClick={() => !gameOverState && onMousePress(row, col)}
        >
            {cellContent}
        </div>
    );
}