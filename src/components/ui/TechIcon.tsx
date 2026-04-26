import {
  siReact, siAngular, siTypescript, siJavascript, siTailwindcss,
  siHtml5, siFramer, siNodedotjs, siExpress, siFastify, siFastapi,
  siPhp, siDocker, siGitlab, siGithubactions, siNginx, siSonar,
  siSnyk, siApacheairflow, siKubernetes, siPostgresql, siMysql,
  siMariadb, siMongodb, siPrisma, siPython, siOpenjdk, siDart,
  siGit, siPostman, siJetbrains, siVitest, siSelenium,
  siVite, siCaddy, siCplusplus,
} from 'simple-icons'

type SimpleIcon = { path: string; hex: string }

const ICON_MAP: Record<string, SimpleIcon> = {
  'React':            siReact,
  'React 18':         siReact,
  'React 19':         siReact,
  'Angular':          siAngular,
  'TypeScript':       siTypescript,
  'JavaScript':       siJavascript,
  'Tailwind CSS':     siTailwindcss,
  'Tailwind':         siTailwindcss,
  'HTML/CSS':         siHtml5,
  'Framer Motion':    siFramer,
  'Vite':             siVite,
  'Node.js':          siNodedotjs,
  'Express.js':       siExpress,
  'Fastify':          siFastify,
  'FastAPI':          siFastapi,
  'PHP':              siPhp,
  'Docker':           siDocker,
  'GitLab CI':        siGitlab,
  'GitLab CI/CD':     siGitlab,
  'GitHub Actions':   siGithubactions,
  'Nginx':            siNginx,
  'Caddy':            siCaddy,
  'SonarQube':        siSonar,
  'Snyk':             siSnyk,
  'Apache Airflow':   siApacheairflow,
  'Kubernetes':       siKubernetes,
  'PostgreSQL':       siPostgresql,
  'MySQL':            siMysql,
  'MariaDB':          siMariadb,
  'MongoDB':          siMongodb,
  'Prisma':           siPrisma,
  'Prisma ORM':       siPrisma,
  'Python':           siPython,
  'Java':             siOpenjdk,
  'C/C++':            siCplusplus,
  'Dart':             siDart,
  'Git / GitFlow':    siGit,
  'Postman':          siPostman,
  'JetBrains Suite':  siJetbrains,
  'Vitest':           siVitest,
  'Selenium':         siSelenium,
}

interface TechIconProps {
  name: string
  size?: number
  color?: string
  className?: string
}

export function TechIcon({ name, size = 16, color, className = '' }: TechIconProps) {
  const icon = ICON_MAP[name]
  if (!icon) return null

  const fill = color ?? `#${icon.hex}`

  return (
    <svg
      role="img"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill={fill}
      className={className}
      aria-label={name}
    >
      <path d={icon.path} />
    </svg>
  )
}
