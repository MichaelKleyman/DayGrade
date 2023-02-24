import React from 'react';
import { Button } from '@mui/material';
import Switch from '@mui/material/Switch';
import { BsSun, BsFillMoonFill } from 'react-icons/bs';

const Settings = () => {
  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  return (
    <div className='m-2'>
      <label className='uppercase tracking-widest text-lg'>
        Daygrade settings page
      </label>
      <div className='pt-5 grid grid-cols-3 gap-5'>
        <div>
          <div className='font-bold pb-2'>Erase Your Account</div>
          <Button sx={{ backgroundColor: 'green', color: 'white' }}>
            Delete
          </Button>
        </div>
        <div className='font-bold pb-2'>
          <div>Dark mode/Light mode</div>
          <div className='flex items-center'>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            {checked ? (
              <BsSun size={50} className='p-3' />
            ) : (
              <BsFillMoonFill size={50} className='p-3' />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
