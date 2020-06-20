/** @jsx jsx */
import {
  Component,
  MouseEventHandler,
  ReactNode,
  Ref,
  RefCallback,
} from 'react';
import { jsx } from '@emotion/core';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import {
  animatedScrollTo,
  getBoundingClientObj,
  RectType,
  getScrollParent,
  getScrollTop,
  scrollTo,
} from '../utils';
import {
  MenuPlacement,
  MenuPosition,
  CommonProps,
  OptionTypeBase,
  GroupTypeBase,
  CSSPropertiesWithLabel,
} from '../types';
import { Theme } from '../types';

// ==============================
// Menu
// ==============================

// Get Menu Placement
// ------------------------------

interface MenuState {
  placement: 'top' | 'bottom' | null;
  maxHeight: number;
}
interface PlacementArgs {
  maxHeight: number;
  menuEl: HTMLDivElement | null;
  minHeight: number;
  placement: MenuPlacement;
  shouldScroll: boolean;
  isFixedPosition: boolean;
  theme: Theme;
}

export function getMenuPlacement({
  maxHeight,
  menuEl,
  minHeight,
  placement,
  shouldScroll,
  isFixedPosition,
  theme,
}: PlacementArgs): MenuState {
  const { spacing } = theme;
  const scrollParent = getScrollParent(menuEl!);
  const defaultState: MenuState = { placement: 'bottom', maxHeight };

  // something went wrong, return default state
  if (!menuEl || !menuEl.offsetParent) return defaultState;

  // we can't trust `scrollParent.scrollHeight` --> it may increase when
  // the menu is rendered
  const { height: scrollHeight } = scrollParent.getBoundingClientRect();
  const {
    bottom: menuBottom,
    height: menuHeight,
    top: menuTop,
  } = menuEl.getBoundingClientRect();

  const { top: containerTop } = menuEl.offsetParent.getBoundingClientRect();
  const viewHeight = window.innerHeight;
  const scrollTop = getScrollTop(scrollParent);

  const marginBottom = parseInt(getComputedStyle(menuEl).marginBottom, 10);
  const marginTop = parseInt(getComputedStyle(menuEl).marginTop, 10);
  const viewSpaceAbove = containerTop - marginTop;
  const viewSpaceBelow = viewHeight - menuTop;
  const scrollSpaceAbove = viewSpaceAbove + scrollTop;
  const scrollSpaceBelow = scrollHeight - scrollTop - menuTop;

  const scrollDown = menuBottom - viewHeight + scrollTop + marginBottom;
  const scrollUp = scrollTop + menuTop - marginTop;
  const scrollDuration = 160;

  switch (placement) {
    case 'auto':
    case 'bottom':
      // 1: the menu will fit, do nothing
      if (viewSpaceBelow >= menuHeight) {
        return { placement: 'bottom', maxHeight };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceBelow >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        return { placement: 'bottom', maxHeight };
      }

      // 3: the menu will fit, if constrained
      if (
        (!isFixedPosition && scrollSpaceBelow >= minHeight) ||
        (isFixedPosition && viewSpaceBelow >= minHeight)
      ) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollDown, scrollDuration);
        }

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        const constrainedHeight = isFixedPosition
          ? viewSpaceBelow - marginBottom
          : scrollSpaceBelow - marginBottom;

        return {
          placement: 'bottom',
          maxHeight: constrainedHeight,
        };
      }

      // 4. Forked beviour when there isn't enough space below

      // AUTO: flip the menu, render above
      if (placement === 'auto' || isFixedPosition) {
        // may need to be constrained after flipping
        let constrainedHeight = maxHeight;
        const spaceAbove = isFixedPosition ? viewSpaceAbove : scrollSpaceAbove;

        if (spaceAbove >= minHeight) {
          constrainedHeight = Math.min(
            spaceAbove - marginBottom - spacing.controlHeight,
            maxHeight
          );
        }

        return { placement: 'top', maxHeight: constrainedHeight };
      }

      // BOTTOM: allow browser to increase scrollable area and immediately set scroll
      if (placement === 'bottom') {
        scrollTo(scrollParent, scrollDown);
        return { placement: 'bottom', maxHeight };
      }
      break;
    case 'top':
      // 1: the menu will fit, do nothing
      if (viewSpaceAbove >= menuHeight) {
        return { placement: 'top', maxHeight };
      }

      // 2: the menu will fit, if scrolled
      if (scrollSpaceAbove >= menuHeight && !isFixedPosition) {
        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }

        return { placement: 'top', maxHeight };
      }

      // 3: the menu will fit, if constrained
      if (
        (!isFixedPosition && scrollSpaceAbove >= minHeight) ||
        (isFixedPosition && viewSpaceAbove >= minHeight)
      ) {
        let constrainedHeight = maxHeight;

        // we want to provide as much of the menu as possible to the user,
        // so give them whatever is available below rather than the minHeight.
        if (
          (!isFixedPosition && scrollSpaceAbove >= minHeight) ||
          (isFixedPosition && viewSpaceAbove >= minHeight)
        ) {
          constrainedHeight = isFixedPosition
            ? viewSpaceAbove - marginTop
            : scrollSpaceAbove - marginTop;
        }

        if (shouldScroll) {
          animatedScrollTo(scrollParent, scrollUp, scrollDuration);
        }

        return {
          placement: 'top',
          maxHeight: constrainedHeight,
        };
      }

      // 4. not enough space, the browser WILL NOT increase scrollable area when
      // absolutely positioned element rendered above the viewport (only below).
      // Flip the menu, render below
      return { placement: 'bottom', maxHeight };
    default:
      throw new Error(`Invalid placement provided "${placement}".`);
  }

  // fulfil contract with flow: implicit return value of undefined
  return defaultState;
}

