export let accuracyFormula = (attr1:string, attr2:string, accuracyModifier?:string) => {
    if(accuracyModifier) return "["+attr1+"+"+attr2+"] + " + accuracyModifier;
    else return "["+attr1+"+"+attr2+"]";
    
}

export let damageFormula = (damageModifier: number) =>{
    return "[ TM + "+damageModifier+"]";
}