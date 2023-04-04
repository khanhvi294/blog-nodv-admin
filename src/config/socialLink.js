const base_url = process.env.REACT_APP_SERVER_URL + "/oauth2/authorize/";
const redirect_uri = "?redirect_uri=" + process.env.REACT_APP_REDIRECT_URI;
export const FACEBOOK_LOGIN_URL = `${base_url}facebook${redirect_uri}`;
export const GOOGLE_LOGIN_URL = `${base_url}google${redirect_uri}`;
export const GITHUB_LOGIN_URL = `${base_url}github${redirect_uri}`;
