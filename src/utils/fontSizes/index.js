import { screenDimensions } from "../helperFunctions";


const helperFunction = (fontSize) => {
    return Number(fontSize) * screenDimensions.fontScale
};

export const FontSizes = {
    sm: helperFunction(12), // 12px
    md: helperFunction(14), // 14px
    lg: helperFunction(15), // 15px
}
