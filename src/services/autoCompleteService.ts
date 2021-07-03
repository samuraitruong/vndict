import Fuse from "fuse.js";
import constants from "../constants";

type EnglishWordFuse = {
    title: string;
}
class AutoCompleteService {
    private fuse: Fuse<EnglishWordFuse>;
    private isReady: boolean = false;
    private options: Fuse.IFuseOptions<EnglishWordFuse>;
    constructor() {
        this.options = {
            shouldSort: true,
            threshold: 0.05,
            location: 0,
            distance: 100,
            // maxPatternLength: 32,
            minMatchCharLength: 3,
            keys: [
                "title",
            ]
        };
    }
    public async initialize() {
        const res = await fetch(constants.WORD_LIST_URL, { mode: "no-cors" });
        const json = await res.json();
        const data: EnglishWordFuse[] = Object.keys(json).map(key => { return { title: key } });

        this.fuse = new Fuse(data, this.options); // "list" is the item array
        console.log("auto complete service initialized");
        this.isReady = true;
    }
    public getAutocomplete(word: string) {
        if (!word || !this.isReady || word.length < 3) return [];
        const results: any[] = this.fuse.search(word);
        const arr = results.map(x => x.title);
        return arr.slice(0, 10);
    }
}
//this is singleton
export default new AutoCompleteService();