// Menu Component
// ------------------------------

export interface MenuClassNamesState {
  menu: true;
}

export interface MenuPlacementProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends CommonProps<OptionType, GroupType, IsMultiType> {
  /** Set the minimum height of the menu. */
  minMenuHeight: number;
  /** Set the maximum height of the menu. */
  maxMenuHeight: number;
  /** Set whether the menu should be at the top, at the bottom. The auto options sets it to bottom. */
  menuPlacement: MenuPlacement;
  /** The CSS position value of the menu, when "fixed" extra layout management is required */
  menuPosition: MenuPosition;
  /** Set whether the page should scroll to show the menu. */
  menuShouldScrollIntoView: boolean;
  // /** Callback to update the portal after possible flip. */
  // getPortalPlacement: MenuState => void,
  // /** Props to be passed to the menu wrapper. */
  // innerProps: {},
}

export interface MenuProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends MenuPlacementProps<OptionType, GroupType, IsMultiType> {
  className?: string;
  /** Reference to the internal element, consumed by the MenuPlacer component */
  innerRef: Ref<HTMLDivElement>;
  innerProps: {
    onMouseDown: MouseEventHandler<HTMLDivElement>;
    onMouseMove: MouseEventHandler<HTMLDivElement>;
  };
  isLoading: boolean;
  placement: 'top' | 'bottom';
  /** The children to be rendered. */
  children: ReactNode;
}

interface PlacerProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends MenuPlacerProps<OptionType, GroupType, IsMultiType> {
  placement: 'top' | 'bottom';
  maxHeight: number;
}

interface ChildrenProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> {
  ref: Ref<HTMLDivElement>;
  placerProps: PlacerProps<OptionType, GroupType, IsMultiType>;
}

export interface MenuPlacerProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends MenuPlacementProps<OptionType, GroupType, IsMultiType> {
  /** The children to be rendered. */
  children: (
    childrenProps: ChildrenProps<OptionType, GroupType, IsMultiType>
  ) => ReactNode;
}

function alignToControl(placement: 'top' | 'bottom') {
  const placementToCSSProp = { bottom: 'top', top: 'bottom' };
  return placement ? placementToCSSProp[placement] : 'bottom';
}
const coercePlacement = (p: MenuPlacement) => (p === 'auto' ? 'bottom' : p);

