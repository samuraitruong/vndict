import constants from "../constants";

export async function sendTrack(word: string, mean?: string) {
    mean = mean|| word;
    try{
    await fetch(constants.TRACKING_SERVICE_URL, {method: "POST", mode:"no-cors", body: JSON.stringify({word, mean})});
    }catch(err) {
        console.log(err)
    }
}