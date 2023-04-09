import { useState } from 'react';
import '../src/app/style.css';
import React, { useEffect } from 'react'
import html2canvas from 'html2canvas';
import { saveAs } from 'file-saver';
import path from 'path';
import axios from 'axios';

function RentCalculation() {
    useEffect(() => {
        document.title = 'Rent Calculation';
      }, []);
  const [roomType, setRoomType] = useState('');
  const [month, setMonth] = useState('');
  const [roomNumber, setRoomNumber] = useState('');
  const [ployRate, setPloyRate] = useState(0);
  const [oldwaterService, setoldWaterService] = useState(0);
  const [waterService, setWaterService] = useState(0);
  const [oldelectricService, setoldElectricService] = useState(0);
  const [electricService, setElectricService] = useState(0);
  const [parkingFee, setParkingFee] = useState(0);

  const handleRoomTypeChange = (event: any) => {
    setRoomType(event.target.value);
    if (event.target.value === 'Ploy 1') {
      setPloyRate(1900);
    } else if (event.target.value === 'Ploy 2') {
      setPloyRate(2100);
    }
  };

  const handleRoomNumberChange = (event: any) => {
    setRoomNumber(event.target.value);
  };
  const handlemonthChange = (event: any) => {
    setMonth(event.target.value);
  };

  const handleWaterServiceChange = (event: any) => {
    setWaterService(parseFloat(event.target.value));
  };

  const handleoldWaterServiceChange = (event :any) => {
    setoldWaterService(parseFloat(event.target.value))
  }

  const handleElectricServiceChange = (event: any) => {
    setElectricService(parseFloat(event.target.value));
  };

  const handleoldElectricServiceChange = (event: any) => {
    setoldElectricService(parseFloat(event.target.value));
  };

  const handleParkingFeeChange = (event: any) => {
    setParkingFee(parseFloat(event.target.value));
  };

  const delta_water_unit = Math.abs(waterService - oldwaterService);
  const delta_electric_unit = Math.abs(electricService - oldelectricService);
  const total = ployRate + (delta_water_unit*30) + (delta_electric_unit*8) + parkingFee;

  const handleDownload = () => {

    // Check for empty data arrays and inputs
    if (!electricService || !waterService || !roomNumber || !ployRate) {
      alert('Please enter all required data!');
    return;
    }
    const bill = document.createElement('canvas');
    bill.width = 600;
    bill.height = 400;
    const ctx = bill.getContext('2d');
  
    // Add null check for ctx
    if (!ctx) {
      return;
    }
  
    // Set background color
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, bill.width, bill.height);
  
    // Draw topic
    ctx.font = '32px TH SarabunPSK';
    ctx.fillStyle = '#000';
    ctx.fillText(`ห้อง ${roomNumber} Bill`, 20, 40);
  
    // Draw rows
    const x = 20;
    let y = 80;
    ctx.font = '26px TH SarabunPSK';
    ctx.fillStyle = '#000';
    ctx.fillText('Room Rates', x, y);
    ctx.fillText(`Month ${month}`, x, y+30);
    ctx.fillText(`Last Month Electric Units (${oldelectricService} units)`, x, y + 60);
    ctx.fillText(`This Month Electric Units (${electricService} units)`, x , y + 90);
    ctx.fillText(`Electric Services`, x , y + 120);
    ctx.fillText(`Last Month Water Units (${oldwaterService} units)`, x, y + 150);
    ctx.fillText(`This Month Water Units (${waterService} units)`, x, y + 180);
    ctx.fillText(`Water Services`, x , y + 210);
    ctx.fillText('Parking Fee', x, y + 240);
    ctx.fillStyle = '#888';
    ctx.fillText(`${ployRate}฿`, x + 200, y);
    ctx.fillText(`${delta_electric_unit * 8}฿`, x + 200, y + 120);
    ctx.fillText(`${delta_water_unit * 30}฿`, x + 200, y + 210);
    ctx.fillText(`${parkingFee}฿`, x + 200, y + 240);
  
    // Draw summary
    ctx.font = '32px TH SarabunPSK';
    ctx.fillStyle = '#000';
    ctx.fillText(`Summary Price: ${total}฿`, x, y + 270);
  
    // Download bill as image
    const link = document.createElement('a');
    link.download = `${roomNumber}-bill.jpeg`;
    link.href = bill.toDataURL('image/jpeg');
    link.click();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily : 'Mitr , sans-serif'}}>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', }}>
        <label htmlFor="roomType">Room Type:</label>
        <select id="roomType" value={roomType} onChange={handleRoomTypeChange} style={{ flexGrow: 1 }} required>
          <option value="">Please select a room type</option>
          <option value="Ploy 1">Ploy 1 (1900)</option>
          <option value="Ploy 2">Ploy 2 (2100)</option>
        </select>
      </div>
      {roomType && (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', }}>
          <label htmlFor="roomNumber">Room Number:</label>
          <input type="text" id="roomNumber" value={roomNumber} onChange={handleRoomNumberChange} style={{ flexGrow: 1 }} required />
        </div>
      )}
      {roomType && (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', }}>
          <label htmlFor="month">Month:</label>
          <input type="text" id="month" value={month} onChange={handlemonthChange} style={{ flexGrow: 1 }} required />
        </div>
      )}
      {roomType && (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', }}>
          <label htmlFor="oldwaterService">Last Month Water Units:</label>
          <input type="text" id="oldwaterService" value={oldwaterService || ''} onChange={handleoldWaterServiceChange} style={{ flexGrow: 1 }} required />
        </div>
      )}
      {roomType && (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', }}>
          <label htmlFor="waterService">This Month Water Units:</label>
          <input type="text" id="waterService" value={waterService || ''} onChange={handleWaterServiceChange} style={{ flexGrow: 1 }} required/>
        </div>
      )}
      {roomType && (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', }}>
          <label htmlFor="oldelectricService">Last Month Electric Units:</label>
          <input type="text" id="oldelectricService" value={oldelectricService || ''} onChange={handleoldElectricServiceChange} style={{ flexGrow: 1 }} required/>
        </div>
      )}
      {roomType && (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', }}>
          <label htmlFor="electricService">This Month Electric Units:</label>
          <input type="text" id="electricService" value={electricService || ''} onChange={handleElectricServiceChange} style={{ flexGrow: 1 }} required/>
        </div>
      )}
      {roomType && (
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', }}>
          <label htmlFor="parkingFee">Parking Fee:</label>
          <input type="text" id="parkingFee" value={parkingFee || ''} onChange={handleParkingFeeChange} style={{ flexGrow: 1 }} required/>
        </div>
      )}
      {roomType && (
        <h1 style={{ marginTop: '20px', textAlign: 'center' }}>
          Room Type: {roomType}, Room Number: {roomNumber}, Total Price: {total || 0}
        </h1>
      )}
      <button onClick={handleDownload}>Download</button>
    </div>
  );
} 

export default RentCalculation;