export const menuCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  placement,
  theme: { borderRadius, spacing, colors },
}: MenuProps<OptionType, GroupType, IsMultiType>): CSSPropertiesWithLabel => ({
  label: 'menu',
  [alignToControl(placement)]: '100%',
  backgroundColor: colors.neutral0,
  borderRadius: borderRadius,
  boxShadow: '0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1)',
  marginBottom: spacing.menuGutter,
  marginTop: spacing.menuGutter,
  position: 'absolute',
  width: '100%',
  zIndex: 1,
});

// NOTE: internal only
export class MenuPlacer<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<
  MenuPlacerProps<OptionType, GroupType, IsMultiType>,
  MenuState
> {
  state: MenuState = {
    maxHeight: this.props.maxMenuHeight,
    placement: null,
  };
  static contextTypes = {
    getPortalPlacement: PropTypes.func,
  };
  getPlacement: RefCallback<HTMLDivElement> = (ref) => {
    const {
      minMenuHeight,
      maxMenuHeight,
      menuPlacement,
      menuPosition,
      menuShouldScrollIntoView,
      theme,
    } = this.props;
    const { getPortalPlacement } = this.context;

    if (!ref) return;

    // DO NOT scroll if position is fixed
    const isFixedPosition = menuPosition === 'fixed';
    const shouldScroll = menuShouldScrollIntoView && !isFixedPosition;

    const state = getMenuPlacement({
      maxHeight: maxMenuHeight,
      menuEl: ref,
      minHeight: minMenuHeight,
      placement: menuPlacement,
      shouldScroll,
      isFixedPosition,
      theme,
    });

    if (getPortalPlacement) getPortalPlacement(state);

    this.setState(state);
  };
  getUpdatedProps = () => {
    const { menuPlacement } = this.props;
    const placement = this.state.placement || coercePlacement(menuPlacement);

    return { ...this.props, placement, maxHeight: this.state.maxHeight };
  };
  render() {
    const { children } = this.props;

    return children({
      ref: this.getPlacement,
      placerProps: this.getUpdatedProps(),
    });
  }
}

const Menu = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: MenuProps<OptionType, GroupType, IsMultiType>
) => {
  const { children, className, cx, getStyles, innerRef, innerProps } = props;

  return (
    <div
      css={getStyles('menu', props)}
      className={cx({ menu: true }, className)}
      {...innerProps}
      ref={innerRef}
    >
      {children}
    </div>
  );
};

export default Menu;

// ==============================
// Menu List
// ==============================

export interface MenuListClassNamesState {
  'menu-list': true;
  'menu-list--is-multi': boolean;
}

export interface MenuListProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends CommonProps<OptionType, GroupType, IsMultiType> {
  className?: string;
  /** Inner ref to DOM Node */
  innerRef: RefCallback<HTMLDivElement>;
  isLoading: boolean;
  /** Set the max height of the Menu component. */
  maxHeight: number;
  /** The children to be rendered. */
  children: ReactNode;
}

export const menuListCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  maxHeight,
  theme: {
    spacing: { baseUnit },
  },
}: MenuListProps<
  OptionType,
  GroupType,
  IsMultiType
>): CSSPropertiesWithLabel => ({
  maxHeight,
  overflowY: 'auto',
  paddingBottom: baseUnit,
  paddingTop: baseUnit,
  position: 'relative', // required for offset[Height, Top] > keyboard scroll
  WebkitOverflowScrolling: 'touch',
});

export const MenuList = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: MenuListProps<OptionType, GroupType, IsMultiType>
) => {
  const { children, className, cx, getStyles, isMulti, innerRef } = props;
  return (
    <div
      css={getStyles('menuList', props)}
      className={cx(
        {
          'menu-list': true,
          'menu-list--is-multi': isMulti,
        },
        className
      )}
      ref={innerRef}
    >
      {children}
    </div>
  );
};

// ==============================
// Menu Notices
// ==============================

export interface NoOptionsMessageClassNamesState {
  'menu-notice': true;
  'menu-notice--no-options': true;
}

