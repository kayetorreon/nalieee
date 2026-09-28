# Sign in / Sign up (Expo + Firebase)

Drop-in auth screens styled to match the cozy pastel study app (cream, pink, lavender, sage; Nunito / DM Sans / Gaegu).

## 1. Install (inside your Expo project)

```bash
npx expo install firebase @react-native-async-storage/async-storage react-native-svg \
  react-native-safe-area-context expo-font expo-status-bar \
  @expo-google-fonts/nunito @expo-google-fonts/dm-sans @expo-google-fonts/gaegu
```

## 2. Copy files
Copy `firebaseConfig.ts`, `App.tsx` (or merge `AuthGate` into yours) and the `src/` folder into your project root.

## 3. Firebase setup
1. Firebase Console > create a project > **Build > Authentication > Get started > Email/Password > Enable**.
2. Project settings > Your apps > add a **Web app** (`</>`) and copy the config values.
3. Copy `.env.example` to `.env` and paste the values. Restart with `npx expo start -c`.

## Files
- `firebase.ts` - Firebase init with AsyncStorage persistence (stay signed in after app restarts)
- `firebaseConfig.ts` - Re-export of `firebase.ts` for backward compatibility
- `src/context/AuthContext.tsx` - `useAuth()` with `user`, `signIn`, `signUp`, `resetPassword`, `signOut`
- `src/screens/SignInScreen.tsx`, `SignUpScreen.tsx` - the UI
- `src/components/*` - AuthField, PrimaryButton, Icon, Mascot
- `src/theme.ts` - colors and fonts ported from `index.css`

## Notes
- Uses the Firebase JS SDK, so it works in Expo Go with no native config.
- Google / Apple sign-in are not included; they need extra native setup (a dev build).
