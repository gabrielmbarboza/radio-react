import { fireEvent, render, screen } from '@testing-library/react-native';
import { Audio } from 'expo-av';
import React from 'react';

import PlayerScreen from '../index';

const mockedCreateAsync = Audio.Sound.createAsync as jest.Mock;

describe('PlayerScreen', () => {
  beforeEach(() => {
    mockedCreateAsync.mockReset();
  });

  it('shows the radio title and standby status before playing', async () => {
    await render(<PlayerScreen />);

    expect(screen.getByText('Blackened Pulse')).toBeTruthy();
    expect(screen.getByText('On standby')).toBeTruthy();
    expect(screen.getByText('▶')).toBeTruthy();
  });

  it('switches to the live status and pause icon after pressing play', async () => {
    mockedCreateAsync.mockResolvedValue({
      sound: { playAsync: jest.fn(), pauseAsync: jest.fn(), unloadAsync: jest.fn() },
    });

    await render(<PlayerScreen />);

    await fireEvent.press(screen.getByText('▶'));

    expect(await screen.findByText('Live now')).toBeTruthy();
    expect(screen.getByText('❚❚')).toBeTruthy();
  });
});
