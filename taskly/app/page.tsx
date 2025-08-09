"use client";

import { useState } from "react";
import { Authenticated, Unauthenticated, useQuery, useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
// import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="min-h-dvh flex flex-col">
      <header className="sticky top-0 z-10 border-b border-neutral-200 dark:border-neutral-800 bg-background/80 backdrop-blur px-4 py-3 flex items-center justify-between">
        <h1 className="text-xl font-semibold tracking-tight">Taskly</h1>
        <UserButton afterSignOutUrl="/" />
      </header>
      <main className="flex-1 p-4 md:p-8">
        <Authenticated>
          <TodoApp />
        </Authenticated>
        <Unauthenticated>
          <AuthGate />
        </Unauthenticated>
      </main>
    </div>
  );
}

function AuthGate() {
  return (
    <div className="max-w-sm mx-auto text-center space-y-4">
      <h2 className="text-xl font-medium">Welcome to Taskly</h2>
      <p className="text-sm text-neutral-600 dark:text-neutral-400">Sign in to manage your private todos.</p>
      <div className="flex items-center justify-center gap-2">
        <SignInButton mode="modal">
          <button className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900">Sign in</button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="px-4 py-2 rounded-md border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-900">Sign up</button>
        </SignUpButton>
      </div>
    </div>
  );
}

function TodoApp() {
  const [text, setText] = useState("");
  const todos = useQuery(api.myFunctions.listTodos, {}) ?? [];
  const createTodo = useMutation(api.myFunctions.createTodo);
  const toggleCompleted = useMutation(api.myFunctions.toggleCompleted);
  const updateTodo = useMutation(api.myFunctions.updateTodo);
  const deleteTodo = useMutation(api.myFunctions.deleteTodo);

  const onAdd = async () => {
    const title = text.trim();
    if (!title) return;
    await createTodo({ title });
    setText("");
  };

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="flex gap-2">
        <Input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") void onAdd();
          }}
          placeholder="Add a new todo"
          className="flex-1"
        />
        <Button
          onClick={onAdd}
          variant="outline"
        >
          Add
        </Button>
      </div>

      <ul className="divide-y divide-neutral-200 dark:divide-neutral-800 rounded-md border border-neutral-200 dark:border-neutral-800">
        {todos.length === 0 && (
          <li className="p-4 text-sm text-neutral-600 dark:text-neutral-400">No todos yet</li>
        )}
        {todos.map((t) => (
          <li key={t._id} className="p-3 flex items-start gap-3">
            <Checkbox
              aria-label={t.completed ? "Mark incomplete" : "Mark complete"}
              checked={t.completed}
              onCheckedChange={() => toggleCompleted({ id: t._id, completed: !t.completed })}
              className="mt-0.5"
            />
            <div className="flex-1 space-y-1">
              <InlineEditable
                value={t.title}
                onChange={async (val) => updateTodo({ id: t._id, title: val })}
                className={cn(
                  "text-sm",
                  t.completed && "line-through text-neutral-500"
                )}
              />
              {t.description ? (
                <p className="text-xs text-neutral-500">{t.description}</p>
              ) : null}
              <MetaRow dueDate={t.dueDate} priority={t.priority} tags={t.tags} />
            </div>
            <Button onClick={() => deleteTodo({ id: t._id })} variant="ghost" className="h-8 px-2 text-xs">
              Delete
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function InlineEditable({
  value,
  onChange,
  className,
}: {
  value: string;
  onChange: (val: string) => void | Promise<unknown>;
  className?: string;
}) {
  const [editing, setEditing] = useState(false);
  const [local, setLocal] = useState(value);

  return (
    <div>
      {editing ? (
        <input
          autoFocus
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          onBlur={() => {
            setEditing(false);
            if (local.trim() && local.trim() !== value) void onChange(local.trim());
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              (async () => {
                setEditing(false);
                if (local.trim() && local.trim() !== value) await onChange(local.trim());
              })();
            } else if (e.key === "Escape") {
              setEditing(false);
              setLocal(value);
            }
          }}
          className={cn(
            "w-full rounded-sm border border-neutral-300 dark:border-neutral-700 bg-background px-1 py-0.5 text-sm"
          )}
        />
      ) : (
        <button
          onClick={() => setEditing(true)}
          className={cn("text-left", className)}
        >
          {value}
        </button>
      )}
    </div>
  );
}

function MetaRow({
  dueDate,
  priority,
  tags,
}: {
  dueDate?: number;
  priority?: "low" | "medium" | "high";
  tags?: string[];
}) {
  if (!dueDate && !priority && !(tags && tags.length)) return null;
  return (
    <div className="flex flex-wrap gap-2 text-[10px] text-neutral-500">
      {dueDate ? <Badge variant="outline">Due {new Date(dueDate).toLocaleDateString()}</Badge> : null}
      {priority ? <Badge variant="outline">Priority: {priority}</Badge> : null}
      {tags && tags.length ? <Badge variant="outline">Tags: {tags.join(", ")}</Badge> : null}
    </div>
  );
}
