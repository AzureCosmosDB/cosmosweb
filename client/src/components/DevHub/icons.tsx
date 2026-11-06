import React from 'react';
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
  SiStackoverflow,
  SiX,
  SiYoutube,
} from 'react-icons/si';
import {FaRss} from 'react-icons/fa';

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
  blog: <FaRss {...iconProps} />,
  stackoverflow: <SiStackoverflow {...iconProps} />,
  x: <SiX {...iconProps} />,
  linkedin: <SiLinkedin {...iconProps} />,
};
