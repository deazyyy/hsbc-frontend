import React, { useContext } from 'react';
import {
  withStyles,
  createStyles,
  WithStyles,
  Theme,
} from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { AuthContext } from 'contexts/AuthContext';
import { MyTheme } from 'theme';
import { Header } from 'layout/Header';

type ClassKey = 'root';

const styles = (theme: Theme) => {
  const myTheme = theme as MyTheme;
  return createStyles({
    root: {
      background: darken(myTheme.palette.primary.main, 0.5),
      color: myTheme.palette.background.default,
    },
  });
};

type ProfileProps = WithStyles<ClassKey>;

const ProfileView = ({ classes }: ProfileProps) => {
  const { user } = useContext(AuthContext);

  return (
    <div className={classes.root}>
      <Header />
      <Container maxWidth="xl">
        <Typography component="div">
          <h2 className="h2">Profile</h2>
        </Typography>
      </Container>
    </div>
  );
};

export const Profile = withStyles(styles)(ProfileView);

export default Profile;