const noticeCSS = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>({
  theme: {
    spacing: { baseUnit },
    colors,
  },
}: NoticeProps<
  OptionType,
  GroupType,
  IsMultiType
>): CSSPropertiesWithLabel => ({
  color: colors.neutral40,
  padding: `${baseUnit * 2}px ${baseUnit * 3}px`,
  textAlign: 'center',
});
export const noOptionsMessageCSS = noticeCSS;
export const loadingMessageCSS = noticeCSS;

export interface NoticeProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends CommonProps<OptionType, GroupType, IsMultiType> {
  className?: string;
  innerProps?: {};
  /** The children to be rendered. */
  children: ReactNode;
}

export const NoOptionsMessage = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: NoticeProps<OptionType, GroupType, IsMultiType>
) => {
  const { children, className, cx, getStyles, innerProps } = props;
  return (
    <div
      css={getStyles('noOptionsMessage', props)}
      className={cx(
        {
          'menu-notice': true,
          'menu-notice--no-options': true,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

NoOptionsMessage.defaultProps = {
  children: 'No options',
};

export interface LoadingMessageClassNamesState {
  'menu-notice': true;
  'menu-notice--loading': true;
}

export const LoadingMessage = <
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
>(
  props: NoticeProps<OptionType, GroupType, IsMultiType>
) => {
  const { children, className, cx, getStyles, innerProps } = props;
  return (
    <div
      css={getStyles('loadingMessage', props)}
      className={cx(
        {
          'menu-notice': true,
          'menu-notice--loading': true,
        },
        className
      )}
      {...innerProps}
    >
      {children}
    </div>
  );
};

LoadingMessage.defaultProps = {
  children: 'Loading...',
};

// ==============================
// Menu Portal
// ==============================

export interface MenuPortalProps<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends CommonProps<OptionType, GroupType, IsMultiType> {
  appendTo: HTMLElement;
  controlElement: HTMLElement;
  menuPlacement: MenuPlacement;
  menuPosition: MenuPosition;
  children: ReactNode; // ideally Menu<MenuProps>
}

interface MenuPortalState {
  placement: 'bottom' | 'top' | null;
}

export interface PortalStyleArgs {
  offset: number;
  position: MenuPosition;
  rect: RectType;
}

export const menuPortalCSS = ({
  rect,
  offset,
  position,
}: PortalStyleArgs): CSSPropertiesWithLabel => ({
  left: rect.left,
  position: position,
  top: offset,
  width: rect.width,
  zIndex: 1,
});

export class MenuPortal<
  OptionType extends OptionTypeBase,
  GroupType extends GroupTypeBase<OptionType>,
  IsMultiType extends boolean
> extends Component<
  MenuPortalProps<OptionType, GroupType, IsMultiType>,
  MenuPortalState
> {
  state: MenuPortalState = { placement: null };
  static childContextTypes = {
    getPortalPlacement: PropTypes.func,
  };
  getChildContext() {
    return {
      getPortalPlacement: this.getPortalPlacement,
    };
  }

  // callback for occassions where the menu must "flip"
  getPortalPlacement = ({ placement }: MenuState) => {
    const initialPlacement = coercePlacement(this.props.menuPlacement);

    // avoid re-renders if the placement has not changed
    if (placement !== initialPlacement) {
      this.setState({ placement });
    }
  };
  render() {
    const {
      appendTo,
      children,
      controlElement,
      menuPlacement,
      menuPosition: position,
      getStyles,
    } = this.props;
    const isFixed = position === 'fixed';

    // bail early if required elements aren't present
    if ((!appendTo && !isFixed) || !controlElement) {
      return null;
    }

    const placement = this.state.placement || coercePlacement(menuPlacement);
    const rect = getBoundingClientObj(controlElement);
    const scrollDistance = isFixed ? 0 : window.pageYOffset;
    const offset = rect[placement] + scrollDistance;
    const state = { offset, position, rect };

    // same wrapper element whether fixed or portalled
    const menuWrapper = (
      <div css={getStyles('menuPortal', state)}>{children}</div>
    );

    return appendTo ? createPortal(menuWrapper, appendTo) : menuWrapper;
  }
}