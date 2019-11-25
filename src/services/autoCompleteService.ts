import Fuse from "fuse.js";
import constants from "../constants";

type EnglishWordFuse = {
    title: string;
}
class AutoCompleteService {
    private fuse: Fuse<EnglishWordFuse, Fuse.FuseOptions<EnglishWordFuse>>;
    private isReady:boolean = false;
    private options: Fuse.FuseOptions<EnglishWordFuse>;
    constructor() {
        this.options = {
            shouldSort: true,
            threshold: 0.1,
            location: 0,
            distance: 100,
            maxPatternLength: 32,
            minMatchCharLength: 1,
            keys: [
              "title",
            ]
          };
    }
    public async initialize() {
        const res = await fetch(constants.WORD_LIST_URL, {mode: "no-cors"});
        const json = await res.json();
        const data : EnglishWordFuse[] = Object.keys(json).map(key => {return {title: key}});

        this.fuse = new Fuse(data, this.options); // "list" is the item array
        console.log("auto complete service initialized");
        this.isReady = true;
    }
    public getAutocomplete(word:string) {
        if(!this.isReady || word.length <3) return [];
        console.log("do fuzzy search")
        const results : any[]=  this.fuse.search(word);
        const arr =  results.map(x =>x.title);
        if(arr && arr.length >0 && arr[0] === word) return []
        return arr;
    }
}
//this is singleton
export default new AutoCompleteService() ;
