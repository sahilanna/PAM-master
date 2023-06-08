import React from 'react'
import { PieChart, Pie, Legend, Tooltip,Cell } from 'recharts';
import { useEffect,useState } from 'react';
function Analytics() {
    const data = [
        { name: 'Users', value: 100 },
        { name: 'PMs', value: 50 },
        { name: 'Admins', value: 20 },
      ];
      const COLORS = ['#FFBB28', '#FF8042', '#0088FE']; 
  return (
    <div> <PieChart width={600} height={600}>
    <Pie
      dataKey="value" // Replace 'value' with the key of the value in your data object
      data={data}
      cx={200}
      cy={200}
      outerRadius={80}
      fill="#8884d8"
      label
    >
     {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        </Pie>
    <Tooltip />
    <Legend />
  </PieChart></div>
  )
}

export default Analytics