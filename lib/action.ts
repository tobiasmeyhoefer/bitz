"use server"
import { db } from "../db"
import { revalidatePath } from "next/cache";

// export async function addProduct(formData:any) {
//   const {id, title, description, price, currency, quantity, location, status} = Object.fromEntries(formData);
//   await db.insert(Products).values({  title: title,
//                                       description: description,
//                                       price: price,
//                                       currency: currency,
//                                       quantity: quantity,
//                                       location: location,
//                                       sellerId: "",  VLT mit auth an die Id kommen
//                                       status: status,
//                                   });
// }