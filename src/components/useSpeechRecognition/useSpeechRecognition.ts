import { useState } from "react";

export default function useSpeechRecognition(): [string, () => void, boolean] {
  const [transcript, setTranscript] = useState<string>("");

  const [started, setStarted] = useState(false);

  const startSpeechRecognition = () => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.error("Speech recognition not supported in this browser");
      return;
    }

    const recognition = new SpeechRecognition();
    // console.log(recognition);
    recognition.lang = "en-US";
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setStarted(true);
    }
    recognition.onend= () => {
      setStarted(false);
    }

    recognition.onresult = (event: any) => {
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        const word = event.results[i][0].transcript;
        // console.log(word);
        interimTranscript += word + " ";
      }

      setTranscript(interimTranscript);
    };
    console.log("transcript", transcript);

    recognition.start();
    // console.log("recognition started", recognition);
  };

  return [transcript, startSpeechRecognition, started];
}
