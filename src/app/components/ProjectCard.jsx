import React from "react";
import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

// A link is "real" if it's set and not a "#" placeholder.
const isRealLink = (url) => url && url !== "#";

const ProjectCard = ({
  imgUrl,
  title,
  description,
  period,
  stack = [],
  gitUrl,
  liveUrl,
}) => {
  const hasGit = isRealLink(gitUrl);
  const hasLive = isRealLink(liveUrl);

  return (
    <div className="h-full flex flex-col rounded-xl bg-[#181818] border border-[#33353F] overflow-hidden">
      <div
        className="h-52 md:h-60 relative group"
        style={{ background: `url(${imgUrl})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        {(hasGit || hasLive) && (
          <div className="overlay items-center justify-center absolute inset-0 bg-[#181818] bg-opacity-0 hidden group-hover:flex group-hover:bg-opacity-80 transition-all duration-500">
            {hasGit && (
              <Link
                href={gitUrl}
                aria-label={`${title} source`}
                className="h-14 w-14 mr-2 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
              >
                <CodeBracketIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
              </Link>
            )}
            {hasLive && (
              <Link
                href={liveUrl}
                aria-label={`${title} live`}
                className="h-14 w-14 border-2 relative rounded-full border-[#ADB7BE] hover:border-white group/link"
              >
                <EyeIcon className="h-10 w-10 text-[#ADB7BE] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer group-hover/link:text-white" />
              </Link>
            )}
          </div>
        )}
      </div>
      <div className="text-white py-6 px-4 flex flex-col flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <h5 className="text-xl font-semibold">{title}</h5>
          {period ? (
            <span className="text-xs text-gray-500 whitespace-nowrap">{period}</span>
          ) : null}
        </div>
        <p className="text-[#ADB7BE] mt-2 flex-1">{description}</p>
        {stack.length ? (
          <ul className="flex flex-wrap gap-2 mt-4">
            {stack.map((tech) => (
              <li
                key={tech}
                className="text-xs bg-[#121212] border border-[#33353F] rounded-full px-2.5 py-1 text-[#ADB7BE]"
              >
                {tech}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
  );
};

export default ProjectCard;
