import Cookies from 'js-cookie';
import { COOKIES_CONSTANTS } from '../../constants/cookies.constants';

export function setAuthCookies(id: number,token: string, name: string, email: string, phoneNumber?: string) {
  const options = {
    expires: 1, // 1 day
    secure: true,
    sameSite: 'Strict' as const,
  };

  Cookies.set(COOKIES_CONSTANTS.USER_ID, id.toString(), options);
  Cookies.set(COOKIES_CONSTANTS.TOKEN, token, options);
  Cookies.set(COOKIES_CONSTANTS.USER_NAME, name, options);
  Cookies.set(COOKIES_CONSTANTS.USER_EMAIL, email, options);
  if (phoneNumber) {
    Cookies.set(COOKIES_CONSTANTS.USER_PHONE_NUMBER, phoneNumber, options);
  }
}

export function clearAuthCookies() {
  Object.values(COOKIES_CONSTANTS).forEach((key) => Cookies.remove(key));
}

export function getAuthCookie(key: string): string | undefined {
  return Cookies.get(key);
}
