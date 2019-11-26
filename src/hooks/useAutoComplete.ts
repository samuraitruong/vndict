import autoCompleteService from "services/autoCompleteService";
import { useEffect, useState } from "react";

export function useAutocomplete(word: string) {
    const [autoCompleteItems, setAutoCompleteItems] = useState([])
    const [autoCompleteLoading, setAutoCompleteLoading] = useState(false);
    useEffect(() => {
        setAutoCompleteLoading(true);
        const start = (new Date()).getTime();
        const results = autoCompleteService.getAutocomplete(word);
        setAutoCompleteItems(results);
        console.log("auto complete search time(ms)", (new Date()).getTime() - start)
        setAutoCompleteLoading(false);
        return () => {

        }
    }, [word]);

    return {
        autoCompleteItems,
        autoCompleteLoading,setAutoCompleteItems
    }
}