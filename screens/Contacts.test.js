import React from 'react';
import renderer from 'react-test-renderer';

import Contacts from './Contacts';

jest.useFakeTimers();

describe('<Contacts/>', () => {
    it('renders correctly', () => {
      const tree = renderer.create(<Contacts/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  