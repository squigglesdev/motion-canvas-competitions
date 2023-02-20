import {makeScene2D} from '@motion-canvas/2d';
import {
  Node,
  Rect,
  Layout,
  LayoutProps,
  Text,
  Image,
  Video,
} from '@motion-canvas/2d/lib/components';
import {all, any, loop, waitUntil, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef, range} from '@motion-canvas/core/lib/utils';
import {easeOutBack, linear} from '@motion-canvas/core/lib/tweening';
import bg from "../../media/images/BGMC.png"
import discord from "../../media/video/discord.mp4"
import canvas from "../../media/images/logo.svg"

const WHITE = '#FFFFFFCD';
const GREEN = '#25C281';

export default makeScene2D(function* (view) {
  const title = createRef<Node>();
  const icebreaker = createRef<Text>();
  const logo = createRef<Image>();

  view.add(
    <>
      <Node
        ref={title}
        x={-250}
      >
        <Text
          ref={icebreaker}
          text={"Introducing:"}
          x={-200}
          y={-100}
          fontFamily={"Jetbrains Mono"}
          fontWeight={700}
          scale={2}
          fill={WHITE}
        />,
        <Text
          text={"Motion Canvas"}
          x={-170}
          y={20}
          fontFamily={"Jetbrains Mono"}
          fontWeight={700}
          scale={2}
          fill={WHITE}
        />,
        <Text
          text={"Competetions!"}
          x={640}
          y={20}
          fontFamily={"Jetbrains Mono"}
          fontWeight={700}
          scale={2}
          fill={GREEN}
        />,
      </Node>
    
    </>


  );

  yield* waitUntil("End")
});
