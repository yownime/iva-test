import { pgTable, text, integer, timestamp, numeric, serial } from "drizzle-orm/pg-core";

export const residents = pgTable("residents", {
  id: serial("id").primaryKey(),
  nik: text("nik").unique().notNull(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  address: text("address").notNull(),
  kelurahan: text("kelurahan").notNull(),
  testCount: integer("test_count").default(0).notNull(),
  lastTestDate: text("last_test_date"), // YYYY-MM-DD
  lat: numeric("lat").notNull(),
  lng: numeric("lng").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Resident = typeof residents.$inferSelect;
export type NewResident = typeof residents.$inferInsert;
