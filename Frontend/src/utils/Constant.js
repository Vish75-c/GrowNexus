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
export const GET_ALL_CONTACTS_ROUTE=`${CONTACT_ROUTES}/getAllContact`


export const MESSAGE_ROUTES=`api/message`
export const GET_MESSAGE_ROUTE=`${MESSAGE_ROUTES}/getMessages`
export const UPLOAD_FILE_ROUTE=`${MESSAGE_ROUTES}/upload-file`


export const CHANNEL_ROUTES='api/channel'
export const CREATE_CHANNEL_ROUTE=`${CHANNEL_ROUTES}/createChannel`
export const GET_ALL_CHANNEL_ROUTE=`${CHANNEL_ROUTES}/getAllChannel`
export const GET_CHANNEL_MESSAGE=`${CHANNEL_ROUTES}/getChannelMessages`


export const HIRING_ROUTES='api/hiring'
export const GET_HIRING_INFO=`${HIRING_ROUTES}/analyze`
export const POST_HIRING_INTO=`${HIRING_ROUTES}/create`
export const GET_HIRING_POST=`${HIRING_ROUTES}/getHiringpost`

export const BLOG_ROUTES='api/blog'
export const GET_ALL_BLOG_ROUTE=`${BLOG_ROUTES}/all-blogs`;
export const CREATE_BLOG_ROUTE=`${BLOG_ROUTES}/create-blog`
export const MY_BLOG_POST_ROUTE=`${BLOG_ROUTES}/my-post`
