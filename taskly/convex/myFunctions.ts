import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

// Todos API (user-scoped)

export const listTodos = query({
  args: {
    showCompleted: v.optional(v.boolean()),
    search: v.optional(v.string()),
    tag: v.optional(v.string()),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
  },
  returns: v.array(
    v.object({
      _id: v.id("todos"),
      _creationTime: v.number(),
      userId: v.string(),
      title: v.string(),
      completed: v.boolean(),
      description: v.optional(v.string()),
      dueDate: v.optional(v.number()),
      priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
      tags: v.optional(v.array(v.string())),
    })
  ),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const userId = identity.subject;

    let q = ctx.db
      .query("todos")
      .withIndex("by_userId", (q2) => q2.eq("userId", userId))
      .order("desc");

    // We avoid filter; rely on client-side light filtering for search/tag/priority for now
    const todos = await q.collect();

    const text = (args.search ?? "").toLowerCase();
    const filtered = todos.filter((t) => {
      if (args.showCompleted === false && t.completed) return false;
      if (args.showCompleted === true && !t.completed) return false;
      if (args.tag && !(t.tags ?? []).includes(args.tag)) return false;
      if (args.priority && t.priority !== args.priority) return false;
      if (text) {
        const hay = `${t.title} ${(t.description ?? "")}`.toLowerCase();
        if (!hay.includes(text)) return false;
      }
      return true;
    });

    return filtered;
  },
});

export const createTodo = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.number()),
    priority: v.optional(v.union(v.literal("low"), v.literal("medium"), v.literal("high"))),
    tags: v.optional(v.array(v.string())),
  },
  returns: v.id("todos"),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const userId = identity.subject;

    const id = await ctx.db.insert("todos", {
      userId,
      title: args.title.trim(),
      description: args.description,
      completed: false,
      dueDate: args.dueDate,
      priority: args.priority,
      tags: args.tags,
    });
    return id;
  },
});

export const toggleCompleted = mutation({
  args: { id: v.id("todos"), completed: v.boolean() },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Not found");
    if (todo.userId !== identity.subject) throw new Error("Forbidden");
    await ctx.db.patch(args.id, { completed: args.completed });
    return null;
  },
});

export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    dueDate: v.optional(v.union(v.number(), v.null())),
    priority: v.optional(
      v.union(v.literal("low"), v.literal("medium"), v.literal("high"), v.null())
    ),
    tags: v.optional(v.union(v.array(v.string()), v.null())),
  },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Not found");
    if (todo.userId !== identity.subject) throw new Error("Forbidden");

    const updates: Record<string, unknown> = {};
    if (args.title !== undefined) updates.title = args.title.trim();
    if (args.description !== undefined) updates.description = args.description;
    if (args.dueDate !== undefined) updates.dueDate = args.dueDate ?? undefined;
    if (args.priority !== undefined)
      updates.priority = (args.priority ?? undefined) as unknown;
    if (args.tags !== undefined) updates.tags = args.tags ?? undefined;

    await ctx.db.patch(args.id, updates);
    return null;
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  returns: v.null(),
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const todo = await ctx.db.get(args.id);
    if (!todo) throw new Error("Not found");
    if (todo.userId !== identity.subject) throw new Error("Forbidden");
    await ctx.db.delete(args.id);
    return null;
  },
});
