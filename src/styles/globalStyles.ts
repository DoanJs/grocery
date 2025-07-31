import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
    },
    center: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    row: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    section: {
        marginBottom: 16,
        paddingHorizontal: 16
    },
});