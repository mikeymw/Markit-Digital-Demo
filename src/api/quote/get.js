import { remoteApiUrl, remoteApiVersion } from "@/api/api";
import getQuote from "@/api/quote/quote";

const fetchQuotes = async (symbol, abortController) => {
    let response;
    
    try {
        /*** simulate backend response ***/
        response = await getQuote(symbol);
    
        return response.data;
        /*** simulate backend response ***/
        
        /*response = await fetch(
            `${ remoteApiUrl }/${ remoteApiVersion }/quotes?search=${symbol}`,
            {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
                signal: abortController.signal,
            },
        );*/
    } catch (e) {
        console.log(e);
        throw e;
    }
    
    /*if (response.ok) {
        let quotes;
        
        try {
            quotes = await response.json();
        } catch (e) {
            throw new Error("error parsing response");
        }
        
        return quotes.data;
    } else {
        throw new Error(`${response.status}`);
    }*/
}

export default fetchQuotes;