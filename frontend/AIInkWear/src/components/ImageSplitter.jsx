import React from 'react';

class ImageSplitter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLoaded: false,
      sections: []
    };
  }

  componentDidMount() {
    const { uri } = this.props;
    this.loadImage(uri);
  }

  loadImage(uri) {
    const img = new Image();
    img.src = uri;
    img.onload = () => {
      const { width, height } = img;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const sections = [
        ctx.getImageData(0, 0, width / 2, height / 2),
        ctx.getImageData(width / 2, 0, width / 2, height / 2),
        ctx.getImageData(0, height / 2, width / 2, height / 2),
        ctx.getImageData(width / 2, height / 2, width / 2, height / 2)
      ];
      this.setState({ imageLoaded: true, sections });
    };
  }

  render() {
    const { imageLoaded, sections } = this.state;

    if (!imageLoaded) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <div style={{ float: 'left' }}>
          <img src={this.props.uri} alt="Section 1" />
        </div>
        <div style={{ float: 'right' }}>
          <img
            src={this.props.uri}
            alt="Section 2"
            style={{ marginLeft: '50%' }}
          />
        </div>
        <div style={{ clear: 'both' }} />
        <div style={{ float: 'left' }}>
          <img src={this.props.uri} alt="Section 3" />
        </div>
        <div style={{ float: 'right' }}>
          <img
            src={this.props.uri}
            alt="Section 4"
            style={{ marginLeft: '50%' }}
          />
        </div>
      </div>
    );
  }
}

export default ImageSplitter;
