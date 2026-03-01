"use client";

import { useEffect, useRef, useState } from "react";
import AdminShell from "../../../../components/admin/AdminShell";
import Image from "next/image";

type Item = {
  id: string;
  title: string | null;
  description: string | null;
  imageUrl: string;
  sortOrder: number;
  isPublished: boolean;
  createdAt: string;
};

export default function AdminGalleryPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [items, setItems] = useState<Item[]>([]);
  const [loadingList, setLoadingList] = useState(true);

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [uploading, setUploading] = useState(false);

  async function refresh() {
    setLoadingList(true);
    const res = await fetch("/api/admin/gallery/list");
    const data = await res.json();
    setItems(data.items || []);
    setLoadingList(false);
  }

  useEffect(() => {
    refresh();
  }, []);

  function openPicker() {
    fileInputRef.current?.click();
  }

  async function upload(e: React.FormEvent) {
    e.preventDefault();
    if (!file) return alert("Please select an image first.");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("description", desc);

    setUploading(true);
    const res = await fetch("/api/admin/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setUploading(false);

    if (res.ok && data.ok) {
      setTitle("");
      setDesc("");
      setFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      await refresh();
      alert("Uploaded!");
    } else {
      alert(data?.error || "Upload failed");
    }
  }

  async function updateItem(id: string, patch: Partial<Item>) {
    const res = await fetch("/api/admin/gallery/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...patch }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      alert(data?.error || "Update failed");
      return;
    }
    await refresh();
  }

  async function deleteItem(id: string) {
    if (!confirm("Delete this item?")) return;
    const res = await fetch("/api/admin/gallery/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const data = await res.json();
    if (!res.ok || !data.ok) {
      alert(data?.error || "Delete failed");
      return;
    }
    await refresh();
  }

  return (
    <AdminShell title="Gallery">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h1 className="text-3xl font-semibold">Admin • Gallery</h1>
          <p className="text-gray-600 mt-2">
            Upload, publish/unpublish, edit details, and control ordering.
          </p>
        </div>
        <a
          className="text-sm underline"
          href="/gallery"
          target="_blank"
          rel="noreferrer"
        >
          View public gallery
        </a>
      </div>

      {/* Upload box */}
      <form
        onSubmit={upload}
        className="mt-8 border rounded-2xl p-6 bg-white space-y-4"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <input
            className="border rounded-lg p-3"
            placeholder="Title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="border rounded-lg p-3"
            placeholder="Description (optional)"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button
          type="button"
          onClick={openPicker}
          className="w-full border rounded-lg p-3 text-left hover:bg-gray-50"
        >
          {file ? (
            <span>
              ✅ Selected: <span className="font-medium">{file.name}</span>
            </span>
          ) : (
            <span>Click to choose an image…</span>
          )}
        </button>

        <button
          type="submit"
          disabled={uploading}
          className="bg-black text-white px-6 py-3 rounded-lg disabled:opacity-60"
        >
          {uploading ? "Uploading..." : "Upload Image"}
        </button>
      </form>

      {/* Items list */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold">Gallery Items</h2>

        {loadingList ? (
          <div className="mt-4 text-gray-600">Loading…</div>
        ) : items.length === 0 ? (
          <div className="mt-4 rounded-2xl border bg-gray-50 p-6">
            No items yet. Upload your first image above.
          </div>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {items.map((it) => (
              <div
                key={it.id}
                className="border rounded-2xl overflow-hidden bg-white"
              >
                <div className="relative h-48 w-full">
                  <Image
                    src={it.imageUrl}
                    alt={it.title || "Project"}
                    fill
                    className="object-cover rounded-lg"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="p-4 space-y-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="font-medium truncate">
                      {it.title || "Untitled"}
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded border ${it.isPublished ? "bg-green-50" : "bg-gray-50"}`}
                    >
                      {it.isPublished ? "Published" : "Hidden"}
                    </span>
                  </div>

                  <div className="grid gap-3">
                    <input
                      className="border rounded-lg p-2 text-sm"
                      defaultValue={it.title || ""}
                      placeholder="Title"
                      onBlur={(e) =>
                        updateItem(it.id, { title: e.target.value })
                      }
                    />
                    <input
                      className="border rounded-lg p-2 text-sm"
                      defaultValue={it.description || ""}
                      placeholder="Description"
                      onBlur={(e) =>
                        updateItem(it.id, { description: e.target.value })
                      }
                    />
                    <div className="flex items-center gap-3">
                      <label className="text-sm text-gray-600">Sort</label>
                      <input
                        type="number"
                        className="border rounded-lg p-2 text-sm w-24"
                        defaultValue={it.sortOrder}
                        onBlur={(e) =>
                          updateItem(it.id, {
                            sortOrder: Number(e.target.value),
                          })
                        }
                      />
                      <button
                        type="button"
                        className="ml-auto text-sm border rounded-lg px-3 py-2"
                        onClick={() =>
                          updateItem(it.id, { isPublished: !it.isPublished })
                        }
                      >
                        {it.isPublished ? "Unpublish" : "Publish"}
                      </button>
                      <button
                        type="button"
                        className="text-sm border rounded-lg px-3 py-2"
                        onClick={() => deleteItem(it.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-gray-500">
                    Created: {new Date(it.createdAt).toLocaleString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminShell>
  );
}
