import { loadCustomSets } from "./localStore"

export const getCustomSets = () => {
    const sets = loadCustomSets();
    return sets ? sets : [];
}

export const getCustomSet = (id) => {
    const sets = loadCustomSets();
    return sets.find((set) => set.id == id);
}