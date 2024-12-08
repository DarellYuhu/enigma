import prisma from "@/app/api/database";
import { promises as fs } from "fs";
import { NextRequest } from "next/server";

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const formData = await req.formData();
  const data = {
    workspaceId: params.id,
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    sectionId: formData.get("sectionId") as string,
    image: formData.get("file") as File,
    links: JSON.parse(formData.get("links") as string) as {
      label: string;
      url: string;
    }[],
  };

  const filename = `${Date.now()}-${data.image.name}`;
  const arrayBuffer = await data.image.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);
  await fs.writeFile(`${process.cwd()}/uploads/${filename}`, buffer);

  const project = await prisma.project.create({
    data: {
      workspaceId: data.workspaceId,
      imageUrl: `/uploads/${filename}`,
      title: data.title,
      description: data.description,
      sectionId: parseInt(data.sectionId),
      Link: {
        createMany: {
          data: data.links,
        },
      },
    },
  });

  return Response.json(project);
}
