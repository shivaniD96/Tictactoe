import React from 'react';
import './Board.css';

export function Board({ squares, onClick, winningLine }) {
    const renderSquare = (i) => {
        const isWinningSquare = winningLine && winningLine.includes(i);
        return (
            <button
                className={`square ${squares[i] ? squares[i].toLowerCase() : ''} ${isWinningSquare ? 'winner' : ''}`}
                onClick={() => onClick(i)}
            >
                {squares[i]}
            </button>
        );
    };

    return (
        <div className="board">
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}
