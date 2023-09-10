import { useState, useMemo } from 'react'

const useEnum = (enumValues, defaultValue) => {
  const [currentValue, setCurrentValue] = useState(defaultValue);

  const setters = useMemo(() => {
    return enumValues.reduce((acc, value) => {
      acc[value] = () => setCurrentValue(value);
      return acc;
    }, {});
  }, [enumValues]);

  return [currentValue, setters];
};

export default useEnum
