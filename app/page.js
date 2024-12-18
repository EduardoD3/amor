"use client";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
  const [showSecondQuestion, setShowSecondQuestion] = useState(false);
  const [showThirdQuestion, setShowThirdQuestion] = useState(false);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: "50%", left: "50%" });
  const [previousPosition, setPreviousPosition] = useState({ top: "50%", left: "50%" });
  const [showLoveMessage, setShowLoveMessage] = useState(false);

  // Define a posição inicial para alinhar com o botão "Sim"
  useEffect(() => {
    setNoButtonPosition({ top: "50%", left: "calc(50% + 100px)" }); // Alinha à direita do botão "Sim"
    setPreviousPosition({ top: "50%", left: "calc(50% + 100px)" });
  }, []);

  const handleNoButtonHover = () => {
    let newTop, newLeft;
    do {
      newTop = `${Math.random() * 80}%`; // Nova posição Y aleatória
      newLeft = `${Math.random() * 80}%`; // Nova posição X aleatória
    } while (
      Math.abs(parseFloat(newTop) - parseFloat(previousPosition.top)) < 5 &&
      Math.abs(parseFloat(newLeft) - parseFloat(previousPosition.left)) < 5
    ); // Garante que a nova posição seja diferente

    setNoButtonPosition({ top: newTop, left: newLeft });
    setPreviousPosition({ top: newTop, left: newLeft });
  };

  const handleYesButtonClick = () => {
    setShowSecondQuestion(true);
  };

  const handleNextQuestion = () => {
    setShowThirdQuestion(true);
    setShowLoveMessage(true); // Exibe a mensagem "Eu te amo"
  };

  return (
    <div className="container">
      <Head>
        <title>Me Desculpa</title>
      </Head>
      <div className="overlay"></div>
      <div className="content">
        {!showSecondQuestion ? (
          <>
            <p className="question">Me desculpa por te irritar ontem?</p>
            <div className="buttons">
              <button
                className="yes-button"
                onClick={handleYesButtonClick}
              >
                Sim
              </button>
              <button
                className="no-button"
                style={{ ...noButtonPosition, position: "absolute" }}
                onMouseEnter={handleNoButtonHover} // Muda a posição ao passar o mouse
              >
                Não
              </button>
            </div>
          </>
        ) : !showThirdQuestion ? (
          <>
            <div className="response">
              <p className="response-text">Eu prometo que isso não vai mais acontecer 💖</p>
              <div className="bouncing-circles">
                <div className="circle pink-1"></div>
                <div className="circle pink-2"></div>
                <div className="circle pink-3"></div>
              </div>
            </div>
            <div className="next-question">
              <p className="question">vamos almoçar no shopping?</p>
              <div className="buttons">
                <button
                  className="yes-button"
                  onClick={handleNextQuestion}
                >
                  Sim
                </button>
                <button
                  className="no-button"
                  style={{ ...noButtonPosition, position: "absolute" }}
                  onMouseEnter={handleNoButtonHover} // Muda a posição ao passar o mouse
                >
                  Não
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="response">
              <p className="response-text">💖💖💖💖💖</p>
            </div>
            {showLoveMessage && (
              <div className="love-message">
                <p className="love-text">Eu te amo 💖</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
