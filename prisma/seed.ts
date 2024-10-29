import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: "$2y$10$urSkGBRV5LXcGDBFqanPCOJrauKxsBnBBhXihQognuDkYPiiRENc2",
      role: "ADMIN",
      displayName: "Admin Enigma",
    },
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
