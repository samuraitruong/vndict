import autoCompleteService from "services/autoCompleteService";
import { useEffect, useState } from "react";

export function useAutocomplete (word:string) {
    const [autoCompleteItems, setAutoCompleteItems] = useState([])
    useEffect(()=> {
        async function inner() {
            setAutoCompleteItems(autoCompleteService.getAutocomplete(word));
        }
        inner();
        
        //autoCompleteService.getAutocomplete(word)
    }, [word]);

    return {
        autoCompleteItems
    }
}