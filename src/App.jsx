import { useState } from "react"
import { clsx } from "clsx"
import HangmanDrawing from "./HangmanDrawing";
import getRandomWord from "./words"
import Confetti from 'react-confetti'


export default function App() {
    // State values
    const [currentWord, setCurrentWord] = useState(()=>getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])

    // Derived values
    const wrongGuessCount =
        guessedLetters.filter(letter => !currentWord.includes(letter)).length
    const isGameWon =
        currentWord.split("").every(letter => guessedLetters.includes(letter))   
    const isGameLost = wrongGuessCount >= 8
    const isGameOver = isGameWon || isGameLost

    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    function startNewGame(){
      setCurrentWord(getRandomWord())
      setGuessedLetters([])
    }

     const letterElements = currentWord.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && "missed-letter"
        )
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })
    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && currentWord.includes(letter)
        const isWrong = isGuessed && !currentWord.includes(letter)
        const className = clsx({
            correct: isCorrect,
            wrong: isWrong
        })

        return (
            <button
                className={className}
                key={letter}
                disabled={isGameOver}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })
    
    const gameStatusClass = clsx("game-status", {
        won: isGameWon,
        lost: isGameLost
    })

    return (
        <main>
           { isGameWon && <Confetti
                        recycle={false}
                        numberOfPieces={1000} />
            }
            <header>
                <h1>Hangman</h1>
                <p>Guess the word within 8 attempts to keep the
                Hangman alive!</p>
            </header>

            <section className={gameStatusClass}>
                {isGameOver ? (
                    isGameWon ? (
                        <>
                            <h2>You win!</h2>
                            <p>Well done! 🎉</p>
                        </>
                    ) : (
                        <>
                            <h2>Game over!</h2>
                        </>
                    )
                ) : (
                        null
                    )
                }
            </section>
            <section className="hangman-drawing">
               <HangmanDrawing wrongGuessCount={wrongGuessCount} />
            </section>

            <section className="word">
                {letterElements}
            </section>

            <section className="keyboard">
                {keyboardElements}
            </section>

            {isGameOver && <button className="new-game"
                    onClick={startNewGame}>New Game</button>}
        </main>
    )
}
