import React, { createContext, useState, useContext, useEffect } from 'react';

const FireDataContext = createContext();

export const FireDataProvider = ({ children }) => {
  const [fireIncidents, setFireIncidents] = useState([]);
  const [recentChanges, setRecentChanges] = useState([]);
  const [stats, setStats] = useState({
    totalIncidents: 0,
    monthlyIncidents: 0,
    livesSaved: 0,
    activeEquipment: 0
  });

  // Load initial data (mock API call)
  useEffect(() => {
    const initialData = [
      {
        id: 1,
        fireReportNumber: 'FR-2023-001',
        incidentAddress: '123 Main St, Kanpur',
        natureOfCall: 'Emergency',
        timestamp: '2023-06-15T09:30:00Z',
        isNew: false
      }
    ];
    setFireIncidents(initialData);
    updateStats(initialData);
  }, []);

  const updateStats = (incidents) => {
    setStats({
      totalIncidents: incidents.length,
      monthlyIncidents: incidents.filter(i => 
        new Date(i.timestamp) > new Date(Date.now() - 30*24*60*60*1000)
      ).length,
      livesSaved: incidents.reduce((sum, i) => sum + (i.savedDetails ? i.savedDetails.split(',').length : 0), 0),
      activeEquipment: 22 // This would come from equipment data
    });
  };

  const addIncident = (newIncident) => {
    const incidentWithId = {
      ...newIncident,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      isNew: true
    };
    
    const updatedIncidents = [incidentWithId, ...fireIncidents];
    setFireIncidents(updatedIncidents);
    setRecentChanges(prev => [incidentWithId, ...prev.slice(0, 4)]);
    updateStats(updatedIncidents);
    
    setTimeout(() => {
      setFireIncidents(prev => 
        prev.map(item => 
          item.id === incidentWithId.id ? {...item, isNew: false} : item
        )
      );
    }, 5000);
  };

  return (
    <FireDataContext.Provider value={{ 
      fireIncidents, 
      recentChanges, 
      stats,
      addIncident 
    }}>
      {children}
    </FireDataContext.Provider>
  );
};

export const useFireData = () => useContext(FireDataContext);