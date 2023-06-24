import { StyleSheet } from "react-native";

// Files
import colors from "../../assets/colors";

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'flex-start',
    },
    innerContainer: {
        width: '100%',
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        marginTop: 25
    },
    bottomRightCorner: {
        width: 238,
        height: 200,
        marginTop: 'auto',
        marginLeft: 'auto'
    }
})


export default styles;