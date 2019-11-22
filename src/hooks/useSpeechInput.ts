import { useState, useEffect, useCallback } from "react";
// TODO move this to inside hook???
const w = window as any;
const SpeechRecognition = w.webkitSpeechRecognition ||
  w.mozSpeechRecognition ||
  w.msSpeechRecognition ||
  w.oSpeechRecognition ||
  w.SpeechRecognition;

const recognition = SpeechRecognition && new SpeechRecognition();

const useSpeechInput = (onVoiceInput: (w: string) => void, onVoiceStarted?: () => void) => {
  const isBrowserSupportSpeech = SpeechRecognition !== null && SpeechRecognition !== undefined;
  const [inputValue, setInputValue] = useState("");
  const [started, setStarted] = useState(false);

  const startVoiceInput = () => {
    if (!recognition) return;
    recognition.start();

  }
  const voiceCallback = useCallback(() => {
    if (!recognition) {
      return;
    }
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (e: any) => {
      setInputValue(e.results[0][0].transcript);
      onVoiceInput(e.results[0][0].transcript)
      recognition.stop();
    };

    recognition.onaudiostart = () => {
      if (onVoiceStarted) onVoiceStarted();
      setStarted(true);
    }
    recognition.onend = () => {
      setStarted(false);
    }

    recognition.onerror = (e: any) => {
      recognition.stop();
    }

  }, [onVoiceInput, onVoiceStarted])
  useEffect(() => {
    voiceCallback()
    return () => {
      if (recognition && started)
        recognition.stop()
    }

  }, [voiceCallback, started])

  return {
    started,
    inputValue,
    startVoiceInput,
    isBrowserSupportSpeech
  }
}

export default useSpeechInput;