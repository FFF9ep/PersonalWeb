import {
  FaReact, FaNodeJs, FaGitAlt, FaFigma, FaDocker,
} from 'react-icons/fa'
import {
  SiTailwindcss, SiJavascript, SiTypescript, SiNextdotjs,
  SiExpress, SiMongodb, SiPostgresql, SiFirebase,
  SiVercel, SiPostman,
} from 'react-icons/si'

export const skillCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', icon: FaReact, color: '#61DAFB' },
      { name: 'Next.js', icon: SiNextdotjs, color: '#ffffff' },
      { name: 'JavaScript', icon: SiJavascript, color: '#F7DF1E' },
      { name: 'TypeScript', icon: SiTypescript, color: '#3178C6' },
      { name: 'TailwindCSS', icon: SiTailwindcss, color: '#06B6D4' },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', icon: FaNodeJs, color: '#339933' },
      { name: 'Express', icon: SiExpress, color: '#ffffff' },
      { name: 'MongoDB', icon: SiMongodb, color: '#47A248' },
      { name: 'PostgreSQL', icon: SiPostgresql, color: '#4169E1' },
      { name: 'Firebase', icon: SiFirebase, color: '#FFCA28' },
    ],
  },
  {
    title: 'Tools & DevOps',
    skills: [
      { name: 'Git', icon: FaGitAlt, color: '#F05032' },
      { name: 'Docker', icon: FaDocker, color: '#2496ED' },
      { name: 'Vercel', icon: SiVercel, color: '#ffffff' },
      { name: 'Figma', icon: FaFigma, color: '#F24E1E' },
      { name: 'Postman', icon: SiPostman, color: '#FF6C37' },
    ],
  },
]
