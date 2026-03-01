import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return Response.json(
        { ok: false, error: "No file uploaded" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadRes: any = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "lux-tiling" }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        })
        .end(buffer);
    });

    const saved = await prisma.galleryItem.create({
      data: {
        title: title || null,
        description: description || null,
        imageUrl: uploadRes.secure_url,
        isPublished: true,
        sortOrder: 0,
      },
    });

    return Response.json({ ok: true, item: saved });
  } catch (error) {
    console.error(error);
    return Response.json(
      { ok: false, error: "Upload failed" },
      { status: 500 },
    );
  }
}
