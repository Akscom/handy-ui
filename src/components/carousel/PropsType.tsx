import { ReactNode, CSSProperties, RefObject } from 'react';

export default interface PropsType {
  direction?: 'left' | 'right' | 'up' | 'down';
  height?: string | number;
  loop?: boolean;
  activeIndex?: number;
  animationDuration?: number;
  swipeable?: boolean;
  autoPlay?: boolean;
  autoPlayIntervalTime?: number;
  moveDistanceRatio?: number;
  moveTimeSpan?: number;
  showPagination?: boolean;
  onChange?: (activeIndex?: number) => void;
  onChangeEnd?: (activeIndex?: number) => void;
  children: ReactNode[];
  style?: CSSProperties;
  // refs: RefObject<HTMLDivElement>
  slideToNum?: number
  jumpToNum?: number
}
