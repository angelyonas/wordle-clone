import { useState, useEffect } from 'react';
import styles from './switchMode.module.css';

interface IEvent {
  target: ITarget;
}

interface ITarget {
  checked: boolean;
}

export const SwitchMode = () => {
  const [switchValue, setSwitchValue] = useState(false);

  useEffect(() => {
    localStorage.theme = 'ligth';

    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      setSwitchValue(true);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const handleChange = (evt: IEvent) => {
    const { checked } = evt.target;
    setSwitchValue(checked);
    if (checked) {
      localStorage.theme = 'ligth';
      document.documentElement.classList.remove('dark');
    } else {
      localStorage.theme = 'dark';
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className="ml-2">
      <input
        type="checkbox"
        name=""
        className={`${styles.switchmode} hidden`}
        checked={switchValue}
        onChange={handleChange}
        id="switch-mode"
      />
      <label
        htmlFor="switch-mode"
        className={`${styles.switchlabel} cursor-pointer`}
      >
        <div
          className={`${styles.switchblock} w-10 h-6 flex items-center rounded-full p2`}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow ${styles.switchball}`}
          ></div>
        </div>
      </label>
    </div>
  );
};
