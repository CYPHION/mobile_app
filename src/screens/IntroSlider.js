import React, { useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native'; // Import Image component
import AppIntroSlider from 'react-native-app-intro-slider';
import { Color } from '../utils/colorPalette';
import { FontFamily } from '../utils/fontFamilies';
import { FontSizes } from '../utils/fontSizes';
import { screenDimensions } from '../utils/helperFunctions';

const slides = [
    {
        id: 1,
        text: 'Welcome To',
        title: 'PRIME TUITION',
        picture: require('../images/Image-18.png'),
        logo: require('../images/PT_LogoWhite.png') // Correct the image path and extension
    },
    {
        id: 2,
        text: 'Easy Fee',
        title: 'PAYMENT PLANS',
        picture: require('../images/Image-16.png'), // Correct the image path and extension
        logo: require('../images/PT_LogoWhite.png') // Correct the image path and extension
    },
    {
        id: 3,
        text: 'Quality Education',
        title: 'FOR EVERY CHILD',
        picture: require('../images/Image-18.png'), // Correct the image path and extension
        logo: require('../images/PT_LogoWhite.png') // Correct the image path and extension
    },
];

const IntroSlider = (props) => {
    const [progressWidth, setProgressWidth] = useState(33.3)
    const sliderRef = useRef(null);
    const onSlideChange = (index, num) => {
        setProgressWidth(33.3 * (index + 1))
        console.log(index + 1, num)
    }

    const renderItem = ({ item }) => {
        return (
            
        );
    };

    const renderNextButton = () => (
        <View style={[styles.flexClass, { margin: 5, backgroundColor: Color.primary, borderRadius: 6, padding: 15 }]}>
            <Text style={{ fontFamily: FontFamily.interSemiBold, fontSize: FontSizes.md, color: Color.white }} >
                Next
            </Text>
        </View >
    )

    const renderDoneButton = () => (
        <View style={[styles.flexClass, { margin: 5, backgroundColor: Color.primary, borderRadius: 6, padding: 15 }]}>
            <Text style={{ fontFamily: FontFamily.interSemiBold, fontSize: FontSizes.md, color: Color.white }} >
                Done
            </Text>
        </View >
    )

    const renderSkipButton = () => (

        <View style={[styles.flexClass, { margin: 5, backgroundColor: Color.white, borderRadius: 6, padding: 15 }]}
            onTouchEnd={() => {
                setProgressWidth(100);
                if (sliderRef.current) {
                    sliderRef.current.goToSlide(slides.length - 1);
                }
            }}
        >
            <Text style={{ fontFamily: FontFamily.interSemiBold, fontSize: FontSizes.md, color: Color.primary }} >
                Skip
            </Text>
        </View >
    )

    return (
        <>
            <AppIntroSlider
                ref={sliderRef}
                data={slides}
                renderItem={renderItem}
                showNextButton
                showSkipButton
                showDoneButton
                bottomButton
                dotStyle={{ display: 'none' }}
                activeDotStyle={{ display: 'none' }}
                renderNextButton={renderNextButton}
                renderSkipButton={renderSkipButton}
                renderDoneButton={renderDoneButton}
                onDone={() => props.setShowapp(true)}
                onSlideChange={onSlideChange}
            />
        </>
    );
};

export default IntroSlider;

const styles = StyleSheet.create({
    flexOne: {
        flex: 1
    },
    flexClass: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    absoluteImage: {
        position: 'absolute',
        top: 0,
        borderBottomLeftRadius: screenDimensions.width * 0.6, // Use numeric values
        borderBottomRightRadius: screenDimensions.width * 0.6, // Use numeric values
        width: screenDimensions.width, // Set the width and height accordingly
        height: screenDimensions.height * 0.52,
    },
    logoDiv: {
        zIndex: 1000,
        height: screenDimensions.height * 0.52,
        width: screenDimensions.width,
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemText: {
        fontFamily: FontFamily.interRegular,
        fontSize: FontSizes.xl,
        color: Color.black
    },
    itemTitle: {
        fontSize: FontSizes.xxxl,
        fontFamily: FontFamily.semiBold,
        color: Color.black
    },
    progressBar: { position: 'absolute', top: screenDimensions.height * 0.20, backgroundColor: Color.primaryLight, height: 10, width: screenDimensions.width * 0.4, borderRadius: 10 }



});
