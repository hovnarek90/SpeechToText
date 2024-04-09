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

  const [transcript, setTranscript] = useSpeechRecognition();

  const [correctWords, setCorrectWords] = useState<string[]>([]);

  const paragraph =
    "hi my dear pre-deployment friend, how are you doing today? dear";

  useEffect(() => {
    const transcriptWords: string[] = (transcript
      .toLowerCase()
      .match(/[a-z']+/g) || []) as string[];
    const paragraphWords: string[] = (paragraph
      .toLowerCase()
      .match(/[a-z']+/g) || []) as string[];

    const correct = paragraphWords.filter((word) =>
      transcriptWords.includes(word)
    );

    setCorrectWords(correct);
  }, [transcript, paragraph]);

  return (
    <div className={classes.containerPopUP}>
      <div className={classes.content}>
        <button
          className={classes.closeButton}
          type="button"
          onClick={() => setPopUpIsOpen(false)}
        >
          x
        </button>

        <h3 className={classes.title}>Speak with your voice at the text</h3>
        <div className={classes.transcript}>
          <p>
            {paragraph.split(/\b/).map((word, index) => {
              const colorOfText = correctWords.includes(
                word.toLowerCase().replace(/[^\w\s']/gi, "")
              );

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

        <button className={classes.buttonSpeech} onClick={setTranscript}>
          <img src="./images/microphone.svg" alt="Microphone" />
        </button>
      </div>
    </div>
  );
};

export default TextToSpeech;
