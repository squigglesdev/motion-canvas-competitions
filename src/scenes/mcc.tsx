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
import contentBefore from "../../media/Images/contentBefore.png"
import content1 from "../../media/Images/content1.png"
import content2 from "../../media/Images/content2.png"
import content3 from "../../media/Images/content3.png"
import content4 from "../../media/Images/content4.png"

import contentAfter from "../../media/Images/contentAfter.png"
import logoimg from "../../media/Images/logo.svg"
import { cancel } from '@motion-canvas/core/lib/threading';
import { Center } from '@motion-canvas/core/lib/types';
import { createSignal } from '@motion-canvas/core/lib/signals';

const WHITE = '#FFFFFFCD';
const GREEN = '#25C281';

export default makeScene2D(function* (view) {
  const sceneOpacity = createSignal(0);

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
  const discord = createRef<Image>();
  const submit = createRef<Text>();

  view.add(
    <>
      <Circle ref={outer} scale={0} width={1000} height={1000} fill={GREEN} x={360} y={50}/>
      <Circle ref={inner} scale={0} width={1000} height={1000} fill={"#242424"} x={360} y={50}/>
      <Layout ref={title} opacity={() => sceneOpacity()} x={0} y={0} direction="column" layout>
        <Text
          ref={icebreaker}
          text={''}
          fontFamily={'Jetbrains Mono'}
          fontWeight={700}
          fontSize={84}
          fill={WHITE}
          opacity={0.7}
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
            scale={0}
          />
        </Layout>
        
      </Layout>
      <Text
        ref={subtitle}
        text={""}
        fontFamily={'Jetbrains Mono'}
        fontWeight={300}
        y={() => title().size().y / 2 + title().position().y + 20}
        x={() => -title().size().x / 2 + subtitle().size().x / 2}
        fontSize={48}
        fill={WHITE}
        opacity={() => sceneOpacity()}
      />
      <Image 
        ref={logo} 
        src={"../../media/images/logo.svg"} 
        size={[500, 500]} 
        position={() => [
          logo().size().x/2, 
          logo().size().y/2 * -1
        ]} 
        offsetX={1} 
        offsetY={-1} 
      />
      <Rect
        ref={content}
        radius={10}
        width={1148}
        height={339}
        scale={0}
        x={0}
        y={0}
        fill={"#1e1e1e"}
        opacity={() => sceneOpacity()}>
        <Image
          ref={discord}
          src={contentBefore}
          radius={10}
          width={1148}
          x={0}
          y={0}
          opacity={0}
        />
        <Text
          ref={submit}
          text={""}
          x={-(513+13)}
          y={268+13}
          fontFamily={"gg sans"}
          fontSize={16.86}
          fontWeight={400}
          fill={"white"}
        />
        <Text
          ref={explanation}
          text={"Motion Canvas Competitions (MCCs) are a fun way to\nparticipate in the Motion Canvas community whilst\npractising your skills! They are similar to game jams and\nare held bi-weekly. A new theme is presented at the\nbeginning of each challenge and you will have to create\nan animation based on that theme."}
          fontFamily={"Noto Sans"}
          fontSize={36}
          letterSpacing={2}
          lineHeight={50}
          fill={WHITE}
        />
      </Rect>
    </>,
  );
  yield* waitFor(0.5);
  yield* all(
    logo().size([140, 140], 0.5),
    logo().position([920, -500], 0.5),
    sceneOpacity(1, 0.2)
  )

  yield* waitUntil("Introducing:")
  yield* icebreaker().text('Introducing:', 0.7)
  yield* waitUntil("Motion Canvas")
  yield* mainText().text('Motion Canvas', 1)
  yield* waitUntil("Competitions")

  yield* all(
    outer().scale(5,0.5),
    mainTextGreen().scale(1, 0.5), 
    mainTextGreen().rotation(360, 0.6),
    inner().scale(5, 1)
  )

  yield* waitFor(0.2)
  yield* waitUntil("Title up")
  yield icebreaker().opacity(0, 0.6)
  yield icebreaker().text("I", 0.7),
  yield* all(
    title().position.y(-470, 1),
    mainTextGreen().text("Competitions", 1),
    icebreaker().fontSize(67,1),
    mainText().fontSize(67,1),
    mainTextGreen().fontSize(67,1),
  )
  yield* all(
    // title().justifyContent('center', 0),
    subtitle().text("What are they?", 1),
    content().scale(1, 2, easeOutQuint)
  )
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

  yield* discord().opacity(1,1, easeInQuint)

  yield* waitUntil("Type")
  yield* all(
    submit().text("/submit", 2),
    submit().position.x((-(513+13))+29, 2)
  )
  yield* all(
    submit().text("",0),
    discord().src(content1, 0),
  )

  // TODO properly animate discord submission
  //  Properly animate as if someone is actually typing, not sharp cuts like this.
  //  assignees: squigglesdev
  //  labels: enhancement
  yield* waitFor(2)
  yield* discord().src(content2,0)
  yield* waitFor(2)
  yield* discord().src(content3,0)
  yield* waitFor(2)
  yield* discord().src(content4,0)
  yield* waitFor(2)
  yield* discord().src(contentAfter,0)

  yield* waitUntil("End")
  yield* all(
    logo().size([500, 500], 0.5),
    logo().position.x(250, 0.5),
    logo().position.y(-250, 0.5),
    sceneOpacity(0, 0.2),
    waitFor(1)
  )
});
