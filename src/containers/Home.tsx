import React, { useState, FormEvent, useEffect, useCallback } from "react";
import { styled } from "@mui/system";

import SuggestionList from "components/SuggestionList";

import Typography from "@mui/material/Typography";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import SnackbarContent from "@mui/material/SnackbarContent";

import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ToggleButton from "@mui/lab/ToggleButton";
import ToggleButtonGroup from "@mui/lab/ToggleButtonGroup";
import TranslateIcon from "@mui/icons-material/Translate";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import CloseIcon from "@mui/icons-material/Close";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import { LinkInterceptor } from "components/LinkInterceptor";
import { useMatch, useNavigate } from "react-router";
import { WordPopup } from "components/WordPopup/WordPopup";
import { fetchWord } from "services/api";
import { toProperCase } from "services/util";
import constants from "../constants";
import { Menu, MenuItem, Link } from "@mui/material";
import { WordSpeaker } from "common/WordSpeaker/WordSpeaker";
import LiveSearch from "components/LiveSearch/LiveSearch";
import useSpeechInput from "hooks/useSpeechInput";
import MicIcon from "@mui/icons-material/Mic";
import { useAutocomplete } from "hooks/useAutoComplete";
import { useDebounce } from "hooks/useDebounce";

interface PageParams extends Record<string, string> {
  word?: string;
}
interface DictData {}

const SnackbarContentStyled = styled(SnackbarContent)(({ theme }) => ({
  backgroundColor: theme.palette.error.dark,
}));

const AutoCompleteLink = styled(Link)(({ theme }) => ({
  margin: theme.spacing(1),
}));
const StyledDivider = styled(Divider)(({ theme }) => ({
  height: 1,
  marginTop: theme.spacing(1),
}));

const KeywordTextBox = styled(TextField)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
}));

const CustomIconButton = styled(IconButton)(({ theme }) => ({
  padding: 10,
}));

const MainContainer = styled(Grid)(({ theme }) => ({
  margin: theme.spacing(1, 0),
  paddingTop: theme.spacing(2),
}));

const PaperRoot = styled(Paper)(({ theme }) => ({
  padding: "2px 4px",
  display: "flex",
  alignItems: "center",
  width: "100%",
}));

