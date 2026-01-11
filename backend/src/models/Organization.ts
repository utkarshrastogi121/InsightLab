import mongoose, { Schema, Document } from "mongoose";

export interface IOrganization extends Document {
  name: string;
}

const organizationSchema = new Schema<IOrganization>({
  name: { type: String, required: true, unique: true },
});

export default mongoose.model<IOrganization>("Organization", organizationSchema);
