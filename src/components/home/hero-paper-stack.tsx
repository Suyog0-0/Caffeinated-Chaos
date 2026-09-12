"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const entranceEase = [0.22, 1, 0.36, 1] as const;
const MotionCard = motion.create(Card);

export function HeroPaperStack() {
  const stageRef = useRef<HTMLDivElement>(null);
  const progress = useMotionValue(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage || reduceMotion) {
      progress.set(0);
      return;
    }

    let frame = 0;
    let animationStart = 0;
    let animationDistance = 560;

    const measure = () => {
      const stageTop = stage.getBoundingClientRect().top + window.scrollY;
      animationStart = Math.max(0, stageTop - window.innerHeight * 0.48);
      animationDistance = Math.min(720, Math.max(460, window.innerHeight * 0.76));
    };

    const update = () => {
      frame = 0;
      const nextProgress = (window.scrollY - animationStart) / animationDistance;
      progress.set(Math.min(1, Math.max(0, nextProgress)));
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      if (frame) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [progress, reduceMotion]);

  const frontY = useTransform(progress, [0, 0.05, 0.38], [0, 0, -900]);
  const frontX = useTransform(progress, [0.05, 0.38], [0, -42]);
  const frontRotate = useTransform(progress, [0.05, 0.38], [0.8, -4.5]);
  const frontOpacity = useTransform(progress, [0, 0.31, 0.39], [1, 1, 0]);

  const middleY = useTransform(progress, [0, 0.23, 0.59], [0, 0, -880]);
  const middleX = useTransform(progress, [0.23, 0.59], [0, 34]);
  const middleRotate = useTransform(progress, [0.23, 0.59], [-5, 2.5]);
  const middleOpacity = useTransform(progress, [0, 0.52, 0.61], [1, 1, 0]);

  const backY = useTransform(progress, [0, 0.45, 0.81], [0, 0, -860]);
  const backX = useTransform(progress, [0.45, 0.81], [0, -24]);
  const backRotate = useTransform(progress, [0.45, 0.81], [7, 12]);
  const backOpacity = useTransform(progress, [0, 0.74, 0.83], [1, 1, 0]);
  const captionOpacity = useTransform(progress, [0, 0.08, 0.18], [1, 1, 0]);

  const instantTransition = { duration: 0 };
  const entranceTransition = (delay: number) => ({
    duration: 0.9,
    delay,
    ease: entranceEase,
  });

  return (
    <div
      ref={stageRef}
      className="relative min-h-[530px] max-sm:min-h-[470px]"
      role="group"
      aria-label="Featured research paper"
    >
      <motion.div
        aria-hidden="true"
        className="absolute inset-[66px_5px_36px_84px] will-change-transform max-sm:inset-[56px_2px_28px_58px]"
        style={{
          x: reduceMotion ? 0 : backX,
          y: reduceMotion ? 0 : backY,
          rotate: reduceMotion ? 7 : backRotate,
          opacity: reduceMotion ? 1 : backOpacity,
          transformOrigin: "50% 12%",
        }}
      >
        <motion.div
          className="size-full bg-[#e1c451]"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.96, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={reduceMotion ? instantTransition : entranceTransition(0.08)}
        />
      </motion.div>

      <motion.div
        aria-hidden="true"
        className="absolute inset-[24px_41px_60px_45px] will-change-transform max-sm:inset-[18px_22px_42px_25px]"
        style={{
          x: reduceMotion ? 0 : middleX,
          y: reduceMotion ? 0 : middleY,
          rotate: reduceMotion ? -5 : middleRotate,
          opacity: reduceMotion ? 1 : middleOpacity,
          transformOrigin: "50% 12%",
        }}
      >
        <motion.div
          className="size-full border border-[#c9c7bd] bg-[#eeeae0] shadow-xl"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.965, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={reduceMotion ? instantTransition : entranceTransition(0.16)}
        />
      </motion.div>

      <motion.div
        className="absolute inset-[18px_35px_54px_34px] z-2 will-change-transform max-sm:inset-[12px_20px_36px_14px]"
        style={{
          x: reduceMotion ? 0 : frontX,
          y: reduceMotion ? 0 : frontY,
          rotate: reduceMotion ? 0.8 : frontRotate,
          opacity: reduceMotion ? 1 : frontOpacity,
          transformOrigin: "50% 12%",
        }}
      >
        <MotionCard
          className="h-full p-3 shadow-2xl"
          initial={reduceMotion ? false : { opacity: 0, scale: 0.97, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={reduceMotion ? instantTransition : entranceTransition(0.26)}
        >
          <CardHeader className="flex-row justify-between border-b border-[#17251f] p-3 font-sans text-[9px] font-bold leading-5">
            <span>Islington research paper</span>
            <span>No. 08</span>
          </CardHeader>
          <CardContent className="p-3 max-sm:p-4">
            <p className="mb-3 font-sans text-[11px] font-bold text-[#153c2e]">
              Urban intelligence
            </p>
            <h2 className="max-w-md text-[clamp(31px,3.25vw,43px)] leading-[1.04] font-medium tracking-tight max-sm:text-[31px]">
              Can a city learn from the people who move through it?
            </h2>
            <p className="my-4 max-w-sm text-left font-sans text-[15px] leading-7 text-[#405149] max-sm:text-[13px] max-sm:leading-6">
              A community-led study of mobility data, public space and more inclusive decisions
              for Kathmandu.
            </p>
            <Separator className="mb-4" />
            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-full bg-[#153c2e] font-sans text-[11px] font-semibold text-white">
                NM
              </span>
              <span>
                <strong className="block font-sans text-[15px] leading-5 font-semibold">
                  Nisha Maharjan
                </strong>
                <small className="block font-sans text-[11px] leading-5 text-[#405149]">
                  Lead researcher
                </small>
              </span>
            </div>
          </CardContent>
        </MotionCard>
      </motion.div>

      <motion.p
        className="absolute right-5 bottom-0 z-4 font-sans text-[10px] text-[#405149]"
        style={{ opacity: reduceMotion ? 1 : captionOpacity }}
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reduceMotion ? instantTransition : entranceTransition(0.48)}
      >
        <span className="mr-3 font-bold text-[#17251f]">Featured work</span> Five-minute read
      </motion.p>
    </div>
  );
}
