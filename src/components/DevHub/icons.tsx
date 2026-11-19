import React from 'react';
import {
  FaBookOpen,
  FaCalculator,
  FaCode,
  FaDatabase,
  FaDesktop,
  FaExchangeAlt,
  FaGlobe,
  FaHeart,
  FaLinkedin,
  FaPlay,
  FaPlug,
  FaQuestionCircle,
  FaRobot,
  FaRss,
  FaTools,
  FaYoutube,
} from 'react-icons/fa';
import {
  SiDiscord,
  SiDotnet,
  SiGithub,
  SiGo,
  SiJavascript,
  SiOpenjdk,
  SiPython,
  SiReddit,
  SiRust,
  SiX,
} from 'react-icons/si';

const iconProps = {'aria-hidden': true, focusable: false} as const;

export const languageIcons: Record<string, React.ReactElement> = {
  python: <SiPython {...iconProps} />,
  dotnet: <SiDotnet {...iconProps} />,
  java: <SiOpenjdk {...iconProps} />,
  javascript: <SiJavascript {...iconProps} />,
  go: <SiGo {...iconProps} />,
  rust: <SiRust {...iconProps} />,
};

export const communityIcons: Record<string, React.ReactElement> = {
  discord: <SiDiscord {...iconProps} />,
  github: <SiGithub {...iconProps} />,
  reddit: <SiReddit {...iconProps} />,
  qna: <FaQuestionCircle {...iconProps} />,
  x: <SiX {...iconProps} />,
  linkedin: <FaLinkedin {...iconProps} />,
};

export const toolIcons: Record<string, React.ReactElement> = {
  vscode: <FaCode {...iconProps} />,
  emulator: <FaDesktop {...iconProps} />,
  explorer: <FaDatabase {...iconProps} />,
  agentKit: <FaTools {...iconProps} />,
  mcpServer: <FaPlug {...iconProps} />,
  mcpToolkit: <FaRobot {...iconProps} />,
  capacity: <FaCalculator {...iconProps} />,
  migrate: <FaExchangeAlt {...iconProps} />,
  assistant: <FaRobot {...iconProps} />,
};

export const playIcon = <FaPlay {...iconProps} />;

/** Icons for the profile and website links on the Cosmonaut cards. */
export const personLinkIcons = {
  linkedin: <FaLinkedin {...iconProps} />,
  website: <FaGlobe {...iconProps} />,
} as const;

/** One icon per footer link, picked from its label so the footer's content stays defined in the site config. */
export function footerIcon(label: string): React.ReactElement {
  if (/linkedin/i.test(label)) return <FaLinkedin {...iconProps} />;
  if (/youtube/i.test(label)) return <FaYoutube {...iconProps} />;
  if (/discord/i.test(label)) return <SiDiscord {...iconProps} />;
  if (/^x$/i.test(label)) return <SiX {...iconProps} />;
  if (/q&a/i.test(label)) return <FaQuestionCircle {...iconProps} />;
  if (/blog/i.test(label)) return <FaRss {...iconProps} />;
  if (/github/i.test(label)) return <SiGithub {...iconProps} />;
  if (/open source/i.test(label)) return <FaCode {...iconProps} />;
  return <FaBookOpen {...iconProps} />;
}

export const heartIcon = <FaHeart {...iconProps} />;
