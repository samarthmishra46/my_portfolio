"use client";
import React, { useState, useRef, useMemo } from "react";
import ProjectCard from "./ProjectCard";
import ProjectTag from "./ProjectTag";
import { motion, useInView } from "framer-motion";
import projects from "@/data/projects";

const ProjectsSection = () => {
  const [tag, setTag] = useState("All");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  // Tag filter buttons derived from the data — "All" first, then the union
  // of every project's tags. Add a tag in projects.js and a button appears.
  const tags = useMemo(() => {
    const set = new Set();
    projects.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return ["All", ...Array.from(set)];
  }, []);

  const filteredProjects = projects.filter(
    (project) => tag === "All" || project.tags?.includes(tag)
  );

  const cardVariants = {
    initial: { y: 50, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <section id="projects" className="py-8">
      <h2 className="text-center text-4xl font-bold text-white mt-4 mb-8 md:mb-12">
        My Projects
      </h2>
      <div className="text-white flex flex-row flex-wrap justify-center items-center gap-2 py-6">
        {tags.map((t) => (
          <ProjectTag
            key={t}
            onClick={setTag}
            name={t}
            isSelected={tag === t}
          />
        ))}
      </div>
      <ul ref={ref} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {filteredProjects.map((project, index) => (
          <motion.li
            key={project.id}
            variants={cardVariants}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            transition={{ duration: 0.3, delay: index * 0.2 }}
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              period={project.period}
              stack={project.stack}
              imgUrl={project.image}
              gitUrl={project.gitUrl}
              liveUrl={project.liveUrl}
            />
          </motion.li>
        ))}
      </ul>
    </section>
  );
};

export default ProjectsSection;
