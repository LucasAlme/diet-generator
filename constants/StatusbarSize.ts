import { NativeModules, Platform } from "react-native";
const { StatusBarManager } = NativeModules;

export const STATUSBAR_HEIGHT =
  Platform.OS === "ios"
    ? StatusBarManager.getHeight()
    : StatusBarManager.HEIGHT;
