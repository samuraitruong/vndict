import React from "react";

import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LabelImportantIcon from "@mui/icons-material/LabelImportant";
import { Box, Divider } from "@mui/material";
import { styled } from "@mui/system";

interface SuggestionListProps {
  suggests: any[];
  setKeyword?: any;
  search?: any;
}

const SuggestionBox = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(3),
}));

const SuggestionList: React.FC<SuggestionListProps> = ({
  suggests,
  setKeyword,
  search,
}) => {
  return (
    suggests &&
    suggests.length > 0 && (
      <SuggestionBox>
        <Divider />
        <Typography variant="h3" component="h5" style={{ marginTop: "25px" }}>
          Từ liên quan:
        </Typography>
        <List component="nav" aria-label="contacts">
          {suggests.map((item: any) => (
            <ListItem
              key={item.word}
              button
              onClick={() => {
                setKeyword(item.word);
                search(item.word);
              }}
            >
              <ListItemIcon>
                <LabelImportantIcon />
              </ListItemIcon>
              <ListItemText primary={item.word} color="primary" />
            </ListItem>
          ))}
        </List>
      </SuggestionBox>
    )
  );
};

export default SuggestionList;
