export const HOST=import.meta.env.VITE_SERVER_URL


export const AUTH_ROUTES=`api/auth`;
export const SIGNUP_ROUTE=`${AUTH_ROUTES}/signup`
export const LOGIN_ROUTE=`${AUTH_ROUTES}/login`
export const GET_USER_INFO=`${AUTH_ROUTES}/userInfo`
export const SAVE_USER_INFO=`${AUTH_ROUTES}/saveUserInfo`
export const SAVE_USER_IMAGE=`${AUTH_ROUTES}/saveUserImage`
export const LOGOUT_ROUTE=`${AUTH_ROUTES}/logout`

export const CONTACT_ROUTES=`api/contact`
export const SEARCH_CONTACT_ROUTE=`${CONTACT_ROUTES}/searchContacts`
export const GET_DM_CONTACT_ROUTE=`${CONTACT_ROUTES}/getDmContact`

export const MESSAGE_ROUTES=`api/message`
export const GET_MESSAGE_ROUTE=`${MESSAGE_ROUTES}/getMessages`
export const UPLOAD_FILE_ROUTE=`${MESSAGE_ROUTES}/upload-file`