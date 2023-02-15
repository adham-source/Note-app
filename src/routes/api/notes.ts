import { Router } from "express";
import NoteControllers  from "../../controllers/notes";
import Validator from "../../middlewares/validator";

const noteControllers = new NoteControllers();
const noteValidator = new Validator()

const { newNote, createNote, getAllNotes, getNote, editNote, updateNote, deleteNote, searchNotePage, searchNote } = noteControllers
const { validateNote } = noteValidator

const router = Router()

router.route('/').get(getAllNotes).post(validateNote, createNote)
router.route('/add').get(newNote)
router.route('/edit/:id').get(editNote).patch(validateNote, updateNote)
router.route("/:id").get(getNote).delete(deleteNote)
router.route("/search").get(searchNotePage).post(searchNote)

export default router