import { IApiResponse, ApiResponseTypes } from "models/IApiResponse";
import { constants } from "../constants";
import { sendTrack } from "./trackingService";
import { findPossibleWord } from "./util";

export async function fetchWord(word: string, source: string): Promise<IApiResponse<any>> {
  source = source || "html";
  let result: IApiResponse<any> = {
    resultType: ApiResponseTypes.Success
  }
  try {
    word = word.toLocaleLowerCase().trim();
    const response = await fetch(`${constants.RESOURCE_URL}/${source}/${word}.json`);
    let text = await response.text();
    text = text.replace(
      /find\?type=(\d+)&amp;query=([^"]*)/ig,
      "$2"
    );
    result.data = JSON.parse(text);
    if(Object.keys(result.data).length === 0) {
      
      throw new Error("Word data is empty")
    }
    sendTrack(word);
  }
  catch (err) {
    console.log(err);
    const similars = findPossibleWord(word);
      if(similars.length >0) {
        result.suggestions = similars;
    }
    result.resultType = ApiResponseTypes.Error;
    result.errorMessage = "failed to fetch word";
  }
  return result;
}