import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IUserBase {
  name: string;
  email: string;
  password: string;
  profilePic?: {
    data: Buffer,
    contentType: string
  };
  networkConnections: Types.ObjectId[];
  createdAt: Date;
  preferences: {
    email: boolean;
    linkedin: boolean;
    whatsapp: boolean;
    instagram: boolean;
    twitter: boolean;
    github: boolean;
    facebook: boolean;
    wechat: boolean;
    youtube: boolean;
  };
}

export interface IUserDocument extends IUserBase, Document {}

export interface IUserModel extends mongoose.Model<IUserDocument> {}

const UserSchema = new Schema<IUserDocument>({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, required: true },
  profilePic: {
    data: Buffer,
    contentType: String
  },
  networkConnections: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  preferences: {
    email: { type: Boolean, default: false },
    linkedin: { type: Boolean, default: false },
    whatsapp: { type: Boolean, default: false },
    instagram: { type: Boolean, default: false },
    twitter: { type: Boolean, default: false },
    github: { type: Boolean, default: false },
    facebook: { type: Boolean, default: false },
    wechat: { type: Boolean, default: false },
    youtube: { type: Boolean, default: false },
  }
});

const User: IUserModel = mongoose.model<IUserDocument, IUserModel>('User', UserSchema);

export default User;