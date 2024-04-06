import { useState } from "react";
import "./App.css";
import SpeechToText from "./components/SpeechToText/SpeechText";
function App() {
  const [popUpIsOpen, setPopUpIsOpen] = useState(false);

  return (
    <div className="App">
      <div>
        <button
          className="buttonOpen"
          onClick={() => setPopUpIsOpen(!popUpIsOpen)}
        >
          open popup
        </button>
        {popUpIsOpen && (
          <SpeechToText
            popUpIsOpen={popUpIsOpen}
            setPopUpIsOpen={setPopUpIsOpen}
          />
        )}
      </div>{" "}
    </div>
  );
}

export default App;
