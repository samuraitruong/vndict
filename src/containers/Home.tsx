import React, { useState, FormEvent, useEffect, useCallback } from 'react';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import SuggestionList from 'components/SuggestionList';

import Typography from '@material-ui/core/Typography';

import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import TranslateIcon from '@material-ui/icons/Translate';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import CloseIcon from '@material-ui/icons/Close';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { LinkInterceptor } from 'components/LinkInterceptor';
import { useParams, useHistory } from 'react-router';
import { WordPopup } from 'components/WordPopup/WordPopup';
import { fetchWord } from 'services/api';
import { toProperCase } from 'services/util';
import constants from '../constants';
import { Menu, MenuItem, Link } from '@material-ui/core';
import { WordSpeaker } from 'common/WordSpeaker/WordSpeaker';
import LiveSearch from 'components/LiveSearch/LiveSearch';
import useSpeechInput from 'hooks/useSpeechInput';
import MicIcon from '@material-ui/icons/Mic';
import { useAutocomplete } from 'hooks/useAutoComplete';
import { useDebounce } from 'hooks/useDebounce';

interface PageParams {
  word?: string;
}
interface DictData {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
    divider: {
      height: 1,
      marginTop: theme.spacing(1),
    },
    container: {
      margin: theme.spacing(1, 0),
      paddingTop: theme.spacing(2),
    },
    speakButton: {
      marginLeft: theme.spacing(3),
    },
    snackbar: {
      backgroundColor: theme.palette.error.dark,
    },
    autoComplete: {
      margin: theme.spacing(1),
    },
  }),
);

