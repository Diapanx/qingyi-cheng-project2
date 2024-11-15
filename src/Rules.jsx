import './style/Rules.css'


export default function Rules(){
    return (
        <div className='rules'>
            <h1>Minesweeper Rules</h1>
            <div className='rule-body'>
                <p>Minesweeper is a game where mines are hidden in a grid of squares. Safe squares have numbers telling you how many mines touch the square. You can use the number clues to solve the game by opening all of the safe squares. If you click on a mine you lose the game!</p>
                <p>Windows Minesweeper always makes the first click safe. You open squares with the left mouse button and put flags on mines with the right mouse button. Pressing the right mouse button again changes your flag into a questionmark. When you open a square that does not touch any mines, it will be empty and the adjacent squares will automatically open in all directions until reaching squares that contain numbers. A common strategy for starting games is to randomly click until you get a big opening with lots of numbers.</p>
                <p>If you flag all of the mines touching a number, chording on the number opens the remaining squares. Chording is when you press both mouse buttons at the same time. This can save you a lot of work! However, if you place the correct number of flags on the wrong squares, chording will explode the mines.</p>
                <p>The three difficulty levels are Easy (8x8 with 10 mines), Medium (16x16 with 40 mines) and Hard (30x16 with 99 mines). The game ends when all safe squares have been opened. A counter shows the number of mines without flags, and a clock shows your time in seconds. Minesweeper saves your best time for each difficulty level.</p>
            </div>
        </div>
    )
}