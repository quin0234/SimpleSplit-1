import { AsyncStorage } from 'react-native';

const HAS_LAUNCHED = 'hasLaunched';
const TRUE = 'true';
const FALSE = 'false';

export function setAppLaunched() {
    AsyncStorage.setItem(HAS_LAUNCHED, TRUE);
}
export function setAppNotLaunched() {
    AsyncStorage.setItem(HAS_LAUNCHED, FALSE);
}

export default async function isFirstLaunch() {
    try {
        const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);

        if (hasLaunched === TRUE) {
            return false;
        }

        return true;

    } catch (error) {
        return false;
    }
}