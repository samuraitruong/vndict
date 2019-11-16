import { IApiResponse, ApiResponseTypes } from "models/IApiResponse";
import { constants } from "../constants";

export async function fetchWord(word: string): Promise<IApiResponse<any>> {
  let result: IApiResponse<any> = {
    resultType: ApiResponseTypes.Success
  }
  try {
    word = word.toLocaleLowerCase().trim();
    const response = await fetch(`${constants.RESOURCE_URL}/data/${word}.json`);
    const json = await response.json();
    result.data = json;
  }
  catch (err) {
    console.log(err);
    result.resultType = ApiResponseTypes.Error;
    result.errorMessage = "failed to fetch word";
  }
  return result;
}