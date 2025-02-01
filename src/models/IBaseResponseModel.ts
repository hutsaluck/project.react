import {IUser} from "./IUser.ts";
import {IRecipe} from "./IRecipe.ts";

export interface IBaseResponseModel {
  users?: IUser[];
  recipes?: IRecipe[];
  total: number;
  skip: number;
  limit: number;
}