import { render } from '@testing-library/react-native';
import React from 'react';
import { Animated } from 'react-native';

import { SoundWave } from '../SoundWave';

describe('SoundWave', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('does not animate the bars when not playing', async () => {
    const loopSpy = jest.spyOn(Animated, 'loop');

    await render(<SoundWave playing={false} />);

    expect(loopSpy).not.toHaveBeenCalled();
    loopSpy.mockRestore();
  });

  it('starts a looping animation for each bar when playing', async () => {
    const loopSpy = jest.spyOn(Animated, 'loop');

    await render(<SoundWave playing />);

    expect(loopSpy).toHaveBeenCalledTimes(5);
    loopSpy.mockRestore();
  });

  it('stops the running animations when playback stops', async () => {
    const loopSpy = jest.spyOn(Animated, 'loop');

    const { rerender } = await render(<SoundWave playing />);
    const stopSpies = loopSpy.mock.results.map((result) => jest.spyOn(result.value, 'stop'));

    await rerender(<SoundWave playing={false} />);

    stopSpies.forEach((stopSpy) => expect(stopSpy).toHaveBeenCalled());
    loopSpy.mockRestore();
  });
});
