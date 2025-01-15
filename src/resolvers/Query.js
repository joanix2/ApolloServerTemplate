function feed(parent, args, context) {
  // Fetch all links from the database using Prisma
  return context.prisma.link.findMany();
}

function feedByCurrentUserId(parent, args, context) {
  // Extract the userId from the context
  const { userId } = context;

  // Check if userId is available (ensure the user is authenticated)
  if (!userId) {
    throw new Error("Authentication required to fetch user links.");
  }

  // Fetch and return the links associated with the authenticated user
  return context.prisma.user
    .findUnique({
      where: { id: userId },
    })
    .links();
}

module.exports = {
  feed,
  feedByCurrentUserId,
};
