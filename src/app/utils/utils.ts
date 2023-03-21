import { ComponentFactoryResolver } from "@angular/core"

//** FECHAS **//
const getISODateStringFromUnixTime = (unixTime:number):string => {
    try {
        if(!unixTime) return ""
        else {
            const date = new Date(unixTime)
            const isoString = date.toISOString()
            const isoDateString = isoString.split('T')[0]        
            return isoDateString                 
        }
    }
    catch(err) {
        console.log("Error en getISODateStringFromUnixTime: ", err)
        return ""
    }
}

const getISODateStringFromISOString = (isoString:string):string => {
    try {
        if(!isoString) return ""
        else {
            const isoDateString = isoString.split('T')[0]        
            return isoDateString                 
        }
    }
    catch(err) {
        console.log("Error en getISODateStringFromISOString: ", err)
        return ""
    }
}

const getLocaleDateStringFromUnixTime = (unixTime:number):string => {
    try {
        console.log("unixTime: ", unixTime);
        if(!unixTime) return ""
        else {
            const date = new Date(unixTime)
            const localeDateString = date.toLocaleDateString()
            console.log("localDateString: ", localeDateString);

            return localeDateString          
        }
    }   
    catch(err) {
        console.log("Error en getISODateStringFromUnixTime: ", err)
        return ""
    }
}

const getUnixTimeFromString = (DateString:string):number => {
    const date = new Date(DateString)
    const unixTime = date.getTime()
    return unixTime
}



export {
    getISODateStringFromUnixTime,
    getLocaleDateStringFromUnixTime,
    getUnixTimeFromString,
    getISODateStringFromISOString
}