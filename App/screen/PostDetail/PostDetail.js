import React, { PureComponent } from "react";

import PostItemDetail from './PostItemDetail';

class PostDetail extends PureComponent {

  render() {
    return (
      <PostItemDetail item={this.props.item} />
    );
  }
}

export default PostDetail;