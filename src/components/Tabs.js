import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableViews from 'react-swipeable-views';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

import MediaCard from './MediaCard';


const configs = [
  {
    name: 'KAZKA',
    url: 'http://styleinsider.com.ua/wp-content/uploads/2017/12/KAZKA.jpg',
    info: 'KAZKA is journey to Ukraine plans in a special way: together with the singer Alexandra, keyboardist Nikita and master of wind instruments Dima will be lit by the virtuoso drummer Yevgeny and the trio of hosts Darya, Yaryna and Vasilina. Some tracks of the girls album were complemented by stylized folk singing, so the favorite songs of the KARMA album got somewhat new sound and sentiment. Such KAZKA can be seen and heard only during live concerts.',
  },
  {
    name: 'Boombox',
    url: 'http://v.img.com.ua/b/1100x999999/0/59/350fd8239700179df9782be792278590.jpg',
    info: 'Thousands of people come to Andrei Khlivniuk team concerts for the most powerful emotions. These guys deserve the warmest reception. Be sure to come and give your idols a sea of applause!',
  },
  {
    name: 'The neighbourhood',
    url: 'https://ichef.bbci.co.uk/images/ic/960x540/p01v1hrg.jpg',
    info: 'From the release to the release of five musicians, all the more bold go to experiments, maneuvering between guitar and electronic sound, do not dare to flirt with the alternative rnB and hip-hop. Like confirming the breadth of his views, Jesse changed his image dramatically: he briefly cut and colored his hair and began to look with his tattoos, as an outspoken apologist for the California punk. A less prolific group with similar moves could cause distrust of fans, but these guys will have plenty of material to support the interest of fans of early black and white creativity, and to conquer a new audience.',
  },
    
];

const tabList = ['Main', 'All events', 'Personal office', 'About'];

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir} >
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  },
  eventsWrapper: {
      display: 'flex',
      padding: 15,
      flexWrap: 'wrap',
      justifyContent: 'center'
  },
  mainPageWrapper: {
    padding: 0
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  render() {
    const { classes, theme } = this.props;

    const panels = () => {
      return configs.map((item, index) =>
        <MediaCard
          cardName={item.name}
          key={index} 
          imgUrl={item.url}
          text={item.info}
        />
        )
    }
    const tabs = () => {
        return tabList.map((item, index) => <Tab key={index} label={item} />)
    };  

    return (
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
          >
          {tabs()}
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer className={classes.mainPageWrapper} dir={theme.direction}>
            <div className="header">
              <div className="header_title">Buy tickets online</div>
              <div className="header_slogan">Buy a ticket to a concert of your favorite artist<br/> without leaving your home</div>
              <div className="header_arrow">
                  <i className="fa fa-chevron-down"></i>
              </div>
            </div> 
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <div className={classes.eventsWrapper}>
              {panels()}
            </div>
          </TabContainer>
          <TabContainer dir={theme.direction}>All events</TabContainer>
          <TabContainer dir={theme.direction}>About</TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);