"use client";
import React, { useTransition, useState } from "react";
import Image from "next/image";
import TabButton from "./TabButton";

const TAB_DATA = [
  {
    title: "Skills",
    id: "skills",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-purple-400 mb-2">Languages</h4>
          <ul className="list-disc pl-4 grid grid-cols-2 gap-1">
            <li>Python</li>
            <li>C++</li>
            <li>JavaScript</li>
            <li>SQL</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-purple-400 mb-2">Operating Systems</h4>
          <ul className="list-disc pl-4">
            <li>Linux (Primary)</li>
            <li>Windows</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-purple-400 mb-2">Web/Backend</h4>
          <ul className="list-disc pl-4 grid grid-cols-2 gap-1">
            <li>FastAPI</li>
            <li>React.js</li>
            <li>Node.js</li>
            <li>Supabase</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-purple-400 mb-2">ML/AI</h4>
          <ul className="list-disc pl-4 grid grid-cols-2 gap-1">
            <li>Scikit-learn</li>
            <li>PyTorch</li>
            <li>TensorFlow</li>
            <li>XGBoost</li>
            <li>OpenCV</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-purple-400 mb-2">GenAI Tools</h4>
          <ul className="list-disc pl-4 grid grid-cols-2 gap-1">
            <li>LangChain</li>
            <li>Hugging Face</li>
            <li>OpenAI</li>
            <li>Gemini Pro</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-purple-400 mb-2">Vector DBs</h4>
          <ul className="list-disc pl-4 grid grid-cols-2 gap-1">
            <li>ChromaDB</li>
            <li>Pinecone</li>
            <li>Weaviate</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-purple-400 mb-2">DevOps</h4>
          <ul className="list-disc pl-4 grid grid-cols-2 gap-1">
            <li>Docker</li>
            <li>AWS</li>
            <li>Kubernetes</li>
            <li>Terraform</li>
          </ul>
        </div>
        
        <div>
          <h4 className="text-lg font-semibold text-purple-400 mb-2">Concepts</h4>
          <ul className="list-disc pl-4 grid grid-cols-2 gap-1">
            <li>RAG</li>
            <li>Fine-tuning</li>
            <li>Prompt Engineering</li>
            <li>MLOps</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    title: "Experience",
    id: "experience",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="text-lg font-semibold text-purple-400">Yuvichaar Funnels</h4>
          <p className="text-gray-300 text-sm mb-1">June 2025 – Present</p>
          <p className="text-white font-medium mb-2">Tech Intern (Web & AI)</p>
          <p className="text-gray-300 text-sm leading-relaxed">
            Contributed to Leepi AI (a product by Yuvichar Funnels), an AI-powered ad script generation platform used by over 
            1,000+ marketers; improved LLM-based script workflows, increasing generation efficiency by 40%; currently working 
            on integrating text-to-video generation for fully automated ad creation.
          </p>
        </div>
      </div>
    ),
  },
  {
    title: "Education",
    id: "education",
    content: (
      <div className="space-y-3">
        <div>
          <h4 className="text-lg font-semibold text-purple-400">Madan Mohan Malaviya University of Technology, Gorakhpur</h4>
          <p className="text-gray-300 text-sm mb-1">Sept 2022 – May 2026</p>
          <p className="text-white">B.Tech in Information Technology</p>
          <p className="text-gray-400 text-sm">CGPA: 7.08</p>
        </div>
      </div>
    ),
  },
  {
    title: "Certifications",
    id: "certifications",
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between group">
          <div>
            <h4 className="text-white font-medium">Top 5% in NPTEL Deep Learning by IIT-Ropar</h4>
          </div>
          <a 
            href="#" 
            className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            onClick={(e) => e.preventDefault()} // Temporary until you add actual links
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        
        <div className="flex items-center justify-between group">
          <div>
            <h4 className="text-white font-medium">IBM: GenAI Applications with Python (Coursera)</h4>
          </div>
          <a 
            href="#" 
            className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            onClick={(e) => e.preventDefault()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        
        <div className="flex items-center justify-between group">
          <div>
            <h4 className="text-white font-medium">TuteDude: Data Science Certificate</h4>
          </div>
          <a 
            href="#" 
            className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            onClick={(e) => e.preventDefault()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
        
        <div className="flex items-center justify-between group">
          <div>
            <h4 className="text-white font-medium">PhysicsWallah: Backend Development</h4>
          </div>
          <a 
            href="#" 
            className="text-purple-400 hover:text-purple-300 transition-colors cursor-pointer"
            onClick={(e) => e.preventDefault()}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    ),
  },
];

const AboutSection = () => {
  const [tab, setTab] = useState("skills");
  const [isPending, startTransition] = useTransition();

  const handleTabChange = (id) => {
    startTransition(() => {
      setTab(id);
    });
  };

  return (
    <section className="text-white" id="about">
      <div className="md:grid md:grid-cols-2 gap-8 items-center py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
        <Image src="/images/about-image.png" width={500} height={500} />
        <div className="mt-4 md:mt-0 text-left flex flex-col h-full">
          <h2 className="text-4xl font-bold text-white mb-4">About Me</h2>
          <p className="text-base lg:text-lg">
            I am a full stack web developer with a passion for creating
            interactive and responsive web applications. I have experience
            working with JavaScript, React, Redux, Node.js, Express, PostgreSQL,
            Sequelize, HTML, CSS, and Git. I am a quick learner and I am always
            looking to expand my knowledge and skill set. I am a team player and
            I am excited to work with others to create amazing applications.
          </p>
          <div className="flex flex-row justify-start mt-8">
            <TabButton
              selectTab={() => handleTabChange("skills")}
              active={tab === "skills"}
            >
              {" "}
              Skills{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("experience")}
              active={tab === "experience"}
            >
              {" "}
              Experience{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("education")}
              active={tab === "education"}
            >
              {" "}
              Education{" "}
            </TabButton>
            <TabButton
              selectTab={() => handleTabChange("certifications")}
              active={tab === "certifications"}
            >
              {" "}
              Certifications{" "}
            </TabButton>
          </div>
          <div className="mt-8">
            {TAB_DATA.find((t) => t.id === tab).content}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
