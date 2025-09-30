import { useState } from 'react';
import { Title } from './components/Title';

function App() {
  const [visible, setVisible] = useState(true);

  const handleStart = () => {
    setVisible(false);
  };

  return (
    <div className='bg-black w-full min-h-screen'>
      {visible && <Title onStart={handleStart} />}
      {!visible && <div className='text-white'>여기 우주 들어감</div>}
    </div>
  );
}

export default App;
