"use client";
import React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { stats, profiles } from "@/data/achievements";

const AnimatedNumbers = dynamic(() => import("react-animated-numbers"), {
  ssr: false,
});

const AchievementsSection = () => {
  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      {/* Headline metrics */}
      <div className="sm:border-[#33353F] sm:border rounded-xl bg-[#181818]/40 py-8 px-8 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((achievement, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center text-center"
          >
            <h2 className="text-white text-3xl sm:text-4xl font-bold flex flex-row">
              {achievement.prefix}
              <AnimatedNumbers
                includeComma
                animateToNumber={parseInt(achievement.value)}
                locale="en-US"
                className="text-white text-3xl sm:text-4xl font-bold"
                configs={(_, i) => ({
                  mass: 1,
                  friction: 100,
                  tensions: 140 * (i + 1),
                })}
              />
              {achievement.postfix}
            </h2>
            <p className="text-[#ADB7BE] text-sm sm:text-base mt-1">
              {achievement.metric}
            </p>
          </div>
        ))}
      </div>

      {/* Coding / open-source profiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {profiles.map((p) => (
          <Link
            key={p.label}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl border border-[#33353F] bg-[#181818] px-4 py-3 hover:border-primary-500/60 transition-colors"
          >
            <p className="text-[#ADB7BE] text-xs uppercase tracking-wide">
              {p.label}
            </p>
            <p className="text-white font-semibold mt-1">{p.value}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AchievementsSection;
