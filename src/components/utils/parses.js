export default function isNumber(value) {
    try{
        var reg = new RegExp('^[0-9]+(\.[0-9]{1,2})?$');
        if (reg.test(value))
            return parseFloat(value)
        else
            return false;
    }        
    catch (e){
        return false
    }        
}