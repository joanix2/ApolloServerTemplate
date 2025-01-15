function postedBy(parent, args, context) {
  // Extract the link ID from the parent resolver's data
  const { id } = parent;

  // Fetch and return the user who posted the link
  return context.prisma.link
    .findUnique({
      where: { id },
    })
    .postedBy();
}

module.exports = {
  postedBy,
};
