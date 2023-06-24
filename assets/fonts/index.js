import { Platform } from "react-native";

const font_android = {

    Light: 'Avenir LT Std 35 Light',
    BookOblique: 'Avenir LT Std 45 Book Oblique',
    Book: 'Avenir LT Std 45 Book',
    Oblique: 'Avenir LT Std 55 Oblique',
    Roman: 'Avenir LT Std 55 Roman',
    Medium: 'Avenir LT Std 65 Medium',
    HeavyOblique: 'Avenir LT Std 85 Heavy Oblique',
    Heavy: 'Avenir LT Std 85 Heavy',
    BlackOblique: 'Avenir LT Std 95 Black Oblique',
    Black: 'Avenir LT Std 95 Black',
}
const font_ios = {
    Light: 'Avenir LT Std 35 Light',
    BookOblique: 'Avenir LT Std 45 Book Oblique',
    Book: 'Avenir LT Std 45 Book',
    Oblique: 'Avenir LT Std 55 Oblique',
    Roman: 'Avenir LT Std 55 Roman',
    Medium: 'Avenir LT Std 65 Medium',
    HeavyOblique: 'Avenir LT Std 85 Heavy Oblique',
    Heavy: 'Avenir LT Std 85 Heavy',
    BlackOblique: 'Avenir LT Std 95 Black Oblique',
    Black: 'Avenir LT Std 95 Black',
}
const Fonts = Platform.select({
    ios: font_ios,
    android: font_android
})
export default Fonts