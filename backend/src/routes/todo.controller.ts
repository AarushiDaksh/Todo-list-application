import { Response, NextFunction } from "express";
import { Todo } from "../models/Todo";
import { AuthRequest } from "../middleware/auth";

export const createTodo = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { title, description } = req.body;
    const todo = await Todo.create({
      title,
      description,
      user: req.userId,
    });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
};

export const getTodos = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const todos = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
};

export const updateTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const todo = await Todo.findOneAndUpdate(
      { _id: id, user: req.userId },
      { title, description, completed },
      { new: true }
    );

    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    next(err);
  }
};

export const deleteTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOneAndDelete({ _id: id, user: req.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    next(err);
  }
};

export const toggleTodo = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({ _id: id, user: req.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    todo.completed = !todo.completed;
    await todo.save();

    res.json(todo);
  } catch (err) {
    next(err);
  }
};
