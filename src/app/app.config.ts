export class AppConfig {
    public static get SERVER_DEMAIN(): string {
        return "http://localhost:3000/"
    }
    /* Web Server URL */
    public static get SERVER_URLS(): {
        LOGIN: string,
        SIGN_UP: string,
        IS_AUTHENTICATE: string;
        GET_CHAT_ROOMS: string;
        CREATE_CHAT_ROOMS: string;
        GET_USERS: string;
        GET_MESSAGES: string;
        LOGOUT: string;
    } {
        return {
            LOGIN: "user/login",
            SIGN_UP: "user/signup",
            IS_AUTHENTICATE: "user/login",
            GET_CHAT_ROOMS: "chat",
            CREATE_CHAT_ROOMS: "chat",
            GET_USERS: 'user/',
            GET_MESSAGES: 'message',
            LOGOUT: 'user/logout'
        }
    }
    /* Success Messages */
    public static get SUCCESS_MESSAGE(): {
        LOGIN_SUCCESS: string;
        LOGOUT_SUCCESS: string;
    } {
        return {
            LOGIN_SUCCESS: "Login Successfully",
            LOGOUT_SUCCESS: "Logout Successfully"
        }
    }
    /* Error Messages */
    public static get ERROR_MESSAGE(): {
        SEND_MESSAGE_ERROR: string;
        NO_INTERNET_ERROR: string;
        UNKNOWN_ERROR: string;
        INVALID_EMAIL_ERROR: string;
        INVALID_PASSWORD_ERROR: string;
        CONFIRM_PASSWORD_ERROR: string;
    } {
        return {
            SEND_MESSAGE_ERROR: "Error in send message",
            NO_INTERNET_ERROR: "Please check your internet connection.",
            UNKNOWN_ERROR: "Unknown error.",
            INVALID_EMAIL_ERROR: "Please enter a valid email address",
            INVALID_PASSWORD_ERROR: " Password should be greater then 6 character",
            CONFIRM_PASSWORD_ERROR: "Both password should be same"
        }
    }
    /* Validation Regex Messages */
    public static get VALIDATION_REGEX(): {
        EMAIL_REGEX: RegExp,
        PASSWORD_MIN_LENGTH: number
    } {
        return {
            EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            PASSWORD_MIN_LENGTH: 6
        }
    }
}
