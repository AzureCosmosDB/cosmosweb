import React from 'react';
import {
  FaCalculator,
  FaCode,
  FaDatabase,
  FaDesktop,
  FaExchangeAlt,
  FaPlay,
  FaPlug,
  FaRobot,
  FaRss,
  FaTools,
} from 'react-icons/fa';
import {
  SiDiscord,
  SiDotnet,
  SiGithub,
  SiGo,
  SiJavascript,
  SiLinkedin,
  SiMeetup,
  SiOpenjdk,
  SiPython,
  SiReddit,
  SiStackoverflow,
  SiX,
  SiYoutube,
} from 'react-icons/si';

const iconProps = {'aria-hidden': true, focusable: false} as const;

export const languageIcons: Record<string, React.ReactElement> = {
  python: <SiPython {...iconProps} />,
  dotnet: <SiDotnet {...iconProps} />,
  java: <SiOpenjdk {...iconProps} />,
  javascript: <SiJavascript {...iconProps} />,
  go: <SiGo {...iconProps} />,
};

export const communityIcons: Record<string, React.ReactElement> = {
  discord: <SiDiscord {...iconProps} />,
  github: <SiGithub {...iconProps} />,
  youtube: <SiYoutube {...iconProps} />,
  meetup: <SiMeetup {...iconProps} />,
  reddit: <SiReddit {...iconProps} />,
  blog: <FaRss {...iconProps} />,
  stackoverflow: <SiStackoverflow {...iconProps} />,
  x: <SiX {...iconProps} />,
  linkedin: <SiLinkedin {...iconProps} />,
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
