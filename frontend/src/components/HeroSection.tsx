import  { FC } from 'react';
import './HeroSection.css'; 
import { Button } from './Button';

const HeroSection: FC = () => {
  return (
    <div className="hero-container">
      <h1>Savings made Simple</h1>
      <p>What are you waiting for?</p>
      <div className='btns'>
      <Button
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GET STARTED
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;

