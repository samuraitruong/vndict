import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import { styled } from "@mui/system";

import React from "react";

import CloseIcon from "@mui/icons-material/Close";
import { LinkInterceptor } from "components/LinkInterceptor";
import { toProperCase } from "services/util";
import WordSpeaker from "common/WordSpeaker/WordSpeaker";

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  position: "relative",
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  marginLeft: theme.spacing(2),
  flex: 1,
}));
const StyledBox = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

export const WordPopup: React.FC<{ word: any; onClose: () => void }> = ({
  word,
  onClose,
}) => {
  const handleClose = () => onClose();
  if (!word) return null;

  return (
    <Dialog
      fullScreen={window.innerWidth < 667}
      open={word != null}
      onClose={() => {}}
    >
      <StyledAppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <StyledTypography variant="h6">
            {toProperCase(word.word)}{" "}
            {word.pronounce && <span> - {word.pronounce}</span>}
          </StyledTypography>
          <WordSpeaker
            word={word.word}
            accents={["us", "uk"]}
            noStyle={true}
          ></WordSpeaker>
        </Toolbar>
      </StyledAppBar>
      <StyledBox>
        <LinkInterceptor
          html={word.content}
          onLinkClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
          }}
        ></LinkInterceptor>
      </StyledBox>
    </Dialog>
  );
};
