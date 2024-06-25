export class StringUtils {
    static formTitleFormat(str: String) {
        str = str.charAt(0).toUpperCase() + str.slice(1);
        str = str.replaceAll('_', ' ');
        return str;
    }
}