import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { processColor, Text } from 'react-native';

import { GothicBackground } from '../GothicBackground';

describe('GothicBackground', () => {
  it('renders its children on top of the gradient', async () => {
    await render(
      <GothicBackground>
        <Text>content</Text>
      </GothicBackground>
    );

    expect(screen.getByText('content')).toBeTruthy();
  });

  it('renders a dark to wine gradient covering the screen', async () => {
    await render(
      <GothicBackground>
        <Text>content</Text>
      </GothicBackground>
    );

    const gradient = screen.getByTestId('gothic-background-gradient');
    expect(gradient.props.colors).toEqual(
      ['#050505', '#1a0510', '#050505'].map((color) => processColor(color))
    );
  });
});
