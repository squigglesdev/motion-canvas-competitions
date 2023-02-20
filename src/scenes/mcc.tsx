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
  const title = createRef<Layout>();
  const icebreaker = createRef<Text>();
  const logo = createRef<Image>();

  view.add(
    <>
      <Layout ref={title} direction="column" layout opacity={0}>
        <Text
          ref={icebreaker}
          text={'Introducing:'}
          fontFamily={'Jetbrains Mono'}
          fontWeight={700}
          fontSize={100}
          fill={WHITE}
        />
        <Layout direction={'row'} gap={28}>
          <Text
            text={'Motion Canvas'}
            fontFamily={'Jetbrains Mono'}
            fontWeight={700}
            fontSize={100}
            fill={WHITE}
          />
          <Text
            text={'Competetions!'}
            fontFamily={'Jetbrains Mono'}
            fontWeight={700}
            fontSize={100}
            fill={GREEN}
          />
        </Layout>
      </Layout>
    </>,
  );

  yield* waitUntil("End")
});
