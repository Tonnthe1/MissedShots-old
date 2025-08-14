import { Response } from 'express';
import User, { IUserDocument } from '../models/User';
import { AuthRequest } from '../types';
import { Types } from 'mongoose';

export const addNetworkConnection = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { email } = req.body;
    const user = await User.findById(userId) as IUserDocument | null;
    const connectionUser = await User.findOne({ email }) as IUserDocument | null;

    if (!user || !connectionUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if the connection already exists
    const connectionExists = user.networkConnections.some((connId) => 
      connId.equals(connectionUser._id as Types.ObjectId)
    );

    if (connectionExists) {
      return res.status(400).json({ message: 'Connection already exists' });
    }

    // Add the connection
    user.networkConnections.push(connectionUser._id as Types.ObjectId);
    await user.save();

    // Prepare the response data
    const connectionData = {
      _id: (connectionUser._id as Types.ObjectId).toString(),
      name: connectionUser.name,
      email: connectionUser.email,
    };

    res.json({ message: 'Connection added successfully', connection: connectionData });
  } catch (error) {
    console.error('Error adding network connection:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const getNetworkConnections = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const user = await User.findById(userId).populate<{ networkConnections: IUserDocument[] }>('networkConnections');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const connections = user.networkConnections.map(connection => ({
      _id: (connection._id as Types.ObjectId).toString(),
      name: connection.name,
      email: connection.email,
      meetTime: connection.createdAt.toISOString(),
      profilePic: connection.profilePic?.data 
        ? `data:${connection.profilePic.contentType};base64,${connection.profilePic.data.toString('base64')}` 
        : undefined
    }));

    res.json(connections);
  } catch (error) {
    console.error('Error fetching network connections:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateUserPreferences = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const preferences = req.body;
    const user = await User.findByIdAndUpdate(userId, { preferences }, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Preferences updated successfully', preferences: user.preferences });
  } catch (error) {
    console.error('Error updating user preferences:', error);
    res.status(500).json({ message: 'Server error' });
  }
};