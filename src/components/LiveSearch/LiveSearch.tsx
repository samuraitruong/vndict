import React from "react";
import { useTracking } from "hooks/useTracking";
import {
  Chip,
  makeStyles,
  Theme,
  createStyles,
  Grid,
  Typography,
  Zoom,
  CircularProgress
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    liveSearchWord: {
      margin: theme.spacing(1)
    },
    liveSearchContainer: {
      marginTop: theme.spacing(2)
    }
  })
);

export interface ILiveSearchProps {
  onWordClick: (word: string) => void;
}
const LiveSearch: React.FC<ILiveSearchProps> = ({ onWordClick }) => {
  const { trackData, error, loading } = useTracking();
  const classes = useStyles({});
  return (
    <Grid className={classes.liveSearchContainer}>
      <Typography variant="h5" color="primary">Tìm kiếm gần nhất ....</Typography>
      {Object.keys(trackData).map(key => {
        return (
          <Zoom in={true} key={key}>
            <Chip
              label={key}
              className={classes.liveSearchWord}
              clickable
              onClick={() => onWordClick(key)}
              size="small"
              color="primary"
            />
          </Zoom>
        );
      })}
      {loading && <CircularProgress color="secondary" />}
      {error && <span>Xin lỗi, đã xãy ra lỗi kết nối với máy chủ, vui lòng thử lại sau.</span>}
    </Grid>
  );
};
export default LiveSearch;
