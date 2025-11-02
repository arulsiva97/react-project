import React from "react";
import "./HangmanDrawing.css"; // we'll define drawing styles here

export default function HangmanDrawing({ wrongGuessCount }) {
  return (
    <div className="hangman-container">
      {/* Base stand */}
      <div className="gallow-base" />
      <div className="gallow-vertical" />
      <div className="gallow-top" />
      <div className="gallow-rope" />

      {/* Body parts based on wrong guesses */}
      {wrongGuessCount > 0 && <div className="head" />}
      {wrongGuessCount > 1 && <div className="body" />}
      {wrongGuessCount > 2 && <div className="left-arm" />}
      {wrongGuessCount > 3 && <div className="right-arm" />}
      {wrongGuessCount > 4 && <div className="left-leg" />}
      {wrongGuessCount > 5 && <div className="right-leg" />}
      {wrongGuessCount > 6 && <div className="eyes" />}
      {wrongGuessCount > 7 && <div className="blood-drop" />}
    </div>
  );
}
