import { model, models, Schema } from "mongoose";

export interface IModel {
  tag: Schema.Types.ObjectId;
  question: Schema.Types.ObjectId;
}

const ModelSchema = new Schema<IModel>(
  {
    tag: { type: Schema.Types.ObjectId, ref: "Tag", required: true },
    question: { type: Schema.Types.ObjectId, ref: "Question", required: true },
  },
  {
    timestamps: true,
  }
);

const Model = models?.Model || model<IModel>("Model", ModelSchema);

export default Model;
