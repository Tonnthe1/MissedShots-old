import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NewNetwork.module.css";
import { getNetworkConnections, addNetworkConnection, generateQRCode } from '../services/api';
import CustomAlert from "../components/CustomAlert";
import QRCode from 'qrcode.react';

interface NetworkConnection {
  _id: string;
  name: string;
  meetTime: string;
  profilePic: string;
}

const NewNetwork: React.FC = () => {
  const navigate = useNavigate();
  const [connections, setConnections] = useState<NetworkConnection[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newConnection, setNewConnection] = useState({ name: '', email: '', phone: '' });
  const [alert, setAlert] = useState<{ type: 'error' | 'success'; title: string; message: string } | null>(null);
  const [qrCode, setQRCode] = useState<string | null>(null);

  useEffect(() => {
    fetchNetworkConnections();
  }, []);

  const fetchNetworkConnections = async () => {
    try {
      const fetchedConnections = await getNetworkConnections();
      setConnections(fetchedConnections);
    } catch (error) {
      console.error('Error fetching network connections:', error);
      setAlert({ 
        type: 'error', 
        title: 'Error', 
        message: `Failed to fetch network connections: ${error instanceof Error ? error.message : 'Unknown error'}` 
      });
    }
  };

  const onBackToEventsClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onMyQRCodeClick = useCallback(async () => {
    try {
      const qrCodeData = await generateQRCode();
      setQRCode(qrCodeData);
    } catch (error) {
      console.error('Error generating QR code:', error);
      setAlert({ type: 'error', title: 'Error', message: 'Failed to generate QR code' });
    }
  }, []);

  const onProfileClick = useCallback((connectionId: string) => {
    navigate(`/personal-info/${connectionId}`);
  }, [navigate]);

  const handleAddConnection = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const addedConnection = await addNetworkConnection(newConnection);
      setConnections(prev => [...prev, addedConnection]);
      setNewConnection({ name: '', email: '', phone: '' });
      setShowAddForm(false);
      setAlert({ type: 'success', title: 'Success', message: 'New connection added' });
    } catch (error) {
      console.error('Error adding new connection:', error);
      setAlert({ type: 'error', title: 'Error', message: 'Failed to add new connection' });
    }
  };

  return (
    <div className={styles.newNetwork}>
      <div className={styles.topBar}>
        <b className={styles.eventName}>Network</b>
        <div className={styles.buttonContainer}>
          <button className={styles.backToEvents} onClick={onBackToEventsClick}>
            Back to Events
          </button>
          <button className={styles.myQrCode} onClick={onMyQRCodeClick}>
            My QR Code
          </button>
        </div>
      </div>

      {qrCode && (
        <div className={styles.qrCodeContainer}>
          <QRCode value={qrCode} />
        </div>
      )}

      <button className={styles.addConnectionButton} onClick={() => setShowAddForm(true)}>
        Add New Connection
      </button>

      {showAddForm && (
        <form className={styles.addConnectionForm} onSubmit={handleAddConnection}>
          <input
            type="text"
            placeholder="Name"
            value={newConnection.name}
            onChange={(e) => setNewConnection({...newConnection, name: e.target.value})}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={newConnection.email}
            onChange={(e) => setNewConnection({...newConnection, email: e.target.value})}
            required
          />
          <input
            type="tel"
            placeholder="Phone"
            value={newConnection.phone}
            onChange={(e) => setNewConnection({...newConnection, phone: e.target.value})}
          />
          <button type="submit">Add</button>
          <button type="button" onClick={() => setShowAddForm(false)}>Cancel</button>
        </form>
      )}

      <div className={styles.networkChain}>
        {connections.map((connection, index) => (
          <div key={index} className={styles.connectionItem} onClick={() => onProfileClick(connection._id)}>
            <img
              className={styles.profilePic}
              alt=""
              src={connection.profilePic || '/default-profile-pic.png'}
            />
            <div className={styles.connectionInfo}>
              Met {connection.name} at {new Date(connection.meetTime).toLocaleString()}
            </div>
            {index < connections.length - 1 && <div className={styles.arrow}>↓</div>}
          </div>
        ))}
      </div>

      {alert && (
        <CustomAlert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
};

export default NewNetwork;