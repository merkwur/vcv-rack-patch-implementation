import { useState, useEffect, createContext } from 'react';
import Sequencer from '../sequencer/sequencer.component'
import CircularSlider from '@fseehawer/react-circular-slider';
import "./clock.styles.scss"


const sequenceLenght = Array.from({length: 24}, (_, i) => i + 1) //[...Array(24).keys()].map(String)

export const ClockContext = createContext();


const Clock = ({ bpm }) => {
  const [time, setTime] = useState(0);
  const [BPM, setBPM] = useState(bpm);
  const [updateBPM, setUpdateBPM] = useState(bpm)
  const [step, setStep] = useState(8)
  const [intervalId, setIntervalId] = useState(null);
  
  const startClock = () => {
    clearInterval(intervalId);
    const id = setInterval(() => setTime(prevTime => prevTime + 1), 60000 / bpm);
    setIntervalId(id);
    
  };

  const handleStepChange = (value)=>{
    setStep(value)
  }
  
  const stopClock = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    setTime(0);
  };
  
  useEffect(() => {
    if (intervalId) {
      clearInterval(intervalId);
      const id = setInterval(() => setTime(prevTime => prevTime + 1), 60000 / bpm);
      setIntervalId(id);
    }
  }, [bpm]);

  const handleBPMChange = (event) => {
    const newBPM = event.target.valueAsNumber;
    setBPM(newBPM)
  };
  
  const handleKeyDown = (event) => {
    if (event.key === "Enter"){
      if (intervalId) {
        clearInterval(intervalId);
        const id = setInterval(() => setTime(prevTime => prevTime + 1), 60000 / BPM);
        setIntervalId(id);
      }
      setUpdateBPM(BPM)
    }
  }

  return (
    
      <div className='about-time'>
          <div className='clock-panel'>
            <div className='header'>Clock</div>
            <div className='counter'>
              {time}
            </div>
            <div className='bpm-panel'>
              <label 
                className='bpm-text'
                htmlFor="bpm-input">BPM</label>
              <input
                className='bpm-input'
                type="number"
                id="bpm-input"
                value={BPM}
                onChange={handleBPMChange}
                onKeyDown={handleKeyDown}
                min="1"
                max="300"
              />
            </div>
            <div className='step-wrapper'>
          <CircularSlider
              key={1}
              width={100}
              className="steps"
              hideKnob={false}
              labelFontSize={"14pt"}
              valueFontSize={'18pt'}
              verticalOffset={"0px"}
              label="steps"
              labelColor="#aa4242"
              knobColor="#aa4242"
              progressColorFrom="#aa4242"
              progressColorTo="#ff4242"
              progressSize={6}
              knobSize={18}
              knobColor="#aa4242"
              trackColor="#000000"
              trackSize={6}
              data={sequenceLenght} //...
              dataIndex={7}
              onChange={ (value) => { handleStepChange(value) } }
          />
        </div>
            <div className='buttons'>
              <button className='clock-button start' onClick={startClock}>Start</button>      
              <button className='clock-button stop' onClick={stopClock}>Stop</button>
            </div>
          </div>
          <div>
            {/* <ClockContext.Provider value={[]}>
              <Sequencer steps={8} currentStep={time}/>
            </ClockContext.Provider> */}
          </div>      

      </div>

  );
};

export default Clock;