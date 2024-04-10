import React, { useState, useEffect } from "react";
import { useStyles } from "./TextToSpeech.styles";
import classNames from "classnames";
import useSpeechRecognition from "../useSpeechRecognition/useSpeechRecognition";

type Props = {
  popUpIsOpen: boolean;
  setPopUpIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TextToSpeech: React.FC<Props> = ({ popUpIsOpen, setPopUpIsOpen }) => {
  const classes = useStyles({ popUpIsOpen });

  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const [transcript, setTranscript, started] = useSpeechRecognition();

  const paragraph = "Hi my dear pre-deployment friend, how are you doing today? dear";

  useEffect(() => {
    const paragraphWords: string[] = (paragraph.toLowerCase().match(/[a-z']+/g) || []) as string[];
    const transcriptWords: string[] = (transcript.toLowerCase().match(/[a-z']+/g) || []) as string[];

    const L = Math.min(paragraphWords.length, transcriptWords.length);
    const correct: string[] = [];
    for (let i = 0; i < L; ++i) {
      if (paragraphWords[i] === transcriptWords[i]) {
        correct.push(paragraphWords[i]);
      } else {
        correct.push("1234");
      }
    }
    // const correct = paragraphWords.filter((word) => transcriptWords.includes(word));
    console.log("correct words",correct);
    
    setCorrectWords(correct);
  }, [transcript, paragraph]);

  return (
    <div className={classes.containerPopUP}>
      <div className={classes.content}>
        <button className={classes.closeButton} type="button" onClick={() => setPopUpIsOpen(false)} > x </button>
        <h3 className={classes.title}>Speak with your voice at the text</h3>
        <div className={classes.transcript}>
          <p>
            {paragraph.split(/\b/).map((word, index) => {
              // const colorOfText = correctWords.includes(
                // word.toLowerCase().replace(/[^\w\s']/gi, "")
              // );

              const colorOfText = correctWords[index] === word;
              console.log("Hamem", word, correctWords[index], index);
              

              return (
                <span
                  key={index}
                  className={classNames(classes.word, {
                    [classes.correctWord]: colorOfText,
                    [classes.incorrectWord]: !colorOfText,
                  })}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        <button
          className={classNames(classes.buttonSpeech, {
            [classes.buttonSpeechActive]: started,
          })}
          onClick={setTranscript}
        >
          <img src="./images/microphone.svg" alt="Microphone" />
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
