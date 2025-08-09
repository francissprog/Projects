import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  todos: defineTable({
    userId: v.string(),
    title: v.string(),
    completed: v.boolean(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()), // Unix ms timestamp
    priority: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high"))
    ),
    tags: v.optional(v.array(v.string())),
  })
    .index("by_userId", ["userId"]) 
    .index("by_userId_and_completed", ["userId", "completed"]) 
    .index("by_userId_and_dueDate", ["userId", "dueDate"]),
});
