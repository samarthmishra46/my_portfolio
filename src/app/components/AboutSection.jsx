"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";
import skills from "@/data/skills";
import experience from "@/data/experience";
import education from "@/data/education";

const SkillsTab = () => (
  <div className="space-y-4">
    {skills.map((group) => (
      <div key={group.group}>
        <h4 className="text-lg font-semibold text-primary-400 mb-2">
          {group.group}
        </h4>
        <ul className="flex flex-wrap gap-2">
          {group.items.map((item) => (
            <li
              key={item}
              className="bg-[#181818] border border-[#33353F] rounded-full px-3 py-1 text-sm text-[#ADB7BE]"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const ExperienceTab = () => (
  <div className="space-y-6">
    {experience.map((job) => (
      <div key={job.company}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-2">
          <h4 className="text-lg font-semibold text-primary-400">
            {job.company}
          </h4>
          <p className="text-gray-400 text-sm">{job.period}</p>
        </div>
        <p className="text-white font-medium mb-2">
          {job.role}
          {job.location ? ` · ${job.location}` : ""}
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-300 text-sm leading-relaxed">
          {job.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

const EducationTab = () => (
  <div className="space-y-6">
    {education.map((edu) => (
      <div key={edu.school}>
        <div className="flex flex-wrap items-baseline justify-between gap-x-2">
          <h4 className="text-lg font-semibold text-primary-400">
            {edu.school}
          </h4>
          <p className="text-gray-400 text-sm">{edu.period}</p>
        </div>
        <p className="text-white">{edu.degree}</p>
        <p className="text-gray-400 text-sm mb-2">
          {edu.detail}
          {edu.location ? ` · ${edu.location}` : ""}
        </p>
        {edu.coursework?.length ? (
          <p className="text-gray-300 text-sm">
            <span className="text-gray-400">Coursework: </span>
            {edu.coursework.join(", ")}
          </p>
        ) : null}
      </div>
    ))}
  </div>
);

const TABS = [
  { id: "skills", title: "Skills", Content: SkillsTab },
  { id: "experience", title: "Experience", Content: ExperienceTab },
  { id: "education", title: "Education", Content: EducationTab },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [, startTransition] = useTransition();

  const handleTabChange = (id) => startTransition(() => setTab(id));
  const ActiveContent = TABS.find((t) => t.id === tab).Content;

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-start py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image
          src="/images/about-image.png"
          width={500}
          height={500}
          alt="About Samarth Mishra"
          className="rounded-2xl"
        />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg text-[#ADB7BE]">
            I&apos;m a full-stack developer who ships AI features to production.
            I build 4-role SaaS platforms in Next.js, React and TypeScript on
            MongoDB, and I&apos;m deep in the Anthropic Claude SDK — forced
            tool-use with strict JSON schemas, streaming NDJSON protocols, and
            multi-turn agentic loops. I also handle the unglamorous,
            money-critical parts: Razorpay HMAC-verified payments, Delhivery
            logistics, and WhatsApp cart recovery. I care about code that holds
            up under real users and real money.
          </p>
          <div className="flex flex-row mt-8">
            {TABS.map((t) => (
              <TabButton
                key={t.id}
                selectTab={() => handleTabChange(t.id)}
                active={tab === t.id}
              >
                {t.title}
              </TabButton>
            ))}
          </div>
          <div className="mt-8">
            <ActiveContent />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
