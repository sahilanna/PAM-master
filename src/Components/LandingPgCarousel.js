import Carousel from 'react-bootstrap/Carousel';

function NoTransitionExample() {
  return (
    <Carousel slide={false}>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="download.png"
          alt="First slide"
        />
        <Carousel.Caption>
          
          <p className='carousel-caption'>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="images.jpeg"
          alt="Second slide"
        />

        <Carousel.Caption>
        
          <p className='carousel-caption'>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src=""
          alt="Third slide"
        />

        <Carousel.Caption>
          
          <p className='carousel-caption'>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default NoTransitionExample;