import prisma from "@/app/api/database";

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const payload = await request.json();
  const user = await prisma.user.update({
    data: payload,
    where: {
      id: parseInt(params.id),
    },
    omit: {
      password: true,
    },
  });
  return Response.json(user);
}

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  await prisma.user.delete({
    where: { id: parseInt(params.id) },
  });

  return new Response(null, { status: 204 });
}
