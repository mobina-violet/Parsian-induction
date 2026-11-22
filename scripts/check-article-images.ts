import { prisma } from "../lib/prisma";

async function main() {
  const articles = await prisma.article.findMany({
    where: {
      slug: {
        in: [
          "how-induction-melting-furnace-works",
          "induction-furnace-winter-preparation",
        ],
      },
    },
    select: {
      slug: true,
      coverImage: true,
      content: true,
    },
  });

  for (const article of articles) {
    console.log(
      JSON.stringify(
        {
          slug: article.slug,
          coverImage: article.coverImage,
          contentStart: article.content?.slice(0, 800),
        },
        null,
        2
      )
    );
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());