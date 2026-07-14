import { renderHook, waitFor } from '@testing-library/react-native';
import { Audio } from 'expo-av';

import { useAudioMode } from '../useAudioMode';

const mockedSetAudioModeAsync = Audio.setAudioModeAsync as jest.Mock;

describe('useAudioMode', () => {
  beforeEach(() => {
    mockedSetAudioModeAsync.mockReset();
    mockedSetAudioModeAsync.mockResolvedValue(undefined);
  });

  it('starts as not ready and configures background playback audio mode', async () => {
    const { result } = await renderHook(() => useAudioMode());

    await waitFor(() => {
      expect(result.current.ready).toBe(true);
    });

    expect(mockedSetAudioModeAsync).toHaveBeenCalledWith(
      expect.objectContaining({
        staysActiveInBackground: true,
        playsInSilentModeIOS: true,
      })
    );
  });
});
