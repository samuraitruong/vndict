import React from 'react'

import { makeStyles, Theme } from "@material-ui/core/styles"

import Typography from "@material-ui/core/Typography"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import ListItemText from "@material-ui/core/ListItemText"
import LabelImportantIcon from "@material-ui/icons/LabelImportant"

interface SuggestionListProps {
  suggests: any[],
  setKeyword?: any
  search?: any
}

const SuggestionList: React.FC<SuggestionListProps> = ({ suggests, setKeyword, search }) => {
  const classes = useStyles({})

  return (
    <>
      <Typography variant="h3" component="h3">
        {" "}
        Từ liên quan:
      </Typography>
      <List
        component="nav"
        className={classes.suggestList}
        aria-label="contacts"
      >
        {suggests.map((item: any) => (
          <ListItem
            key={item.word}
            button
            onClick={() => {
              setKeyword(item.word)
              search(item.word)
            }}
          >
            <ListItemIcon>
              <LabelImportantIcon />
            </ListItemIcon>
            <ListItemText primary={item.word} color="primary" />
          </ListItem>
        ))}
      </List>
    </>
  )
}

export default SuggestionList

const useStyles = makeStyles((theme: Theme) => ({
  suggestList: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(5)
  }
}))