const Home: React.FC = () => {
  const source = localStorage.getItem("SOURCE_ID") || "html";
  const speakAccents = ["uk", "us"];
  const navigate = useNavigate();
  const [sourceId, setSourceId] = useState(source);
  const [data, setData] = useState<DictData>();
  const [popupWord, setPopupWord] = useState(null);
  const [keyword, setKeyword] = useState("");
  const [suggestionList, setSuggestionList] = useState([]);
  const [type, setType] = useState("en_vn");
  const [message, setMessage] = useState(null);
  const matchUrl = useMatch("/:word");
  const [liveSearch, setLiveSearch] = useState(true);
  const autocomplete = useDebounce(keyword, 500);
  const { word } = matchUrl.params || {};
  console.log("memem", word);
  const { autoCompleteItems, autoCompleteLoading, setAutoCompleteItems } =
    useAutocomplete(autocomplete);

  const search = useCallback(
    async (inputKeyword: string) => {
      if (!inputKeyword) return;
      const { data, suggestions } = await fetchWord(inputKeyword, sourceId);
      console.log(inputKeyword, data);
      if (data) {
        setLiveSearch(false);
        setType("en_vn");
        setData(data);
        setMessage(null);
        navigate("/" + inputKeyword);
        window.scrollTo({ top: 0 });
      } else {
        setLiveSearch(true);
        setData({});
        setSuggestionList(suggestions);
        setMessage(
          "Xin lỗi, từ bạn tìm kiếm không tồn tại hoặc chưa được cập nhật"
        );
      }
      setAutoCompleteItems([]);
    },
    [navigate, sourceId, setAutoCompleteItems]
  );
  const onVoiceResultCb = useCallback(
    (input: string) => {
      setKeyword(input);
      search(input);
    },
    [search]
  );
  const voiceStartedCB = useCallback(() => {
    setKeyword("");
  }, []);

  const { isBrowserSupportSpeech, startVoiceInput, started } = useSpeechInput(
    onVoiceResultCb,
    voiceStartedCB
  );
  const onWordClick = async (clickedWord: string) => {
    const response = await fetchWord(clickedWord, sourceId);
    if (response.data && response.data.en_vn && response.data.en_vn.data) {
      setPopupWord(response.data.en_vn.data);
    }
  };
  useEffect(() => {
    console.log("word changed");
    setKeyword(word);
    search(word);
  }, [word, search]);

  const dict = data && (data as any)[type];
  const handleTypeChange = (
    event: React.MouseEvent<HTMLElement>,
    dictType: string
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
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (value?: string) => {
    if (constants.DATA_SOURCE_ID.some((x) => x === value)) {
      localStorage.setItem("SOURCE_ID", value);
      setSourceId(value);
    }
    setAnchorEl(null);
  };
  const reset = () => {
    setLiveSearch(true);
    setKeyword("");
    setData(null);
    navigate("/");
  };

  return (
    <React.Fragment>
      <MainContainer container>
        <Grid item sm={6} xs={12}>
          <form onSubmit={handleSubmit}>
            <PaperRoot>
              <CustomIconButton
                aria-label="menu"
                onClick={handleSourceMenuClick}
              >
                <MenuIcon />
              </CustomIconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem
                  disabled={sourceId === "html"}
                  onClick={() => handleClose("html")}
                >
                  Từ điển 1
                </MenuItem>
                <MenuItem
                  disabled={sourceId === "data"}
                  onClick={() => handleClose("data")}
                >
                  Từ điển 2
                </MenuItem>
              </Menu>
              <KeywordTextBox
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                placeholder={
                  started ? "Nói từ muốn tìm kiếm" : "Nhập từ muốn tìm"
                }
                inputProps={{ "aria-label": "English -> Vietnamese" }}
              />
              {isBrowserSupportSpeech && (
                <CustomIconButton
                  disabled={started}
                  onClick={() => startVoiceInput()}
                  aria-label="voice input"
                >
                  <MicIcon color={started ? "secondary" : "inherit"} />
                </CustomIconButton>
              )}

              <CustomIconButton type="submit" aria-label="search">
                <SearchIcon />
              </CustomIconButton>
              <StyledDivider orientation="vertical" />
              <CustomIconButton
                color="primary"
                aria-label="directions"
                onClick={reset}
              >
                <AutorenewIcon />
              </CustomIconButton>
            </PaperRoot>
          </form>
        </Grid>

        {dict && (
          <Grid item sm={6} xs={12}>
            <ToggleButtonGroup
              value={type}
              exclusive
              onChange={handleTypeChange}
              style={{ float: "right" }}
              aria-label="select dictionary options"
            >
              <ToggleButton value="en_vn" aria-label="left aligned">
                <TranslateIcon></TranslateIcon> {"Eng -> Vi"} &nbsp;
              </ToggleButton>
              <ToggleButton value="en_en" aria-label="centered">
                <SwapHorizIcon /> {"Eng -> Eng"} &nbsp;
              </ToggleButton>
              <ToggleButton value="synonyms" aria-label="right aligned">
                <AccountTreeIcon /> Đồng Nghĩa
              </ToggleButton>
            </ToggleButtonGroup>
          </Grid>
        )}
        <Grid xs={12} item container>
          {autoCompleteLoading && <span>Loading....</span>}
          {autoCompleteItems.length > 0 &&
            autoCompleteItems.map((x) => (
              <AutoCompleteLink
                key={x}
                color="primary"
                href={x}
                onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  e.preventDefault();
                  search(x);
                }}
              >
                {x}
              </AutoCompleteLink>
            ))}
        </Grid>
      </MainContainer>
      {dict && (
        <Grid>
          <Grid xs={12} item>
            <Typography variant="h3" component="span">
              {dict.data ? toProperCase(dict.data.word) : ""}
            </Typography>
            <Typography variant="h4" component="span">
              <Box color="text.secondary" component="span">
                {dict.data && dict.data.pronounce
                  ? `  (${dict.data.pronounce})`
                  : ""}
              </Box>
            </Typography>
            <WordSpeaker
              word={dict.data.word}
              accents={speakAccents}
              noStyle={false}
            ></WordSpeaker>
            <StyledDivider />
            <LinkInterceptor
              html={dict.data && dict.data.content}
              onWordClick={onWordClick}
              onLinkClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                const arr = e.currentTarget.href.split("/");
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
        <SnackbarContentStyled
          message={
            <React.Fragment>
              <Typography variant="subtitle2">{message}</Typography>

              {suggestionList && suggestionList.length > 0 && (
                <React.Fragment>
                  <span>Có thể bạn quan tâm :</span>
                  {suggestionList.map((x) => (
                    <Link
                      key={x}
                      style={{ color: "#fff", cursor: "pointer" }}
                      onClick={() => search(x)}
                    >
                      {x}
                    </Link>
                  ))}{" "}
                </React.Fragment>
              )}
            </React.Fragment>
          }
          action={
            <CustomIconButton
              key="close"
              aria-label="close"
              color="inherit"
              onClick={() => setMessage(null)}
            >
              <CloseIcon />
            </CustomIconButton>
          }
        ></SnackbarContentStyled>
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
