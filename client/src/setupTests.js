import { configure, shallow, render, mount } from 'enzyme'; /* eslint-disable-line */
import Adapter from 'enzyme-adapter-react-16'; /* eslint-disable-line */
import 'regenerator-runtime/runtime'; /* eslint-disable-line */

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
global.URL.createObjectURL = () => {};

jest.setTimeout(30000);

