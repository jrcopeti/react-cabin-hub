import { PAGE_SIZE } from "../utils/constants";

import supabase from "./supabase";

export async function getAllGuests() {
  const { data, error } = await supabase.from("guests").select("*");

  if (error) throw new Error("Guests could not be loaded");

  return data;
}

export async function getGuests({ sortBy, page }) {
  let query = supabase.from("guests").select("*", { count: "exact" });

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }
  if (page) {
    const from = (page - 1) * (PAGE_SIZE - 1);
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) throw new Error("Guests could not be loaded");

  return { data, count };
}

export async function getGuestsWithBookings({ filter, sortBy, page }) {
  let query = supabase
    .from("guests")
    .select("*, bookings!inner(*)", { count: "exact" });

  // Filter
  if (filter) {
    query = query[filter.method || "eq"](filter.field, filter.value);
  }

  if (sortBy) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }
  if (page) {
    const from = (page - 1) * (PAGE_SIZE - 1);
    const to = from + PAGE_SIZE - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) throw new Error("Guests could not be loaded");

  return { data, count };
}

export async function createGuest(newGuest) {
  const { data, error } = await supabase
    .from("guests")
    .insert([{ ...newGuest }])
    .select();

  if (error) throw new Error("Guest could not be created");

  return data;
}

export async function updateGuest(id, newGuestData) {
  const { data, error } = await supabase
    .from("guests")
    .update(newGuestData)
    .eq("id", id)
    .select();

  if (error) {
    console.error(error);
    throw new Error("Guest could not be updated");
  }
  return data;
}

export async function deleteGuest(id) {
  const { data, error } = await supabase.from("guests").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error(`Guest could not be deleted`);
  }

  return data;
}
