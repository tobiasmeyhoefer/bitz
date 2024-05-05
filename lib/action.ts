"use server"
import { products } from "@/schema";
import { db } from "../db"
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

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

// Delete function requiring productId as string
export async function deleteProduct(productId: string) {
    await db.delete(products).where(eq(products.id, productId));
}

// Update function requiring productData as 
export async function updateProduct() {
    
}


