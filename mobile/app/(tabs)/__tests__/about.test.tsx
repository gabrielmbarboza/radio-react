import { render, screen } from '@testing-library/react-native';
import React from 'react';

import AboutScreen from '../about';

describe('AboutScreen', () => {
  it('shows the radio name and genre/stream info', async () => {
    await render(<AboutScreen />);

    expect(screen.getByText('Blackened Pulse')).toBeTruthy();
    expect(screen.getByText('Heavy Rock')).toBeTruthy();
    expect(screen.getByText('24/7')).toBeTruthy();
  });
});
