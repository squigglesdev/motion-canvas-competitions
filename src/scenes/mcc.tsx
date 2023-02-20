import {makeScene2D} from '@motion-canvas/2d';
import {
  Node,
  Rect,
  Layout,
  LayoutProps,
  Text,
  Image,
  Video,
  Circle,
} from '@motion-canvas/2d/lib/components';
import {all, any, loop, waitUntil, waitFor} from '@motion-canvas/core/lib/flow';
import {createRef, range} from '@motion-canvas/core/lib/utils';
import {easeOutBack, linear} from '@motion-canvas/core/lib/tweening';
import bg from "../../media/images/BGMC.png"
import discord from "../../media/video/discord.mp4"
import logoimg from "../../media/images/logo.svg"
import { cancel } from '@motion-canvas/core/lib/threading';
import { Center } from '@motion-canvas/core/lib/types';

const WHITE = '#FFFFFFCD';
const GREEN = '#25C281';

export default makeScene2D(function* (view) {
  const title = createRef<Layout>();
  const icebreaker = createRef<Text>();
  const mainText = createRef<Text>();
  const mainTextGreen = createRef<Text>();
  const subtitle = createRef<Text>();
  const outer = createRef<Circle>();
  const inner = createRef<Circle>();
  const logo = createRef<Image>();

  view.add(
    <>
      <Circle ref={outer} scale={0} width={1000} height={1000} fill={GREEN} x={360} y={50}/>
      <Circle ref={inner} scale={0} width={1000} height={1000} fill={"#242424"} x={360} y={50}/>
      <Layout ref={title} x={0} y={0} direction="column" layout>
        <Text
          ref={icebreaker}
          text={''}
          fontFamily={'Jetbrains Mono'}
          fontWeight={700}
          fontSize={84}
          fill={WHITE}
        />
        <Layout direction={'row'} gap={50}>
          <Text
            ref={mainText}
            text={''}
            fontFamily={'Jetbrains Mono'}
            fontWeight={700}
            fontSize={84}
            fill={WHITE}
          />
          <Text
            ref={mainTextGreen}
            text={'Competetions!'}
            fontFamily={'Jetbrains Mono'}
            fontWeight={700}
            fontSize={84}
            fill={GREEN}
            opacity={0}
          />
        </Layout>
        <Text
          ref={subtitle}
          text={""}
          fontFamily={'Jetbrains Mono'}
          fontWeight={300}
          fontSize={48}
          fill={WHITE}
        />
      </Layout>
      <Image ref={logo} src={"../../media/images/logo.svg"} width={140} height={140} x={850} y={-430} />
    </>,
  );
  yield* waitUntil("Introducing:")
  yield* icebreaker().text('Introducing:', 1)
  yield* waitUntil("Motion Canvas")
  yield* mainText().text('Motion Canvas', 1)
  yield* waitUntil("Competitions")
  yield all(
    outer().scale(5,0.5),
    mainTextGreen().opacity(1, 0.5),
    mainTextGreen().rotation(360, 0.5),
  )
  yield* waitFor(0.2)
  yield* inner().scale(5, 0.5)
  yield* waitUntil("Title up")
  yield* all(
    title().position.y(-400, 1),
    icebreaker().text("", 1),
    mainTextGreen().text("Competetions", 1),
    icebreaker().fontSize(67,1),
    mainText().fontSize(67,1),
    mainTextGreen().fontSize(67,1),
  )
  yield* all(
    title().alignItems('center', 1),
    subtitle().text("What are they?", 1)
  )
});
