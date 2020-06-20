import React, {
  Component,
  CSSProperties,
  RefCallback,
  // type ElementRef,
  // type Element as ReactElement,
} from 'react';
import rafSchedule from 'raf-schd';

interface Props {
  // children: ReactElement<*>, // Component | Element
  preserveHeight: boolean;
}
interface State {
  height: number | 'auto';
  isFixed: boolean;
  overScroll: number;
  scrollHeight: number | null | undefined;
  width: number | 'auto';
}

export default class Sticky extends Component<Props, State> {
  innerEl?: HTMLDivElement;
  outerEl?: HTMLDivElement;
  state: State = {
    height: 'auto',
    isFixed: false,
    overScroll: 0,
    scrollHeight: null,
    width: 'auto',
  };
  static defaultProps = { preserveHeight: false };
  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
    // this.handleScroll();
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
  handleScroll = rafSchedule((event: Event) => {
    if (!this.innerEl || !this.outerEl) return;

    const offsetBottom = 88; // footer height
    const { top: outerTop } = this.outerEl.getBoundingClientRect();
    const innerTop = (this.innerEl.offsetTop && this.innerEl.offsetTop) || 0;
    const scrollY = window.pageYOffset;
    const maxScroll =
      document.body &&
      document.body.scrollHeight - window.innerHeight - offsetBottom;
    const { isFixed, overScroll } = this.state;

    // check for `isFixed` before setting state to prevent thrashing
    if (isFixed && outerTop > 0) {
      this.setState({ isFixed: false });
    } else if (!isFixed && scrollY >= innerTop) {
      this.setState({ isFixed: true });
    }

    // handle over scroll
    if (maxScroll && scrollY >= maxScroll) {
      this.setState({ overScroll: scrollY - maxScroll });
    } else if (overScroll > 0 && scrollY < maxScroll) {
      this.setState({ overScroll: 0 });
    }
  });
  getOuterEl: RefCallback<HTMLDivElement> = (ref) => {
    if (!ref) return;

    this.outerEl = ref;
  };
  getInnerEl: RefCallback<HTMLDivElement> = (ref) => {
    if (!ref) return;

    this.innerEl = ref;

    // get dimensions once, we're not interested in resize events
    const firstChild = ref.firstElementChild;
    const availableHeight = window.innerHeight;
    let { height, width } = firstChild!.getBoundingClientRect();
    let scrollHeight;

    if (typeof this.state.height !== 'number') {
      if (height > availableHeight) scrollHeight = availableHeight;
      this.setState({ height, scrollHeight, width });
    }
  };
  render() {
    const { preserveHeight } = this.props;
    const { height, isFixed, overScroll, scrollHeight, width } = this.state;
    const outerStyle: CSSProperties | undefined =
      isFixed && preserveHeight ? { height } : undefined;
    const fixedStyles: CSSProperties = {
      position: 'fixed',
      top: 0,
      width,
      zIndex: 1,
    };
    const scrollStyles: CSSProperties | undefined = scrollHeight
      ? {
          height: overScroll ? scrollHeight - overScroll : scrollHeight,
          overflow: 'scroll',
        }
      : undefined;
    const innerStyle: CSSProperties | undefined = isFixed
      ? { ...fixedStyles, ...scrollStyles }
      : undefined;

    return (
      <div ref={this.getOuterEl} style={outerStyle}>
        <div ref={this.getInnerEl} style={innerStyle}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
