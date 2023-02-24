import {
    Circle,
    Line,
    Node,
    NodeProps,
    Rect,
  } from '@motion-canvas/2d/lib/components';
  import {easeInOutCubic, tween} from '@motion-canvas/core/lib/tweening';
  import {
    Color,
    ColorSignal,
    PossibleColor,
  } from '@motion-canvas/core/lib/types/Color';
  import {colorSignal, initial, signal} from '@motion-canvas/2d/lib/decorators';
  import {
    createSignal,
    SignalValue,
    SimpleSignal,
  } from '@motion-canvas/core/lib/signals';
  import {createRef} from '@motion-canvas/core/lib/utils';
  import {all, waitFor} from '@motion-canvas/core/lib/flow';
  import {makeScene2D} from '@motion-canvas/2d';
  
  export interface CursorProps extends NodeProps {
    initialState?: SignalValue<string>;
    fill?: SignalValue<PossibleColor>;
    accent?: SignalValue<PossibleColor>;
  }
  
  export class Cursor extends Node {
    // Cursor state
    @initial('pointer')
    @signal()
    public declare readonly initialState: SimpleSignal<string, this>;
  
    //Cursor fill
    @signal()
    public declare readonly fill: ColorSignal<this>;
  
    // Cursor accent colour
    @signal()
    public declare readonly accent: ColorSignal<this>;
  
    public constructor(props?: CursorProps) {
      super({
        ...props,
      });
  
      this.add(
        <Line
          points={[
            [0.05, 0],
            [0, 132],
            [38.39, 90.06],
            [93, 86.23],
            [0.05, 0],
          ]}
          fill={this.fill()}
        />,
      );
    }
  }
  
  const WHITE = '#FFFFFFCD';
  
  export default makeScene2D(function* (view) {
    view.add(<Cursor fill={WHITE} />);
    yield* waitFor(1);
  });