import React from 'react';
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import SignUp from '../SignUp';

describe('Auth/SignUp', () => {
  const defaultProps = {
    mounted: true,
  };
  const addNewUserMock = jest.fn();
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
      addNewUser: addNewUserMock,
      errorLabels: {},
      errors: {},
      disabled: false,
    };
  };
  it('snapshot with mounted=false', () => {
    const store = setUp();
    store.mounted = false;
    const wrapper = shallow(<SignUp store={store} />);
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });

  it('snapshot with mounted=true', () => {
    const store = setUp();
    const onLogin = true;
    const wrapper = shallow(<SignUp store={store} onLogin={onLogin} />);
    expect(addNewUserMock).not.toHaveBeenCalled();
    expect(shallowToJson(wrapper)).toMatchSnapshot();
    wrapper.find('button').simulate('click');
    expect(addNewUserMock).toHaveBeenCalled();
  });
});
