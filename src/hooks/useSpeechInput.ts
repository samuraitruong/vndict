import { useState, useEffect, useCallback } from "react";
// TODO move this to inside hook???
const w = window as any;
const SpeechRecognition = w.webkitSpeechRecognition ||
                                    w.mozSpeechRecognition ||
                                    w.msSpeechRecognition ||
                                    w.oSpeechRecognition ||
                                    w.SpeechRecognition;

const recognition = new SpeechRecognition();

const useSpeechInput = (onVoiceInput: (w:string) => void, onVoiceStarted?: () => void) =>{
    const isBrowserSupportSpeech = SpeechRecognition != null;
    const [inputValue, setInputValue] = useState("");
    const [started, setStarted] = useState(false);
    
    const startVoiceInput  = () => {
      
      recognition.start();

    }
    const voiceCallback  = useCallback(() => {
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = "en-US";

      recognition.onresult = (e:any) => {
        setInputValue(e.results[0][0].transcript);
        onVoiceInput(e.results[0][0].transcript)
        recognition.stop();
      };

      recognition.onaudiostart = ()=> {
        if(onVoiceStarted) onVoiceStarted();
        setStarted(true);
      }
       recognition.onend = ()=> {
         setStarted(false);
       }

      recognition.onerror = (e: any) =>  {
        recognition.stop();
      }

    }, [onVoiceInput, onVoiceStarted])
    useEffect(() => {
      voiceCallback()
      return () => {
          recognition.stop()
      }

    },[voiceCallback])

    return {
      started,
        inputValue,
        startVoiceInput,
        isBrowserSupportSpeech
    } 
}

export default useSpeechInput;