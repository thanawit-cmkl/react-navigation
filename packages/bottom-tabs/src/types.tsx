import type * as React from 'react';
import type {
  Animated,
  TouchableWithoutFeedbackProps,
  StyleProp,
  TextStyle,
  ViewStyle,
  GestureResponderEvent,
} from 'react-native';
import type {
  NavigationHelpers,
  NavigationProp,
  ParamListBase,
  Descriptor,
  TabNavigationState,
  TabActionHelpers,
  RouteProp,
} from '@react-navigation/native';
import type { EdgeInsets } from 'react-native-safe-area-context';
import type { HeaderOptions } from '@react-navigation/elements';

export type Layout = { width: number; height: number };

export type BottomTabNavigationEventMap = {
  /**
   * Event which fires on tapping on the tab in the tab bar.
   */
  tabPress: { data: undefined; canPreventDefault: true };
  /**
   * Event which fires on long press on the tab in the tab bar.
   */
  tabLongPress: { data: undefined };
};

export type LabelPosition = 'beside-icon' | 'below-icon';

export type BottomTabNavigationHelpers = NavigationHelpers<
  ParamListBase,
  BottomTabNavigationEventMap
> &
  TabActionHelpers<ParamListBase>;

export type BottomTabNavigationProp<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = keyof ParamList
> = NavigationProp<
  ParamList,
  RouteName,
  TabNavigationState<ParamList>,
  BottomTabNavigationOptions,
  BottomTabNavigationEventMap
> &
  TabActionHelpers<ParamList>;

export type BottomTabScreenProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = keyof ParamList
> = {
  navigation: BottomTabNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
};

export type TimingKeyboardAnimationConfig = {
  animation: 'timing';
  config?: Omit<
    Partial<Animated.TimingAnimationConfig>,
    'toValue' | 'useNativeDriver'
  >;
};

export type SpringKeyboardAnimationConfig = {
  animation: 'spring';
  config?: Omit<
    Partial<Animated.SpringAnimationConfig>,
    'toValue' | 'useNativeDriver'
  >;
};

export type TabBarVisibilityAnimationConfig =
  | TimingKeyboardAnimationConfig
  | SpringKeyboardAnimationConfig;

