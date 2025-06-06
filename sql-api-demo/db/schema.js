const { pgTable, serial, varchar, char, integer, text, foreignKey } = require("drizzle-orm/pg-core");

const heroesTable = pgTable("heroes", {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 100 }).notNull(),
  gender: char({ length: 1 }),
  age: integer(),
  heroLevel: char("hero_level", { length: 1 }).notNull(),
  heroRank: integer("hero_rank"),
  description: text()
});

const monstersTable = pgTable("monsters", {
  id: serial().primaryKey().notNull(),
  name: varchar({ length: 100 }).notNull(),
  dangerLevel: char("danger_level", { length: 1 }).notNull(),
  killBy: integer("kill_by"),
  description: text()
}, (table) => [
foreignKey({
  columns: [table.killBy],
  foreignColumns: [heroesTable.id],
  name: "fk_kill_by"
})
  .onUpdate("restrict")
  .onDelete("set null")]
);

module.exports = {
  heroesTable,
  monstersTable
}