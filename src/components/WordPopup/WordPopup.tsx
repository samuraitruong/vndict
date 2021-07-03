import {
  Dialog,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  makeStyles,
  Theme,
  createStyles,
  Box,
} from '@material-ui/core';

import React from 'react';

import CloseIcon from '@material-ui/icons/Close';
import { LinkInterceptor } from 'components/LinkInterceptor';
import { toProperCase } from 'services/util';
import WordSpeaker from 'common/WordSpeaker/WordSpeaker';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: 'relative',
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
    innerBox: {
      padding: theme.spacing(2),
    },
  }),
);

export const WordPopup: React.FC<{ word: any; onClose: () => void }> = ({
  word,
  onClose,
}) => {
  const classes = useStyles({});

  const handleClose = () => onClose();
  if (!word) return null;

  return (
    <Dialog
      fullScreen={window.innerWidth < 667}
      open={word != null}
      onClose={() => {}}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge='start'
            color='inherit'
            onClick={handleClose}
            aria-label='close'
          >
            <CloseIcon />
          </IconButton>
          <Typography variant='h6' className={classes.title}>
            {toProperCase(word.word)}{' '}
            {word.pronounce && <span> - {word.pronounce}</span>}
          </Typography>
          <WordSpeaker
            word={word.word}
            accents={['us', 'uk']}
            noStyle={true}
          ></WordSpeaker>
        </Toolbar>
      </AppBar>
      <Box className={classes.innerBox}>
        <LinkInterceptor
          html={word.content}
          onLinkClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
          }}
        ></LinkInterceptor>
      </Box>
    </Dialog>
  );
};
