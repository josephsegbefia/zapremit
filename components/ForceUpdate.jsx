import { View, Text } from 'react-native';
import React, { useState, useCallback } from 'react';

const ForceUpdate = () => {
  const [, setTick] = useState(0);
  const update = useCallback(() => {
    setTick((tick) => tick + 1);
  }, []);
  return update;
};

export default ForceUpdate;
