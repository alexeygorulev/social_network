import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import LogIn from '../LogIn';

describe('Auth/Login', () => {
  const defaultProps = {
    mounted: true,
  };
  const checkLoginMock = jest.fn();
  const mountMock = jest.fn();
  const unmountMock = jest.fn();

  const setUp = (props = defaultProps) => {
    const { mounted } = props;
    return {
      mounted,
      mount: mountMock,
      unmount: unmountMock,
      values: '',
      onBlur: jest.fn(),
      onChange: jest.fn(),
      checkLogin: checkLoginMock,
      errors: {},
      disabled: false,
    };
  };
  it('snapshot with mounted=false', () => {
    const store = setUp();
    store.mounted = false;
    const wrapper = shallow(<LogIn store={store} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('snapshot with mounted=true', () => {
    const store = setUp();
    const onLogin = true;
    const wrapper = shallow(<LogIn store={store} onLogin={onLogin} />);
    expect(checkLoginMock).not.toHaveBeenCalled();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper.find('button').simulate('click');
    expect(checkLoginMock).toHaveBeenCalled();
  });
});
