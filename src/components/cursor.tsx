import {Circle, Line, Node, NodeProps, Rect} from '@motion-canvas/2d/lib/components';
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
import {all} from '@motion-canvas/core/lib/flow';
import { Gradient } from '@motion-canvas/2d/lib/partials';
import { PossibleVector2 } from '@motion-canvas/core/lib/types';


export interface CursorProps extends NodeProps {
    state?: SignalValue<string>;
    fill?: SignalValue<PossibleColor>;
    accent?: SignalValue<PossibleColor>;
    stroke?: SignalValue<PossibleColor>;
}

const pointer: PossibleVector2[] = [[0,0],[0,132],[38.39,90.06],[93,86.23],[0,0]]
const text: PossibleVector2[] = [[0,0],[0,132]]

export class Cursor extends Node {
    // Cursor state
    @initial('pointer')
    @signal()
    public declare readonly state: SimpleSignal<string, this>;

    //Cursor fill
    @signal()
    public declare readonly fill: ColorSignal<this>;

    // Cursor accent colour
    @signal()
    public declare readonly accent: ColorSignal<this>;

    // Cursor stroke
    @signal()
    public declare readonly stroke: ColorSignal<this>;

    public constructor(props?: CursorProps) {
        super({
          ...props,
        });

        const points = (): PossibleVector2[] => {
            const state = this.state();
            if (state === 'pointer') {
              return pointer;
            } else if (state === 'text') {
              return text;
            /*} else if (state === 'bla') {
              return bla;*/
            }
          };

        this.add(
            <Line
                points={points}
                fill={new Gradient({
                    from: [0, 100],
                    to: [0, 20],
                    stops: [
                        {offset: 0, color: this.accent()},  
                        {offset: 1, color: this.fill()},  
                    ]
                })}
                lineWidth={3}
                stroke={this.stroke()}
                radius={3}
            />
        );
    }
}