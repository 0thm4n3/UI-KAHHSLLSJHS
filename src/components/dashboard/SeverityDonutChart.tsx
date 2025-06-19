import React, { useEffect, useRef } from 'react';
import { Card, CardHeader, CardContent } from '../ui/Card';
import { vulnerabilities } from '../../data/mockData';

const SeverityDonutChart: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Count vulnerabilities by severity
  const criticalCount = vulnerabilities.filter(v => v.severity === 'critical').length;
  const highCount = vulnerabilities.filter(v => v.severity === 'high').length;
  const mediumCount = vulnerabilities.filter(v => v.severity === 'medium').length;
  const lowCount = vulnerabilities.filter(v => v.severity === 'low').length;
  
  // Chart data
  const data = [criticalCount, highCount, mediumCount, lowCount];
  const labels = ['Critical', 'High', 'Medium', 'Low'];
  const colors = ['#ef4444', '#f97316', '#eab308', '#3b82f6'];
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    const size = 200;
    canvasRef.current.width = size;
    canvasRef.current.height = size;
    
    // Calculate total
    const total = data.reduce((acc, val) => acc + val, 0);
    
    // Draw donut chart
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 * 0.8;
    const innerRadius = radius * 0.6;
    
    if (total > 0) {
      let startAngle = -0.5 * Math.PI; // Start at top
      
      data.forEach((value, index) => {
        if (value === 0) return;
        
        const sliceAngle = (value / total) * 2 * Math.PI;
        const endAngle = startAngle + sliceAngle;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.arc(centerX, centerY, innerRadius, endAngle, startAngle, true);
        ctx.closePath();
        
        ctx.fillStyle = colors[index];
        ctx.fill();
        
        startAngle = endAngle;
      });
    } else {
      // Draw empty chart
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI, true);
      ctx.closePath();
      ctx.fillStyle = '#374151';
      ctx.fill();
    }
    
    // Draw center text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(total.toString(), centerX, centerY);
    
    ctx.fillStyle = '#9ca3af';
    ctx.font = '12px sans-serif';
    ctx.fillText('total', centerX, centerY + 20);
    
  }, [data]);
  
  return (
    <Card>
      <CardHeader>
        <h2 className="text-lg font-semibold text-white">Vulnerabilities by Severity</h2>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          <div className="relative">
            <canvas ref={canvasRef} className="mx-auto"></canvas>
          </div>
          
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mt-6">
            {labels.map((label, idx) => (
              <div key={idx} className="flex items-center">
                <span 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: colors[idx] }}
                ></span>
                <span className="text-sm text-gray-300">{label}</span>
                <span className="ml-auto text-sm font-semibold text-white">{data[idx]}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeverityDonutChart;