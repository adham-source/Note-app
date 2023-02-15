import { Request, Response } from "express"
import Note from "../models/Note"
import { IUser } from '../services/interfaces'
import { createLocals } from "../services/customFunctions"


export default class NoteControllers {
  
  /**
   * @desc Create a new note
   * @route GET /dashboard/notes/add
   * @access private
  */
  public async newNote(_req: Request, res: Response) {
    try {
      res.render('dashboard/notes/add', { locals: createLocals("Dashboard - Notes - Add new"), note: new Note() })
    } catch {
      res.status(500).render('dashboard/notes/add', { success: false, message: 'Something went wrong!', locals: createLocals("Errors") })
    }
  }

  /**
   * @desc Create a new note
   * @route POST /dashboard/notes
   * @access private
  */
  public async createNote(req: Request, res: Response): Promise<void> {
    const { _id } = req.user as IUser
    try {
      const note = await Note.create({ ...req.body, createdBy: _id })
      res.status(201).redirect(`/dashboard/notes/${note._id}`);
    } catch (error) {
      res.status(500).render('dashboard/notes/add', { success: false, message: 'Something went wrong!', locals: createLocals("Errors") })
    }
  }
  /**
   * @desc Get all notes
   * @route GET /dashboard/notes
   * @access private
  */
  public async getAllNotes(req: Request, res: Response): Promise<void> {
    const { _id } = req.user as IUser
    let perPage: number = 6
    let page: number = Number(req.query.page) || 1
    try {

      Note.aggregate([
        { $sort: { createdAt: -1 }},
        { $match: { createdBy: _id }},
        { $project: {
          title: { $substr: ['$title', 0, 30] },
          body: { $substr: ['$body', 0, 100] }
        }}
      ])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec( function (err, notes) {
        Note.countDocuments().where({ createdBy: _id }).exec( function (err, count) {
          console.log(count)
          if(err) {
            return res.send(err)
          }
          return res.render('dashboard/notes/index', {
            locals: createLocals("Dashboard - Notes"),
            notes: notes ? notes : [],
            current: page,
            pages: Math.ceil(count / perPage)
          });

        })
      })
    } catch {
      res.status(500).render('dashboard/notes/index', { success: false, message: 'Something went wrong!', locals: createLocals("Errors") })
    }
  }
  /**
   * @desc Get a single note by ID
   * @route GET /dashboard/notes/:id
   * @access private
  */
  public async getNote(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { _id } = req.user as IUser
    try {

      // Some info using code
      // const note = await Note.findById(id).where({createdBy: _id}).lean()
      
      const accessUser = await Note.findOne({ createdBy: _id, _id: id }).exec()
      if (!accessUser) {
        res.status(403).render('dashboard/notes/show', { success: false, message: "You do not have access", locals: createLocals("Errors") });
        return
      }

      const note = await Note.findById(id);
      if (!note) {
        res.status(400).render('dashboard/notes/show', { success: false, message: "Not found this note", locals: createLocals("Errors") });
        return
      }
      res.render('dashboard/notes/show', {
        locals: createLocals(`Dashboard - Notes ${note.title}`),
        note
      });
    } catch  {
      res.status(500).render('dashboard/notes/show', { success: false, message: 'Something went wrong!', locals: createLocals("Errors") })
    }
  }

  /**
   * @desc Update a note
   * @route GET /dashboard/notes/:id
   * @access private
  */
  public async editNote(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { _id } = req.user as IUser
    try {
      const note = await Note.findOne({_id: id, createdBy: _id}).exec()
      if(!note) {
        res.status(403).render('dashboard/notes/edit', { success: false, message: "You do not have access", locals: createLocals("Errors") });
        return
      }
      res.render(`dashboard/notes/edit`, {
        locals: createLocals("Dashboard - Notes - Update"),
        note})
    } catch  {
      res.status(500).render('dashboard/notes/edit', { success: false, message: 'Something went wrong!', locals: createLocals("Errors") })
    }
  }

  /**
   * @desc Update a note
   * @route PATCH /dashboard/notes/:id
   * @access private
  */
  public async updateNote(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { _id } = req.user as IUser
    try {
      const note = await Note.findByIdAndUpdate(
        { _id: id },
        { ...req.body },
        { new: true, runValidators: true }
      ).where({ createdBy: _id })
      res.redirect(`/dashboard/notes/${note!._id}`)
    } catch {
      res.status(500).render('dashboard/notes/edit', { success: false, message: 'Something went wrong!', locals: createLocals("Errors") })
    }
  }

  /**
   * @Method DELETE
   * @Route /dashboard/notes
   * @Access Private
  */
  public async deleteNote(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { _id } = req.user as IUser
    try {
      await Note.deleteOne({_id: id, createdBy: _id})
      res.redirect("/dashboard/notes")
    } catch  {
      res.status(500).render('dashboard/notes/show', { success: false, message: 'Something went wrong!', locals: createLocals("Errors") })
    }
  }

  /**
   * @Method GET
   * @Route /dashboard/notes/search
   * @Access Private
  */
  public searchNotePage(req: Request, res: Response): void {
    try {
      res.render('dashboard/notes/search', {
        notes: [],
        locals: createLocals("Dashboard - Notes - search"),
      })
    } catch(err) {
      console.log(err)
      res.status(500).render('dashboard/notes/search', { success: false, message: 'Something went wrong!', locals: createLocals("Errors") })
    }
  }

  /**
   * @Method POST
   * @Route /dashboard/notes/search
   * @Access Private
  */
  public async searchNote(req: Request, res: Response): Promise<void> {
    const { _id } = req.user as IUser
    let search = req.body.search
    const searchNoSpecialChars = search.replace(/[^a-zA-Z0-9]/g, "")
    try {
      const notes = await Note.find({
        $or: [
          { title: { $regex: new RegExp(searchNoSpecialChars, "i") }},
          { body: { $regex: new RegExp(searchNoSpecialChars, "i") } }
        ]
      }).where({ createdBy: _id }).exec()
      res.render('dashboard/notes/search', {
        notes: notes ? notes : [],
        locals: createLocals("Dashboard - Notes - search"),
      })
    } catch (error) {
      res.status(500).render('dashboard/notes/search', { success: false, message: 'Something went wrong!', locals: createLocals("Errors") })
    }
  }
}
