function links(parent, args, context) {
  // Extract the user ID from the parent resolver's data
  const { id } = parent;

  // Fetch and return the links associated with the user ID
  return context.prisma.user
    .findUnique({
      where: { id },
    })
    .links();
}

module.exports = {
  links,
};
