import { screenDimensions } from "../helperFunctions";


const helperFunction = (fontSize) => {
    return Number(fontSize) * screenDimensions.fontScale
};

export const FontSizes = {
    xs: helperFunction(10), // 10px
    sm: helperFunction(12), // 12px
    md: helperFunction(14), // 14px
    lg: helperFunction(15), // 15px
    xl: helperFunction(20), // 20px
    xxl: helperFunction(24), // 24px
    xxxl: helperFunction(30), // 30px
}
