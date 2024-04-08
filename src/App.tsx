import { useState } from "react";
import "./App.css";
import SpeechToText from "./components/SpeechToText/SpeechText";
import TextToSpeech from "./components/TextToSpeech/TextToSpeech";
function App() {
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);
  const [popUpIsOpenText, setPopUpIsOpenText] = useState(false);
  return (
    <div className="App">
      <div>
        <div className="buttons">
          <button
            className="buttonOpen"
            onClick={() => setPopUpIsOpen(!popUpIsOpen)}
          >
            for Speak
          </button>

          <button
            className="buttonOpen"
            onClick={() => setPopUpIsOpenText(!popUpIsOpen)}
          >
            for Text
          </button>
        </div>
        {popUpIsOpen && (
          <SpeechToText
            popUpIsOpen={popUpIsOpen}
            setPopUpIsOpen={setPopUpIsOpen}
          />
        )}
        {popUpIsOpenText && (
          <TextToSpeech
            popUpIsOpen={popUpIsOpenText}
            setPopUpIsOpen={setPopUpIsOpenText}
          />
        )}
      </div>
    </div>
  );
}

export default App;
