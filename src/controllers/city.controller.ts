import { Request, Response } from "express";
import prisma from "../lib/clients";

export const getAllCities = async (req: Request, res: Response) => {
  try {
    const cities = await prisma.city.findMany({ take: 10 });
    return res
      .status(200)
      .json({ data: cities, message: "Cities retrieved successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to retrieve cities!",
    });
  }
};

export const addCity = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name)
    return res.status(400).json({
      data: null,
      message: "City name cannot be empty. Failed to add city!",
    });
  try {
    const newCity = await prisma.city.create({
      data: { name },
    });
    return res
      .status(201)
      .json({ data: newCity, message: "City added successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to add city!",
    });
  }
};

export const updateCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const updatedCity = await prisma.city.update({
      where: { id },
      data: { name },
    });
    return res.status(200).json({
      data: updatedCity,
      message: "City data updated successfully!",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to update city!",
    });
  }
};

export const deleteCity = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedCity = await prisma.city.delete({ where: { id } });
    return res
      .status(200)
      .json({ data: deletedCity, message: "City data deleted successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      data: null,
      message: "Something went wrong. Failed to delete city data!",
    });
  }
};
