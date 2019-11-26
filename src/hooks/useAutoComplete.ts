import autoCompleteService from "services/autoCompleteService";
import { useEffect, useState } from "react";

export function useAutocomplete(word: string) {
    const [autoCompleteItems, setAutoCompleteItems] = useState([])
    useEffect(() => {
        const inner = async () => {
            return new Promise((r) => {
                const start = (new Date()).getTime();
                const results = autoCompleteService.getAutocomplete(word);
                r()
                setAutoCompleteItems(results);
                console.log("FUZZY SEARCH TIME", (new Date()).getTime() - start)
            })
        }
        inner();
        return () => {

        }
        //autoCompleteService.getAutocomplete(word)
    }, [word]);

    return {
        autoCompleteItems
    }
}