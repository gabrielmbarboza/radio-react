import { render, screen } from '@testing-library/react-native';
import React from 'react';
import { Text, View } from 'react-native';

describe('test environment', () => {
  it('renders react-native components', async () => {
    await render(
      <View>
        <Text>ok</Text>
      </View>
    );

    expect(screen.getByText('ok')).toBeTruthy();
  });
});
