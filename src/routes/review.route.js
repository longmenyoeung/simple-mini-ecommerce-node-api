import express from "express";
import { createReview, getlistReviews, removeReview, updateReview } from "../controllers/review.controller.js";
const reviewRoute = express.Router();

reviewRoute.get('/', getlistReviews);
reviewRoute.post('/',createReview);
reviewRoute.delete('/:id', removeReview);
reviewRoute.put('/:id',updateReview);


export default reviewRoute;