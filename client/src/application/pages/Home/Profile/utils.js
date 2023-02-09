import jwtDecode from 'jwt-decode';
import Cookies from 'react-cookie/cjs/Cookies';

export function checkByMyselfProfile(location) {
  const cookie = new Cookies();
  const token = cookie.get('token');
  const { id } = jwtDecode(token);
  return id === location.split('=')[1];
}
