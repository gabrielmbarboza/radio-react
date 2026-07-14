jest.mock('expo-av', () => ({
  Audio: {
    setAudioModeAsync: jest.fn().mockResolvedValue(undefined),
    Sound: {
      createAsync: jest.fn(),
    },
  },
  InterruptionModeAndroid: { DuckOthers: 1 },
  InterruptionModeIOS: { DuckOthers: 1 },
}));
