import { formatInTimeZone } from "date-fns-tz";

const formatLongInt = (num) => {
    if (num / 1e9 >= 1) {
        return `${(num / 1e9).toFixed(1)}B`;
    } else if (num / 1e6 >= 1) {
        return `${(num / 1e6).toFixed(1)}M`;
    } else if (num / 1e3 >= 1) {
        return `${(num / 1e3).toFixed(1)}K`;
    } else {
        return num.toFixed(1);
    }
}

const formatQuote = (key, value) => {
    if (!value) {
        return "N/A";
    }
    
    switch (key) {
        case "Name":
        case "Symbol":
            return value.toUpperCase();
        case "LastPrice":
            return value.toFixed(2);
        case "Change":
            return `${value >= 0 ? "+" : ""}${value.toFixed(2)}`;
        case "ChangePercent":
            return `${value >= 0 ? "+" : ""}${value.toFixed(2)}%`;
        case "Timestamp":
            const tz = new Intl.DateTimeFormat().resolvedOptions();
            const timeString = formatInTimeZone(value, tz.timeZone, "pp zzz");
            return `As of ${timeString}`;
        case "Low":
        case "High":
        case "Open":
            return value.toFixed(2);
        case "Volume":
        case "MarketCap":
            return formatLongInt(value);
    }
}

const buildQuote = (rawQuote) => {
    const quote = {};
    
    for (const prop in rawQuote) {
        quote[prop] = formatQuote(prop, rawQuote[prop]);
    }
    
    const { Low, High, Open, Volume, MarketCap } = quote;
    const quoteDetails = [];
    
    quoteDetails.push({ key: "Range", value: Low !== "N/A" && High !== "N/A" ? `${Low} - ${High}` : "N/A" });
    quoteDetails.push({ key: "Open", value: Open });
    quoteDetails.push({ key: "Volume", value: Volume });
    quoteDetails.push({ key: "Market Cap", value: MarketCap });
    
    quote.quoteDetails = quoteDetails;
    
    return quote;
}

export default buildQuote;
