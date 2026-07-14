import { act, renderHook } from '@testing-library/react-native';
import { Audio } from 'expo-av';

import { useRadioStream } from '../useRadioStream';

const mockedCreateAsync = Audio.Sound.createAsync as jest.Mock;

describe('useRadioStream', () => {
  beforeEach(() => {
    mockedCreateAsync.mockReset();
  });

  it('starts with playing, loading and error all cleared', async () => {
    const { result } = await renderHook(() => useRadioStream());

    expect(result.current.playing).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('creates the sound and starts playing on first toggle', async () => {
    const playAsync = jest.fn().mockResolvedValue(undefined);
    const pauseAsync = jest.fn().mockResolvedValue(undefined);
    mockedCreateAsync.mockResolvedValue({
      sound: { playAsync, pauseAsync, unloadAsync: jest.fn() },
    });

    const { result } = await renderHook(() => useRadioStream());

    await act(async () => {
      await result.current.togglePlayback();
    });

    expect(mockedCreateAsync).toHaveBeenCalledTimes(1);
    expect(result.current.playing).toBe(true);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('sets an error and keeps playing false when the stream fails to connect', async () => {
    mockedCreateAsync.mockRejectedValue(new Error('network down'));

    const { result } = await renderHook(() => useRadioStream());

    await act(async () => {
      await result.current.togglePlayback();
    });

    expect(result.current.playing).toBe(false);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe('Não foi possível conectar à rádio.');
  });

  it('pauses on the second toggle without recreating the sound', async () => {
    const playAsync = jest.fn().mockResolvedValue(undefined);
    const pauseAsync = jest.fn().mockResolvedValue(undefined);
    mockedCreateAsync.mockResolvedValue({
      sound: { playAsync, pauseAsync, unloadAsync: jest.fn() },
    });

    const { result } = await renderHook(() => useRadioStream());

    await act(async () => {
      await result.current.togglePlayback();
    });
    await act(async () => {
      await result.current.togglePlayback();
    });

    expect(mockedCreateAsync).toHaveBeenCalledTimes(1);
    expect(pauseAsync).toHaveBeenCalledTimes(1);
    expect(result.current.playing).toBe(false);
  });
});
