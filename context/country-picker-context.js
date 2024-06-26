import { createContext, useContext, useState, useEffect } from 'react';
const CountryPickerContext = createContext();
export const useCountryPickerContext = () => useContext(CountryPickerContext);

const CountryPickerProvider = ({ children }) => {
  const [countryData, setCountryData] = useState({
    callingCode: '',
    code: '',
    name: '',
    phone: '',
    flag: '',
    completePhone: '',
    currencyName: '',
    currencyCode: '',
    currencySymbol: '',
  });

  return (
    <CountryPickerContext.Provider
      value={{
        countryData,
        setCountryData,
      }}
    >
      {children}
    </CountryPickerContext.Provider>
  );
};

export default CountryPickerProvider;
