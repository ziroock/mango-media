import React, { Component } from 'react';
import MangoPost from '../dashboard/posts/MangoPost';
import { connect } from 'react-redux';
import { fetchFeed } from '../../actions';
import { isPersonal } from '../../utils/mango.utils';
import mangoSVGS from '../../utils/imporImages';

class MangoFeed extends Component {
  componentDidMount() {
    this.props.fetchFeed();
  }

  renderPostList() {
    let numberPosts = this.props.feed.length;
    // console.log(this.props.feed);
    if (numberPosts > 0) {
      return this.props.feed.reverse().map((post, i) => {
        let personalPost = isPersonal(this.props.userId, post._user);
        return <MangoPost key={post._id} post={post} isPersonal={personalPost} />;
      });
    } else {
      return <h3> No new posts from your friends! </h3>;
    }
  }

  render() {
    switch (this.props.userId) {
      case null:
        return <h2>Please Sign In to access dashboard!</h2>;
      case false:
        return <h2>Please Sign In to access dashboard!</h2>;
      default:
        return (
          <div className="feed-page-container">
            <div className="iphone-11-pro-x-dashboard screen">
              <div className="profile-header">
                <div className="login-mango-logo">
                  <img className="vector-ITwlaw" src={mangoSVGS.logo.logoM} />
                  <img className="vector-kF3OYB" src={mangoSVGS.logo.logoA} />
                  <img className="vector-cOJLMb" src={mangoSVGS.logo.logoN} />
                  <img className="vector-M9ep39" src={mangoSVGS.logo.logoG} />
                  <img className="vector-RSbzDa" src={mangoSVGS.logo.logoO} />
                </div>
              </div>
              <div className="mango-nav">
                <img className="vector-EBnxGb" src="img/vector@2x.png" />
                <img className="vector-0PzsAn" src="img/vector-29@2x.svg" />
              </div>
              <div className="mango-post-list">
                <div className="mango-post">
                  <div className="post-name-and-date">
                    <div className="mango-post-name roboto-normal-white-18px">Jon Doe</div>
                    <div className="mango-post-date roboto-normal-white-13px">1:50 01/07/20201</div>
                  </div>
                  <div className="mango-post-avatar-and-text">
                    <div className="mango-post-avatar"></div>
                    <div className="mango-post-inner-text-container">
                      <div className="mango-post-inner-text-box"></div>
                      <div className="mango-post-inner-text roboto-normal-white-13px">
                        This is a post that says bla bla
                      </div>
                    </div>
                  </div>
                  <div className="mango-post-reply">
                    <div className="mango-post-reply-name-and-date">
                      <div className="mango-post-reply-name roboto-normal-white-15px">Jonny Doe</div>
                      <div className="mango-post-reply-date roboto-normal-white-11px">1:50 01/07/20201</div>
                    </div>
                    <div className="mango-post-reply-avatar-and-text">
                      <div className="mango-post-reply-avatar"></div>
                      <div className="mango-post-reply-inner-text-container">
                        <div className="mango-post-reply-inner-text-box"></div>
                        <div className="mango-post-reply-inner-text roboto-normal-white-13px">Reply 123</div>
                      </div>
                    </div>
                  </div>
                  <div className="mango-post-show-more roboto-normal-screamin-green-13px">Show more</div>
                </div>
                <div className="mango-post">
                  <div className="post-name-and-date">
                    <div className="mango-post-name roboto-normal-white-18px">Joenna Doe</div>
                    <div className="mango-post-date roboto-normal-white-13px">1:50 01/07/20201</div>
                  </div>
                  <div className="mango-post-avatar-and-text">
                    <div className="mango-post-avatar"></div>
                    <div className="mango-post-inner-text-container">
                      <div className="mango-post-inner-text-box"></div>
                      <div className="mango-post-inner-text roboto-normal-white-13px">
                        This is a post that says bla bla
                      </div>
                    </div>
                  </div>
                  <div className="mango-post-reply">
                    <div className="mango-post-reply-name-and-date">
                      <div className="mango-post-reply-name roboto-normal-white-15px">Jonny Doe</div>
                      <div className="mango-post-reply-date roboto-normal-white-11px">1:50 01/07/20201</div>
                    </div>
                    <div className="mango-post-reply-avatar-and-text">
                      <div className="mango-post-reply-avatar"></div>
                      <div className="mango-post-reply-inner-text-container">
                        <div className="mango-post-reply-inner-text-box"></div>
                        <div className="mango-post-reply-inner-text roboto-normal-white-13px">
                          This is a very very very very very very very very very very long reply!
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="show-more-wq7Hyz roboto-normal-screamin-green-13px">Show more</div>
                </div>
                <div className="mango-post">
                  <div className="post-name-and-date">
                    <div className="mango-post-name roboto-normal-white-18px">Jon Doe</div>
                    <div className="mango-post-date roboto-normal-white-13px">1:50 01/07/20201</div>
                  </div>
                  <div className="mango-post-avatar-and-text">
                    <div className="mango-post-avatar"></div>
                    <div className="mango-post-inner-text-container">
                      <div className="mango-post-inner-text-box"></div>
                      <div className="mango-post-inner-text roboto-normal-white-13px">
                        This is a post that says bla bla
                      </div>
                    </div>
                  </div>
                  <div className="mango-post-reply">
                    <div className="mango-post-reply-name-and-date">
                      <div className="mango-post-reply-name roboto-normal-white-15px">Jonny Doe</div>
                      <div className="mango-post-reply-date roboto-normal-white-11px">1:50 01/07/20201</div>
                    </div>
                    <div className="mango-post-reply-avatar-and-text">
                      <div className="mango-post-reply-avatar"></div>
                      <div className="mango-post-reply-inner-text-container">
                        <div className="mango-post-reply-inner-text-box"></div>
                        <div className="mango-post-reply-inner-text roboto-normal-white-13px">Reply 123</div>
                      </div>
                    </div>
                  </div>
                  <div className="mango-post-show-more roboto-normal-screamin-green-13px">Show more</div>
                </div>
                <div className="mango-post">
                  <div className="post-name-and-date">
                    <div className="mango-post-name roboto-normal-white-18px">Jon Doe</div>
                    <div className="mango-post-date roboto-normal-white-13px">1:50 01/07/20201</div>
                  </div>
                  <div className="mango-post-avatar-and-text">
                    <div className="mango-post-avatar"></div>
                    <div className="mango-post-inner-text-container">
                      <div className="mango-post-inner-text-box"></div>
                      <div className="mango-post-inner-text roboto-normal-white-13px">
                        This is a post that says bla bla
                      </div>
                    </div>
                  </div>
                  <div className="mango-post-reply">
                    <div className="mango-post-reply-name-and-date">
                      <div className="mango-post-reply-name roboto-normal-white-15px">Jonny Doe</div>
                      <div className="mango-post-reply-date roboto-normal-white-11px">1:50 01/07/20201</div>
                    </div>
                    <div className="mango-post-reply-avatar-and-text">
                      <div className="mango-post-reply-avatar"></div>
                      <div className="mango-post-reply-inner-text-container">
                        <div className="mango-post-reply-inner-text-box"></div>
                        <div className="mango-post-reply-inner-text roboto-normal-white-13px">Reply 123</div>
                      </div>
                    </div>
                  </div>
                  <div className="mango-post-show-more roboto-normal-screamin-green-13px">Show more</div>
                </div>
              </div>
            </div>
            <div className="mango-post-list">{this.renderPostList()}</div>
          </div>
        );
    }
  }
}

function mapStateToProps(state) {
  return { feed: state.feed };
}

export default connect(mapStateToProps, { fetchFeed })(MangoFeed);
