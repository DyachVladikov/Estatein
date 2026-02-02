const getCurrentPrice = (price:number | undefined) => {
    if(typeof(price) !== "undefined")
    {
        const stringPrice = price.toString()

        const result = stringPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return(result)
    }
    else {
        return ""
    }
    
    
}

export default getCurrentPrice