import React from "react";
import { useStyles } from "./SpeechText.styles";
import useSpeechRecognition from "../useSpeechRecognition/useSpeechRecognition";

type Props = {
  popUpIsOpen: boolean;
  setPopUpIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const SpeechToText: React.FC<Props> = ({ popUpIsOpen, setPopUpIsOpen }) => {
  const classes = useStyles({ popUpIsOpen });

  const [transcript, setTranscript] = useSpeechRecognition();

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
          <p>{transcript}</p>
        </div>
        <button className={classes.buttonSpeech} onClick={setTranscript}>
          <img src="./images/microphone.svg" alt="Microphone" />
        </button>
      </div>
    </div>
  );
};

export default SpeechToText;
