# Blackened Pulse — Radio React

Heavy rock live-stream radio player built with [Expo](https://expo.dev) and [Expo Router](https://docs.expo.dev/router/introduction/), running as a single React Native codebase for iOS, Android and web.

## Getting started

```bash
npm install
npm start
```

From the Expo CLI menu you can open the app in:

- **Expo Go** or a simulator/emulator (`npm run ios` / `npm run android`)
- The browser (`npm run web`), powered by React Native for Web

## Testing

```bash
npm test
```

Tests use `jest-expo` and `@testing-library/react-native`. This project follows TDD — see [CLAUDE.md](CLAUDE.md).

## Project structure

- `app/` — screens and layouts (Expo Router file-based routing)
- `components/` — shared UI components (`GothicBackground`, `SoundWave`)
- `hooks/` — playback and audio-mode logic (`useRadioStream`, `useAudioMode`)
