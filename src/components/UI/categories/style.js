import { StyleSheet } from 'react-native';

export const underlayColor = "#EEE";

// the opacity on PRESS
export const clickOpacity = 0.75;

const button = {
    minHeight: "auto",
    height: "auto",
    maxHeight: "auto",
    width: "auto",
    minWidth: "auto",
    maxWidth: 100,
    padding: 5,
    margin: 5,
    borderRadius: 10,
    borderColor: "#FFF",
    borderStyle: "auto",
    borderWidth: "auto",
    backgroundColor: "#FFF",
    /* Opacity for selecting and deselecting a category */
    pressed: {
        opacity: 1
    },
    inactive: {
        opacity: 0.6,
    },
    disabled: {
        backgroundColor: "#ccc"
    }
};

export const categoryTheme = StyleSheet.create({
    'button': {
        display: "flex",
        backgroundColor: button.backgroundColor,
        maxWidth: button.maxWidth,
        borderRadius: button.borderRadius,
        padding: button.padding,
        margin: button.margin,
        opacity: button.inactive.opacity,
        flex: 0,
    },
    'pressed': {
        display: "flex",
        backgroundColor: button.backgroundColor,
        maxWidth: button.maxWidth,
        borderRadius: button.borderRadius,
        padding: button.padding,
        margin: button.margin,
        opacity: button.pressed.opacity,
        flex: 0,
    },
    'disabled': {
        display: "flex",
        backgroundColor: button.disabled.backgroundColor,
        maxWidth: button.maxWidth,
        borderRadius: button.borderRadius,
        padding: button.padding,
        margin: button.margin,
        opacity: button.inactive.opacity,
        flex: 0,
    },
    'text': {
        alignSelf: "center",
    },
    'group': {
        justifyContent: "center",
        flexDirection:"row",
        flexWrap:"wrap",
        padding: 10,
        flex: 0,
    },
    'icon': {
        alignSelf: "center",
    }
});

export const colorTheme = StyleSheet.create({
    "Green": {
        backgroundColor: "#46B6AC",
    },
    "Pink": {
        backgroundColor: "#F26091"
    },
    "Purple": {
        backgroundColor: "#BA65C9"
    },
    "Yellow": {
        backgroundColor: "#FFCA00"
    },
    "Grass": {
        backgroundColor: "#7EC880"
    },
    "Red": {
        backgroundColor: "#E77271"
    },
    "Blue": {
        backgroundColor: "#7884CE"
    },
    "Cyan": {
        backgroundColor: "#45D0E4"
    },
    "Orange": {
        backgroundColor: "#FBA900"
    },
    "Magenta": {
        backgroundColor: "#f49ac2"
    },
    "Grey": {
        backgroundColor: "#AAA"
    }
});