const Home: React.FC = () => {
  const source = localStorage.getItem('SOURCE_ID') || 'html';
  const speakAccents = ['uk', 'us'];
  let history = useHistory();
  const classes = useStyles({});
  const [sourceId, setSourceId] = useState(source);
  const [data, setData] = useState<DictData>();
  const [popupWord, setPopupWord] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [suggestionList, setSuggestionList] = useState([]);
  const [type, setType] = useState('en_vn');
  const [message, setMessage] = useState(null);
  const { word } = useParams<PageParams>();
  const [liveSearch, setLiveSearch] = useState(true);
  const autocomplete = useDebounce(keyword, 500);
  const { autoCompleteItems, autoCompleteLoading, setAutoCompleteItems } =
    useAutocomplete(autocomplete);

  const search = useCallback(
    async (inputKeyword: string) => {
      if (!inputKeyword) return;
      const { data, suggestions } = await fetchWord(inputKeyword, sourceId);

      if (data) {
        setLiveSearch(false);
        setType('en_vn');
        setData(data);
        setMessage(null);
        history.push(inputKeyword);
        window.scrollTo({ top: 0 });
      } else {
        setLiveSearch(true);
        setData({});
        setSuggestionList(suggestions);
        setMessage(
          'Xin lỗi, từ bạn tìm kiếm không tồn tại hoặc chưa được cập nhật',
        );
      }
      setAutoCompleteItems([]);
    },
    [history, sourceId, setAutoCompleteItems],
  );
  const onVoiceResultCb = useCallback(
    (input) => {
      setKeyword(input);
      search(input);
    },
    [search],
  );
  const voiceStartedCB = useCallback(() => {
    setKeyword('');
  }, []);

  const { isBrowserSupportSpeech, startVoiceInput, started } = useSpeechInput(
    onVoiceResultCb,
    voiceStartedCB,
  );
  const onWordClick = async (clickedWord: string) => {
    const response = await fetchWord(clickedWord, sourceId);
    if (response.data && response.data.en_vn && response.data.en_vn.data) {
      setPopupWord(response.data.en_vn.data);
    }
  };
  useEffect(() => {
    setKeyword(word);
    search(word);
  }, [word, search]);

  const dict = data && (data as any)[type];
  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    dictType: string,
  ) => {
    setType(dictType);
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    search(keyword);
    return false;
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleSourceMenuClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value?: string) => {
    if (constants.DATA_SOURCE_ID.some((x) => x === value)) {
      localStorage.setItem('SOURCE_ID', value);
      setSourceId(value);
    }
    setAnchorEl(null);
  };
  const reset = () => {
    setLiveSearch(true);
    setKeyword('');
    setData(null);
    history.push('/');
  };

  return (
    <React.Fragment>
      <Grid container className={classes.container}>
        <Grid item sm={6} xs={12}>
          <form onSubmit={handleSubmit}>
            <Paper className={classes.root}>
              <IconButton
                className={classes.iconButton}
                aria-label='menu'
                onClick={handleSourceMenuClick}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  disabled={sourceId === 'html'}
                  onClick={() => handleClose('html')}
                >
                  Từ điển 1
                </MenuItem>
                <MenuItem
                  disabled={sourceId === 'data'}
                  onClick={() => handleClose('data')}
                >
                  Từ điển 2
                </MenuItem>
              </Menu>
              <InputBase
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className={classes.input}
                placeholder={
                  started ? 'Nói từ muốn tìm kiếm' : 'Nhập từ muốn tìm'
                }
                inputProps={{ 'aria-label': 'English -> Vietnamese' }}
              />
              {isBrowserSupportSpeech && (
                <IconButton
                  disabled={started}
                  onClick={() => startVoiceInput()}
                  className={classes.iconButton}
                  aria-label='voice input'
                >
                  <MicIcon color={started ? 'secondary' : 'inherit'} />
                </IconButton>
              )}

              <IconButton
                type='submit'
                className={classes.iconButton}
                aria-label='search'
              >
                <SearchIcon />
              </IconButton>
              <Divider className={classes.divider} orientation='vertical' />
              <IconButton
                color='primary'
                className={classes.iconButton}
                aria-label='directions'
                onClick={reset}
              >
                <AutorenewIcon />
              </IconButton>
            </Paper>
          </form>
        </Grid>

        {dict && (
          <Grid item sm={6} xs={12}>
            <ToggleButtonGroup
              value={type}
              exclusive
              onChange={handleTypeChange}
              style={{ float: 'right' }}
              aria-label='select dictionary options'
            >
              <ToggleButton value='en_vn' aria-label='left aligned'>
                <TranslateIcon></TranslateIcon> {'Eng -> Vi'} &nbsp;
              </ToggleButton>
              <ToggleButton value='en_en' aria-label='centered'>
                <SwapHorizIcon /> {'Eng -> Eng'} &nbsp;
              </ToggleButton>
              <ToggleButton value='synonyms' aria-label='right aligned'>
                <AccountTreeIcon /> Đồng Nghĩa
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        )}
        <Grid xs={12} item container>
          {autoCompleteLoading && <span>Loading....</span>}
          {autoCompleteItems.length > 0 &&
            autoCompleteItems.map((x) => (
              <Link
                key={x}
                color='primary'
                href={x}
                className={classes.autoComplete}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  search(x);
                }}
              >
                {x}
              </Link>
            ))}
        </Grid>
      </Grid>
      {dict && (
        <Grid>
          <Grid xs={12} item>
            <Typography variant='h3' component='span'>
              {dict.data ? toProperCase(dict.data.word) : ''}
            </Typography>
            <Typography variant='h4' component='span'>
              <Box color='text.secondary' component='span'>
                {dict.data && dict.data.pronounce
                  ? `  (${dict.data.pronounce})`
                  : ''}
              </Box>
            </Typography>
            <WordSpeaker
              word={dict.data.word}
              accents={speakAccents}
              noStyle={false}
            ></WordSpeaker>
            <Divider className={classes.divider} />
            <LinkInterceptor
              html={dict.data && dict.data.content}
              onWordClick={onWordClick}
              onLinkClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                const arr = e.currentTarget.href.split('/');
                const word = arr[arr.length - 1];
                setKeyword(word);
                search(word);
              }}
            />
            {popupWord && (
              <WordPopup
                word={popupWord}
                onClose={() => setPopupWord(null)}
              ></WordPopup>
            )}
            {dict.suggests && (
              <Grid>
                <SuggestionList
                  suggests={dict.suggests}
                  setKeyword={setKeyword}
                  search={search}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      )}

      {message && (
        <SnackbarContent
          className={classes.snackbar}
          message={
            <React.Fragment>
              <Typography variant='subtitle2'>{message}</Typography>

              {suggestionList && suggestionList.length > 0 && (
                <React.Fragment>
                  <span>Có thể bạn quan tâm :</span>
                  {suggestionList.map((x) => (
                    <Link
                      key={x}
                      style={{ color: '#fff', cursor: 'pointer' }}
                      onClick={() => search(x)}
                    >
                      {x}
                    </Link>
                  ))}{' '}
                </React.Fragment>
              )}
            </React.Fragment>
          }
          action={
            <IconButton
              key='close'
              aria-label='close'
              color='inherit'
              onClick={() => setMessage(null)}
            >
              <CloseIcon />
            </IconButton>
          }
        ></SnackbarContent>
      )}
      {liveSearch && (
        <LiveSearch
          onWordClick={(liveSearchWord) => search(liveSearchWord)}
        ></LiveSearch>
      )}
    </React.Fragment>
  );
};

export default Home;
