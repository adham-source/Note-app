import { Locals } from "./interfaces"

export const createLocals = (title: string, description: string = "Free Notes App"): Locals => {
  const locals: Locals  = {
    title,
    description
  }
  return locals
}