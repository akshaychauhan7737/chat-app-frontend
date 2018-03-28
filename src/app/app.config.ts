export class AppConfig {
    public static get SERVER_DEMAIN(): string {
        return "http://localhost:3000/"
    }
    /* Web Server URL */
    public static get SERVER_URLS(): {
        LOGIN: string,
        SIGN_UP: string,
        IS_AUTHENTICATE: string
    } {
        return {
            LOGIN: "user/login",
            SIGN_UP: "user/signup",
            IS_AUTHENTICATE: "user/login"
        }
    }

    /* Success Messages */
    public static get SUCCESS_MESSAGE(): {
        LOGIN_SUCCESS: string
    } {
        return {
            LOGIN_SUCCESS: "Login Successfully"
        }
    }

    /* Success Messages */
    public static get VALIDATION_REGEX(): {
        EMAIL_REGEX: RegExp
    } {
        return {
            EMAIL_REGEX: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        }
    }
}
