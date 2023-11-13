const NAVIGATOR = {
    START: 'NAVIGATOR_START',
    LOGIN: 'NAVIGATOR_LOGIN',
    REALSTATE: 'NAVIGATOR_REALSTATE',
    USER: 'NAVIGATOR_USER',
   };
   const LOGIN_STACK = {
    LOGIN: 'LOGIN',
    GOOGLE_LOGIN: 'GOOGLE_LOGIN',
    REALSTATE_LOGIN: 'REALSTATE_LOGIN',
    REGISTER: 'REGISTER',
    PASSWORD_RECOVERY: 'PASSWORD_RECOVERY',
    EMAIL_SENT: 'EMAIL_SENT',
   };
   const REALSTATE_STACK = {
    HOME: 'HOME',
    EDIT_PROFILE: 'EDIT_PROFILE',
    CREATE: 'CREATE',
    EDIT: 'EDIT'
   };
   const USER_STACK = {
    HOME: 'HOME',
    HOME_FAV: 'HOME_FAV',
    VIEW: 'VIEW',
    SEARCH: 'SEARCH',
    EDIT_PROFILE: 'EDIT_PROFILE',
   };
   export default {
    NAVIGATOR,
    LOGIN_STACK,
    REALSTATE_STACK,
    USER_STACK,
   };