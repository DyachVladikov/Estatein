function getSplitedText(text: string | undefined, maxWords: number): string {

    if(typeof(text) != "undefined")
    {
        const words = text.trim().split(/\s+/); 

        if (words.length <= maxWords) {
            return text;
        }

        return words.slice(0, maxWords).join(' ') + '...';
    }
    else {
        return ""
    }
  
}

export default getSplitedText