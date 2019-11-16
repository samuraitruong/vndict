import { IApiResponse, ApiResponseTypes } from "models/IApiResponse";
import { constants } from "../constants";

export async function fetchWord(word: string): Promise<IApiResponse<any>> {
  let result: IApiResponse<any> = {
    resultType: ApiResponseTypes.Success
  }
  try {
    word = word.toLocaleLowerCase().trim();
    const response = await fetch(`${constants.RESOURCE_URL}/html/${word}.json`);
    let text = await response.text();
    text = text.replace(
      /find\?type=(\d+)&amp;query=([^"]*)/ig,
      "$2"
    );

    result.data = JSON.parse(text);
  }
  catch (err) {
    console.log(err);
    result.resultType = ApiResponseTypes.Error;
    result.errorMessage = "failed to fetch word";
  }
  return result;
}