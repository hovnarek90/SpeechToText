import React, { useState } from "react";
import { useStyles } from "./SpeechText.styles";

type Props = {
  popUpIsOpen: boolean;
  setPopUpIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpeechToText: React.FC<Props> = ({ popUpIsOpen, setPopUpIsOpen }) => {
  const classes = useStyles({ popUpIsOpen });
  const [transcript, setTranscript] = useState<string>("");

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
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setTranscript(transcript);
    };
    recognition.start();
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

        <h3 className={classes.title}>Speak with your voice</h3>
        <div className={classes.transcript}>
          {transcript && <p>{transcript}</p>}
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

export default SpeechToText;
