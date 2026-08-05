import React, { createContext, useContext, useState, ReactNode } from 'react';

interface VacationContextType {
  hasVacation: boolean;
  vacationPeriod: string;
  setVacation: (fromDate: string, toDate?: string) => void;
  deleteVacation: () => void;
}

const VacationContext = createContext<VacationContextType | undefined>(undefined);

export const VacationProvider = ({ children }: { children: ReactNode }) => {
  const [hasVacation, setHasVacation] = useState(false);
  const [vacationPeriod, setVacationPeriod] = useState('');

  const setVacation = (fromDate: string, toDate?: string) => {
    const period = toDate ? `From ${fromDate} to ${toDate}` : `From ${fromDate}`;
    setVacationPeriod(period);
    setHasVacation(true);
  };

  const deleteVacation = () => {
    setHasVacation(false);
    setVacationPeriod('');
  };

  return (
    <VacationContext.Provider value={{ hasVacation, vacationPeriod, setVacation, deleteVacation }}>
      {children}
    </VacationContext.Provider>
  );
};

export const useVacation = () => {
  const context = useContext(VacationContext);
  if (!context) {
    throw new Error('useVacation must be used within VacationProvider');
  }
  return context;
};
