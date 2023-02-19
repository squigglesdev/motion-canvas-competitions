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

const YELLOW = '#FFC66D';
const RED = '#FF6470';
const GREEN = '#99C47A';
const BLUE = '#68ABDF';

const Trail = (props: LayoutProps) => (
  <Layout layout direction={'column'} gap={30} offsetY={-1} y={0} {...props} />
);

export default makeScene2D(function* (view) {
  const icon = createRef<Node>();
  const star = createRef<Node>();
  const trail1 = createRef<Layout>();
  const trail2 = createRef<Layout>();
  const trail3 = createRef<Layout>();
  const title = createRef<Text>();
  const paragraph = createRef<Text>();
  const motionCanvas = createRef<Text>();
  const phone = createRef<Video>();
  const background = createRef<Image>();
  const dot = createRef<Rect>();
  const logo = createRef<Image>();

  view.add(
    <>
      <Image
        ref={background}
        src={bg}
      />
      <Node rotation={-45} position={44} scale={0.5} x={800} y={-350} ref={icon}>
        <Node cache y={-270}>
          <Trail ref={trail1}>
            {range(3).map(_ => (
              <Rect width={40} radius={20} height={120} fill={YELLOW} />
            ))}
          </Trail>
          <Rect
            width={40}
            radius={20}
            height={270}
            fill={'white'}
            offsetY={-1}
            compositeOperation={'destination-in'}
          />
        </Node>
        <Node cache x={-70} y={-200}>
          <Trail ref={trail2}>
            {range(3).map(_ => (
              <Rect width={40} height={120} radius={20} fill={RED} />
            ))}
          </Trail>
          <Rect
            width={40}
            radius={20}
            height={180}
            fill={'white'}
            offsetY={-1}
            compositeOperation={'destination-in'}
          />
        </Node>
        <Node cache x={70} y={-300}>
          <Trail ref={trail3}>
            {range(4).map(i => (
              <Rect
                ref={i === 1 ? dot : undefined}
                width={40}
                radius={20}
                height={100}
                fill={i === 0 ? GREEN : BLUE}
                offsetY={1}
              />
            ))}
          </Trail>
          <Rect
            width={40}
            radius={20}
            height={220}
            fill={'white'}
            offsetY={-1}
            y={60}
            compositeOperation={'destination-in'}
          />
        </Node>
        <Node ref={star}>
          {range(5).map(i => (
            <Rect
              width={100}
              radius={50}
              height={150}
              fill={'#36393F'}
              offsetY={1}
              rotation={(360 / 5) * i}
            />
          ))}
          {range(5).map(i => (
            <Rect
              width={40}
              radius={20}
              height={120}
              fill={'white'}
              offsetY={1}
              rotation={(360 / 5) * i}
            />
          ))}
        </Node>
      </Node>
      <Text 
        ref={title}
        text={""}
        fontFamily={"Jetbrains Mono"}
        fill={'white'}
        fontWeight={700}
        x={-100}
        y={100}
        scale={2}
      />
      <Text
        ref={paragraph}
        text={""}
        fontFamily={"Jetbrains Mono"}
        fill={'white'}
        x={-200}
        scale={0.75}
      />
      <Video
        ref={phone}
        src={discord}
        x={2000}
        y={150}
        radius={1000}
      />
      <Text
        ref={motionCanvas}
        text={""}
        fontFamily={"Jetbrains Mono"}
        fontWeight={700}
        fill={"white"}
        x={150}
        scale={2}
      />
      <Image
        ref={logo}
        opacity={0}
        src={canvas}
        scale={2}
        x={800}
        y={-350}
      />
    </>,
  );

  yield all(
    star().rotation(5760, 64, linear),
    loop(64, function* () {
      yield* trail1().position.y(-150, 1, linear);
      trail1().position.y(0);
    }),
    loop(32, function* () {
      yield* trail2().position.y(-150, 2, linear);
      trail2().position.y(0);
    }),
    loop(32, function* () {
      yield* all(
        trail3().position.y(-130, 2, linear),
        dot().fill(GREEN, 2, linear),
      );
      dot().fill(BLUE);
      trail3().position.y(0);
    }),
    title().text("Introducing:\nMotion Canvas Competitions!", 3)
  );
  yield* waitUntil("Move")
  yield* all(
    
    title().scale(1,1),
    title().position.y(-400,1),
    title().position.x(-500,1),
  )
  yield title().text("Motion Canvas Competitions", 0)
  yield* waitUntil("Explanation")
  yield* paragraph().text("Motion Canvas Competitions (MCCs) are a fun way to participate\nin the Motion Canvas community whilst practising your skills!\nThey are similar to game jams and are held bi-weekly.\nA new theme is presented at the beginning of each challenge\nand you will have to create an animation based off that theme.", 3)
  yield* waitUntil("Discord")
  yield* paragraph().text("", 0.5)
  yield* paragraph().text("Here's how to submit your work:", 0.5)
  yield* all(
    paragraph().position.x(-530, 1),
    paragraph().position.y(-200, 1)
  )
  yield* phone().position.x(500,0.5,easeOutBack)
  phone().play()
  yield* waitUntil("End")
  yield all(
    //background().opacity(0,1),
    title().opacity(0,1),
    phone().opacity(0,1),
    paragraph().opacity(0,1),
    icon().opacity(0, 1),
  )
  yield* waitFor(0.5)
  yield* all(
    icon().position.x(-250,2),
    icon().position.y(0,2),
    logo().position.x(-400,2),
    logo().position.y(0,2),
    icon().scale(0.7,2),
    logo().opacity(1, 1)
  )
  yield* motionCanvas().text("Motion Canvas", 1.5)
  yield* waitFor(3)
});
