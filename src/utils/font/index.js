import { screenDimensions } from "../functions";

export const FontFamily = {
    light: 'Poppins-Light',//300
    regular: 'Poppins-Regular',//400
    medium: 'Poppins-Medium',//500
    semiBold: 'Poppins-SemiBold',//600
    bold: 'Poppins-Bold',//700
    interLight: 'Inter-Light',//300
    interRegular: 'Inter-Regular', //400
    interMedium: 'Inter-Medium',//500
    interSemiBold: 'Inter-SemiBold',// 600
    interBold: 'Inter-Bold',//700
}


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