export type BottomTabNavigationOptions = HeaderOptions & {
  /**
   * Title text for the screen.
   */
  title?: string;

  /**
   * Whether this screens should render the first time it's accessed. Defaults to `true`.
   * Set it to `false` if you want to render the screen on initial render.
   */
  lazy?: boolean;

  /**
   * Function that given returns a React Element to display as a header.
   */
  header?: (props: BottomTabHeaderProps) => React.ReactNode;

  /**
   * Whether to show the header. Setting this to `false` hides the header.
   * Defaults to `true`.
   */
  headerShown?: boolean;

  /**
   * Title string of a tab displayed in the tab bar
   * or a function that given { focused: boolean, color: string, position: 'below-icon' | 'beside-icon' } returns a React.Node to display in tab bar.
   *
   * When undefined, scene title is used. Use `tabBarShowLabel` to hide the label.
   */
  tabBarLabel?:
    | string
    | ((props: {
        focused: boolean;
        color: string;
        position: LabelPosition;
      }) => React.ReactNode);

  /**
   * A function that given { focused: boolean, color: string } returns a React.Node to display in the tab bar.
   */
  tabBarIcon?: (props: {
    focused: boolean;
    color: string;
    size: number;
  }) => React.ReactNode;

  /**
   * Text to show in a badge on the tab icon.
   */
  tabBarBadge?: number | string;

  /**
   * Custom style for the tab bar badge.
   * You can specify a background color or text color here.
   */
  tabBarBadgeStyle?: StyleProp<TextStyle>;

  /**
   * Accessibility label for the tab button. This is read by the screen reader when the user taps the tab.
   * It's recommended to set this if you don't have a label for the tab.
   */
  tabBarAccessibilityLabel?: string;

  /**
   * ID to locate this tab button in tests.
   */
  tabBarTestID?: string;

  /**
   * Animation config for showing and hiding the tab bar.
   */
  tabBarVisibilityAnimationConfig?: {
    show?: TabBarVisibilityAnimationConfig;
    hide?: TabBarVisibilityAnimationConfig;
  };

  /**
   * Function which returns a React element to render as the tab bar button.
   * Renders `TouchableWithoutFeedback` by default.
   */
  tabBarButton?: (props: BottomTabBarButtonProps) => React.ReactNode;

  /**
   * Color for the icon and label in the active tab.
   */
  tabBarActiveTintColor?: string;

  /**
   * Color for the icon and label in the inactive tabs.
   */
  tabBarInactiveTintColor?: string;

  /**
   * Background color for the active tab.
   */
  tabBarActiveBackgroundColor?: string;

  /**
   * background color for the inactive tabs.
   */
  tabBarInactiveBackgroundColor?: string;

  /**
   * Whether label font should scale to respect Text Size accessibility settings.
   */
  tabBarAllowFontScaling?: boolean;

  /**
   * Whether the tab label should be visible. Defaults to `true`.
   */
  tabBarShowLabel?: boolean;

  /**
   * Style object for the tab label.
   */
  tabBarLabelStyle?: StyleProp<TextStyle>;

  /**
   * Style object for the tab icon.
   */
  tabBarIconStyle?: StyleProp<TextStyle>;

  /**
   * Style object for the tab item container.
   */
  tabBarItemStyle?: StyleProp<ViewStyle>;

  /**
   * Whether the label is rendered below the icon or beside the icon.
   * By default, the position is chosen automatically based on device width.
   * In `below-icon` orientation (typical for iPhones), the label is rendered below and in `beside-icon` orientation, it's rendered beside (typical for iPad).
   */
  tabBarLabelPosition?: LabelPosition;

  /**
   * Whether the label position should adapt to the orientation.
   */
  tabBarAdaptive?: boolean;

  /**
   * Whether the tab bar gets hidden when the keyboard is shown. Defaults to `false`.
   */
  tabBarHideOnKeyboard?: boolean;

  /**
   * Style object for the tab bar container.
   */
  tabBarStyle?: Animated.WithAnimatedValue<StyleProp<ViewStyle>>;

  /**
   * Whether this screen should be unmounted when navigating away from it.
   * Defaults to `false`.
   */
  unmountOnBlur?: boolean;
};

export type BottomTabDescriptor = Descriptor<
  BottomTabNavigationOptions,
  BottomTabNavigationProp<ParamListBase>,
  RouteProp<ParamListBase>
>;

export type BottomTabDescriptorMap = Record<string, BottomTabDescriptor>;

export type BottomTabNavigationConfig = {
  /**
   * Function that returns a React element to display as the tab bar.
   */
  tabBar?: (props: BottomTabBarProps) => React.ReactNode;
  /**
   * Safe area insets for the tab bar. This is used to avoid elements like the navigation bar on Android and bottom safe area on iOS.
   * By default, the device's safe area insets are automatically detected. You can override the behavior with this option.
   */
  safeAreaInsets?: {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  };
  /**
   * Whether inactive screens should be detached from the view hierarchy to save memory.
   * Make sure to call `enableScreens` from `react-native-screens` to make it work.
   * Defaults to `true` on Android.
   */
  detachInactiveScreens?: boolean;
  /**
   * Style object for the component wrapping the screen content.
   */
  sceneContainerStyle?: StyleProp<ViewStyle>;
};

export type BottomTabHeaderProps = {
  /**
   * Layout of the screen.
   */
  layout: Layout;
  /**
   * Options for the current screen.
   */
  options: BottomTabNavigationOptions;
  /**
   * Route object for the current screen.
   */
  route: RouteProp<ParamListBase>;
  /**
   * Navigation prop for the header.
   */
  navigation: BottomTabNavigationProp<ParamListBase>;
};

export type BottomTabBarProps = {
  state: TabNavigationState<ParamListBase>;
  descriptors: BottomTabDescriptorMap;
  navigation: NavigationHelpers<ParamListBase, BottomTabNavigationEventMap>;
  insets: EdgeInsets;
};

export type BottomTabBarButtonProps = Omit<
  TouchableWithoutFeedbackProps,
  'onPress'
> & {
  to?: string;
  children: React.ReactNode;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
  ) => void;
};
