import { toast } from "react-toastify";
import { loadCustomSets, storeCustomSets } from "./localStore"

export const getCustomSets = () => {
    const sets = loadCustomSets();
    return sets ? sets : [];
}

export const getCustomSet = (id) => {
    const sets = loadCustomSets();
    return sets.find((set) => set.id == id);
}

export const saveSets = (sets) => {
    storeCustomSets(sets);
}

export const handleNameChange = (event, set) => {
    const { value } = event.target;
    let updatedSet = { ...set};
    updatedSet.name = value;
    return updatedSet;
}

export const handleQuestionNumberChange = (event, set) => {
    const { value } = event.target;
    let updatedSet = { ...set};
    updatedSet.numberOfQuestions = value;
    return updatedSet;
}

export const handleIncludedNumberAdded = (number, set) => {
    let updatedSet = { ...set};
    updatedSet.includedNumbers.push(number);
    return updatedSet;
}

export const handleSecondaryNumberAdded = (number, set) => {
    let updatedSet = { ...set};
    updatedSet.secondaryNumbers.push(number);
    return updatedSet;
}

export const setIsValid = (set) => {
    let errors = 0;

        if(!set.name || set.name.length == 0){
            toast.error("Name is required.")
            errors++;
        }

        if(set.name.length > 40){
            toast.error("Name is too long.")
            errors++;
        }

        if(!set.numberOfQuestions || set.numberOfQuestions < 1){
            toast.error("Number of question is required.")
            errors++;
        }

        if(set.includedNumbers.length < 1){
            toast.error("Must have at least one included number.");
            errors++;
        }

        if(set.secondaryNumbers.length < 1){
            toast.error("Must have at least one included number.");
            errors++;
        }

        return errors < 1;
}

export const handleSetUpdate = (set) => {
    let sets = getCustomSets();
    let original = sets.find((item) => item.id == set.id);
    let index = sets.indexOf(original);
    sets[index] = set;
    saveSets(sets);
}

export const handleSetCreate = (set) => {
    let sets = getCustomSets();
    sets.push(set);
    saveSets(sets);
}