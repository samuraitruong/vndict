import React, { useState, useEffect, useCallback } from "react";
import { Box, Chip } from "@mui/material";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import { styled } from "@mui/system";
// import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { constants } from "../../constants";
import { isUrlExist } from "services/util";

const SpeakerIcon = styled(Chip)(({ theme }) => ({
  marginLeft: theme.spacing(3),
}));

export interface IWordSpeakerProps {
  word: string;
  accents?: string[];
  noStyle?: boolean;
}
export const WordSpeaker: React.FC<IWordSpeakerProps> = ({
  noStyle,
  word,
  accents,
}) => {
  const initialSound: { [x: string]: string } = {};
  const [sounds, setSounds] = useState(initialSound);
  //TODO : Fix the react warning, somehow it complaint about accents
  const verifyExistingResource = useCallback(async () => {
    const items: { [x: string]: string } = {};
    if (word) {
      for (const item of accents) {
        const url = `${
          constants.RESOURCE_URL
        }/voice/${word.toLocaleLowerCase()}_${item}.mp3`;
        const existed = await isUrlExist(url);
        if (existed) {
          items[item] = url;
        }
      }
    }
    setSounds(items);
    // eslint-disable-next-line
  }, [word]);
  useEffect(() => {
    verifyExistingResource();
  }, [verifyExistingResource]);
  const playSound = (accent?: "us" | "uk") => {
    const url = `${
      constants.RESOURCE_URL
    }/voice/${word.toLocaleLowerCase()}_${accent}.mp3`;
    const audio = new Audio(url);
    audio.play();
  };
  return (
    <Box className="float-right">
      {accents.map((a) => (
        <SpeakerIcon
          key={a}
          clickable={sounds[a] != null}
          disabled={!sounds[a]}
          color={!noStyle && a === "us" ? "secondary" : "primary"}
          onClick={() => playSound(a as "uk" | "us")}
          icon={<VolumeDownIcon />}
          label={a.toUpperCase()}
        />
      ))}
    </Box>
  );
};

export default WordSpeaker;
