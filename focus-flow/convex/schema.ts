import { defineSchema, defineTable, v } from "convex/schema";

export default defineSchema({
  tasks: defineTable({
    title: v.string(),
    priority: v.union(v.literal("low"), v.literal("medium"), v.literal("high")),
    dueDate: v.optional(v.string()), // ISO string
    category: v.string(),
    completed: v.boolean(),
    userId: v.string(),
  }),
});