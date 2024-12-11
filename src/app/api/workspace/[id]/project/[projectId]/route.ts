import { promises as fs } from "fs";
import prisma from "@/app/api/database";
import { UpdateProject } from "@/schemas/project";
import { NextRequest } from "next/server";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string; projectId: string } }
) {
  await prisma.project.delete({
    where: { id: params.projectId, workspaceId: params.id },
  });

  return new Response(null, { status: 204 });
}

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string; projectId: string } }
) {
  const project = await prisma.project.findUnique({
    where: { id: params.projectId },
    include: { Link: true },
  });
  if (!project) return new Response("Not Found", { status: 404 });
  return Response.json(project);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string; projectId: string } }
) {
  let filename: string = "";
  const formData = await req.formData();
  const data = Object.fromEntries(Array.from(formData.entries())) as Partial<
    UpdateProject & { file: File; links: string }
  >;

  console.log(data);

  if (data.file) {
    filename = `${Date.now()}-${data.file.name}`;
    const arrayBuffer = await data.file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`${process.cwd()}/uploads/${filename}`, buffer);
  }

  const {
    file: _file,
    image: _image,
    projectId: _projectId,
    links,
    sectionId,
    ...payload
  } = data;

  const project = await prisma.$transaction(async (prisma) => {
    const project = await prisma.project.update({
      where: { id: params.projectId },
      data: {
        ...payload,
        sectionId: sectionId ? parseInt(sectionId) : undefined,
        imageUrl: filename ? `/uploads/${filename}` : undefined,
      },
    });

    if (links) {
      const parsedLinks: typeof data.links = JSON.parse(links);
      await prisma.link.deleteMany({
        where: {
          id: {
            notIn: parsedLinks
              ?.filter((link) => !!link.id)
              .map((item) => item.id!),
          },
          projectId: params.projectId,
        },
      });
      const newLinks = parsedLinks!.filter((link) => !link.id);
      if (newLinks)
        await prisma.link.createMany({
          data: newLinks.map((item) => ({
            ...item,
            projectId: params.projectId,
          })),
        });
      const currLink = parsedLinks?.filter((item) => !!item.id);
      if (currLink)
        await Promise.all(
          currLink?.map(async ({ id, ...item }) => {
            await prisma.link.update({ where: { id }, data: { ...item } });
          })
        );
    }
    return project;
  });

  return Response.json(project);
}
