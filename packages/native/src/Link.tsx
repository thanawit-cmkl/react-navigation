import * as React from 'react';
import { Text, TextProps, GestureResponderEvent, Platform } from 'react-native';
import type { NavigationAction } from '@react-navigation/core';
import useLinkProps from './useLinkProps';
import type { To } from './useLinkTo';

type Props = {
  to: To;
  action?: NavigationAction;
  target?: string;
  onPress?: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
  ) => void;
} & (TextProps & { children: React.ReactNode });

/**
 * Component to render link to another screen using a path.
 * Uses an anchor tag on the web.
 *
 * @param props.to Absolute path to screen (e.g. `/feeds/hot`).
 * @param props.action Optional action to use for in-page navigation. By default, the path is parsed to an action based on linking config.
 * @param props.children Child elements to render the content.
 */
export default function Link({ to, action, ...rest }: Props) {
  const props = useLinkProps({ to, action });

  const onPress = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent> | GestureResponderEvent
  ) => {
    if ('onPress' in rest) {
      rest.onPress?.(e);
    }

    props.onPress(e);
  };

  return React.createElement(Text, {
    ...props,
    ...rest,
    ...Platform.select({
      web: { onClick: onPress } as any,
      default: { onPress },
    }),
  });
}
