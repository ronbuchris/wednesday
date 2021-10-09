import React from 'react';
import NavigationChevronRight from 'monday-ui-react-core/dist/icons/NavigationChevronRight';

import mainlogo from '../../assets/img/logo/mainlogo.png';
import image1 from '../../assets/img/homepage/image1.jpg';
import image2 from '../../assets/img/homepage/image2.png';

export class HomePage extends React.Component {
  componentDidMount() {
    document.title = `Welcome to Wednesday!`;
  }
  render() {
    return (
      <div className="main-home-page ">
        <div className="home-page flex column justify-center">
          <div className="head-line flex column align-center">
            <h1>Work Without Limits</h1>
            <h2>
              Easily build, run, and scale your dream workflows on one platform.
              <br></br>
              What would you like to manage with wednesday Work OS?
            </h2>
          </div>
          <div className="started flex auto-center btn">
            Get Started
            <NavigationChevronRight />
          </div>
          <div className="home-section flex">
            <div className="text">
              <h2 className="title">Manage everything in one workspace</h2>
              <div className="info">
                Planning, tracking and delivering your team’s best work has
                never been easier
              </div>
            </div>
            <img src={image2} alt="features" />
          </div>
          <div className="home-section flex">
            <div className="text">
              <h2 className="title">Visualize work with Views</h2>
              <div className="info">
                View data as a kanban, dahsboard and more
              </div>
            </div>
            <img src={image1} alt="features" />
          </div>
          <div className="home-section flex">
            <div className="text">
              <h2 className="title"></h2>
              <div className="info"></div>
            </div>
            {/* <img src={image1} alt="features" /> */}
          </div>

          <div className="bottom-section">
            <h2>Try wednesday for your team</h2>
            <div className="info">
              14-day free trial | No credit card needed
            </div>
          </div>
          <footer className="flex column">
            <div className="links flex auto-center">
              <div className="link">About us</div>
              <div className="link">Become a partner</div>
              <div className="link">Careers</div>
              <div className="link">Blog</div>
              <div className="link">Pricing</div>
              <div className="link">Contact sales</div>
              <div className="link">Terms and privacy</div>
              <div className="link">Product overview</div>
            </div>
            <div className="logo-footer">
              <img src={mainlogo} alt="logo" />
            </div>
            <div className="social"></div>
          </footer>
        </div>
      </div>
    );
  }
}
