import { toast } from "react-toastify";
import { loadCustomSets, loadHighScores, savehighScores, storeCustomSets } from "./localStore"
import configurationProd from "../config/prod/configuration.json";
import configurationDev from "../config/dev/configuration.dev.json"

export const getDefaultSets = () => {
    return import.meta.env.PROD ?  [ ...configurationProd.questionSets] : [ ...configurationDev.questionSets];
}

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

export const handleMultiplicationChanceChange = (event, set) => {
    let { value } = event.target;
    let updatedSet = { ...set};
    if(value > 100) value = 100;
    updatedSet.operands.multiplication.chance = Number(value / 100);
    return updatedSet;
}

export const handleDivisionChanceChange = (event, set) => {
    let { value } = event.target;
    let updatedSet = { ...set};
    if(value > 100) value = 100;
    updatedSet.operands.division.chance = Number(value / 100);
    return updatedSet;
}

export const handleAdditionChanceChange = (event, set) => {
    let { value } = event.target;
    let updatedSet = { ...set};
    if(value > 100) value = 100;
    updatedSet.operands.addition.chance = Number(value / 100);
    return updatedSet;
}

export const handleSubtractionChanceChange = (event, set) => {
    let { value } = event.target;
    let updatedSet = { ...set};
    if(value > 100) value = 100;
    updatedSet.operands.subtraction.chance = Number(value / 100);
    return updatedSet;
}

export const handlePowerChanceChange = (event, set) => {
    let { value } = event.target;
    let updatedSet = { ...set};
    if(value > 100) value = 100;
    updatedSet.operands.power.chance = Number(value / 100);
    return updatedSet;
}

export const handleRootChanceChange = (event, set) => {
    let { value } = event.target;
    let updatedSet = { ...set};
    if(value > 100) value = 100;
    updatedSet.operands.root.chance = Number(value / 100);
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

        if(!operandChancesAreValid(set.operands)){
            toast.error("Operator chances must add up to 100%");
            errors++;
        }

        return errors < 1;
}

export const handleSetUpdate = (set) => {
    return new Promise((resolve) => {
        let sets = getCustomSets();
        let original = sets.find((item) => item.id == set.id);
        let index = sets.indexOf(original);
        sets[index] = set;
        saveSets(sets);
        resolve(sets);
    });
}

export const handleSetCreate = (set) => {
    return new Promise((resolve) => {
        // Save set
        let sets = getCustomSets();
        sets.push(set);
        saveSets(sets);
        resolve(sets);
    });
}

export const createHighScoreEntryForSet = (set) => {
    return new Promise((resolve) => {
        let entry = {
            setId: set.id,
            scores: []
        }
    
        let highScores = loadHighScores();
    
        if(highScores == null) highScores = [];
        highScores.push(entry);
        savehighScores(highScores);
        resolve(highScores);
    });
}

export const handleSetDelete = (set) => {
    return new Promise((resolve) => {
        let sets = getCustomSets();
        let original = sets.find((item) => item.id == set.id);
        let index = sets.indexOf(original);
        sets.splice(index, 1);
        saveSets(sets);
        resolve(sets);
    });
}

const operandChancesAreValid = (operands) => {
    let sum = operands.multiplication.chance + operands.division.chance + operands.addition.chance + operands.subtraction.chance + operands.power.chance + operands.root.chance;
    return 1 == sum;
}