import { Types } from "mongoose";

export interface IUser {
    _id: Types.ObjectId;
}

export interface Locals {
    title: string,
    description: string
}