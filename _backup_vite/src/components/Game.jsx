import React, { useState } from 'react';
import { useAccount } from 'wagmi';
import { Board } from './Board';
import { ConnectButton } from './ConnectButton';
import './Game.css';

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return { winner: squares[a], line: lines[i] };
        }
    }
    return null;
}

export function Game() {
    const { address, isConnected } = useAccount();
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [stepNumber, setStepNumber] = useState(0);
    const [xIsNext, setXIsNext] = useState(true);

    const currentSquares = history[stepNumber];
    const winInfo = calculateWinner(currentSquares);
    const winner = winInfo?.winner;
    const winningLine = winInfo?.line;

    const handleClick = (i) => {
        if (winner || currentSquares[i]) return;

        const newHistory = history.slice(0, stepNumber + 1);
        const current = newHistory[newHistory.length - 1];
        const squares = [...current];
        squares[i] = xIsNext ? 'X' : 'O';

        setHistory([...newHistory, squares]);
        setStepNumber(newHistory.length);
        setXIsNext(!xIsNext);
    };

    const jumpTo = (step) => {
        setStepNumber(step);
        setXIsNext(step % 2 === 0);
    };

    let status;
    if (winner) {
        status = `Winner: ${winner}`;
    } else if (stepNumber === 9) {
        status = "Draw!";
    } else {
        status = `Next player: ${xIsNext ? 'X' : 'O'}`;
    }

    return (
        <div className="game-container">
            <div className="game-info-bar">
                <ConnectButton />
                {isConnected && (
                    <div className="status-badge connected">
                        {address?.slice(0, 6)}...{address?.slice(-4)}
                    </div>
                )}
            </div>

            <div className="game-board-area">
                <h1 className="game-title">Tic-Tac-Toe</h1>
                <div className="status-display">{status}</div>
                <Board squares={currentSquares} onClick={handleClick} winningLine={winningLine} />
            </div>

            <div className="game-controls">
                <button className="reset-btn" onClick={() => jumpTo(0)}>Restart Game</button>
            </div>
        </div>
    );
}
