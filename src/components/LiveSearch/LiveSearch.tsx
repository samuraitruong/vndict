import React from "react";
import { useTracking } from "hooks/useTracking";
import { Chip, Grid, Typography, Zoom, CircularProgress } from "@mui/material";

import { styled } from "@mui/system";

const LiveSearchWord = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const LiveSearchContainer = styled(Grid)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

export interface ILiveSearchProps {
  onWordClick: (word: string) => void;
}
const LiveSearch: React.FC<ILiveSearchProps> = ({ onWordClick }) => {
  const { trackData, error, loading } = useTracking();
  return (
    <LiveSearchContainer>
      <Typography variant="h5" color="primary">
        Tìm kiếm gần nhất ....
      </Typography>
      {trackData ? (
        Object.keys(trackData).map((key) => {
          return (
            <Zoom in={true} key={key}>
              <LiveSearchWord
                label={key}
                clickable
                onClick={() => onWordClick(key)}
                size="small"
                color="primary"
              />
            </Zoom>
          );
        })
      ) : (
        <span>Chưa có dữ liệu</span>
      )}
      {loading && <CircularProgress color="secondary" />}
      {error && (
        <span>
          Xin lỗi, đã xãy ra lỗi kết nối với máy chủ, vui lòng thử lại sau.
        </span>
      )}
    </LiveSearchContainer>
  );
};
export default LiveSearch;
