import { ImageSlider } from '../components/ImageSlider';
import p1 from '../assets/01.jpg';
import p2 from '../assets/02.jpg';
import p3 from '../assets/03.jpg';
import p4 from '../assets/04.jpg';
import p5 from '../assets/05.jpg';

const IMAGES = [
  { url: p1, alt: 'Pic One' },
  { url: p2, alt: 'Pic Two' },
  { url: p3, alt: 'Pic Three' },
  { url: p4, alt: 'Pic Four' },
  { url: p5, alt: 'Pic Five' },
];

function Homepage() {

  
    return (<ImageSlider images={IMAGES} />);

  }
  
  export default Homepage;
  