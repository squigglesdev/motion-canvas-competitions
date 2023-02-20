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
import {easeInQuint, easeOutBack, easeOutQuint, linear} from '@motion-canvas/core/lib/tweening';
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
  const content = createRef<Rect>();
  const explanation = createRef<Text>();

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
            text={'Competitions!'}
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
      <Rect
        ref={content}
        radius={10}
        width={1148}
        height={339}
        scale={0}
        x={0}
        y={0}
        fill={"#1e1e1e"}
      >
        <Text
          ref={explanation}
          text={""}
          fontFamily={"Noto Sans"}
          fontSize={36}
          letterSpacing={2}
          lineHeight={50}
          fill={WHITE}
        />
      </Rect>
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
    mainTextGreen().text("Competitions", 1),
    icebreaker().fontSize(67,1),
    mainText().fontSize(67,1),
    mainTextGreen().fontSize(67,1),
  )
  yield* all(
    title().justifyContent('center', 0),
    subtitle().text("What are they?", 1),
    content().scale(1, 2, easeOutQuint)
  )
  yield* explanation().text("Motion Canvas Competitions (MCCs) are a fun way to\nparticipate in the Motion Canvas community whilst\npractising your skills! They are similar to game jams and\nare held bi-weekly. A new theme is presented at the\nbeginning of each challenge and you will have to create\nan animation based on that theme.", 2)
  yield* waitUntil("Discord")
  
  yield* all(
    subtitle().text("", 0.5),
    explanation().text("", 0.5),
  )
  yield* all(
    content().fill("313338", 1, easeInQuint),
    content().height(646, 1, easeInQuint),
    content().position.y(88, 1, easeOutQuint),
    subtitle().text("How to submit your work", 1),
  )
  yield* waitUntil("End")
});
