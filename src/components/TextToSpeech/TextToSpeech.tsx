import React, { useState, useEffect } from "react";
import { useStyles } from "./TextToSpeech.styles";
import classNames from "classnames";

type Props = {
  popUpIsOpen: boolean;
  setPopUpIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const TextToSpeech: React.FC<Props> = ({ popUpIsOpen, setPopUpIsOpen }) => {
  const classes = useStyles({ popUpIsOpen });
  
  const [transcript, setTranscript] = useState<string>("");
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

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      console.error("Speech recognition not supported in this browser");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = true;
    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const word = event.results[i][0].transcript;
        console.log(word);
        interimTranscript += word + " ";
      }
      setTranscript(interimTranscript);
    };

    recognition.start();
    console.log("recognition started", recognition);
  };

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

        <button
          className={classes.buttonSpeech}
          onClick={startSpeechRecognition}
        >
          <img src="./images/microphone.svg" alt="Microphone" />
        </button>

      </div>
    </div>
  );
};

export default TextToSpeech;
