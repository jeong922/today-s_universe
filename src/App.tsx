import { useState } from 'react';
import { Title } from './components/Title';
import { Universe } from './components/Universe';

function App() {
  const [visible, setVisible] = useState(true);

  const handleStart = () => {
    setVisible(false);
  };

  return (
    <div className='bg-black w-full min-h-screen'>
      {visible && <Title onStart={handleStart} />}
      {!visible && (
        <div className='w-full h-screen'>
          <Universe />
        </div>
      )}
    </div>
  );
}

export default App;
